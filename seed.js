const Aigle = require("aigle");
const { MongoClient } = require("mongodb");
const { glob } = require("glob");
const { basename, extname } = require("path");
const axios = require("axios");
const { readFileSync, pathExists, remove } = require("fs-extra");
const { resolve } = require("path");
const { DB_NAME, MONGO_URL, ENVS, FILES, VIEWS } = require("./config");
const arg = require("arg");
const { writeFile } = require("fs/promises");
const path = require("path");

const args = arg({
  "--only": String,
  "--help": Boolean,
  "--collections": Boolean,
  "--operators": Boolean,
  "--views": Boolean,
  "-h": "--help",
  "-c": "--collections",
  "-o": "--operators",
  "-v": "--views",
});
if (args["--help"]) {
  console.log(`Usage: node seed.js [options]
Options:
  --only <option>      Specify what to seed: collections, operators, views
  -c, --collections    Seed DCS collections only
  -o, --operators      Seed custom operator/template files only
  -v, --views          Seed/create DB views only
  -h, --help           Show this help message`);
  process.exit(0);
}

const only = args["--collections"]
  ? "collections"
  : args["--operators"]
  ? "operators"
  : args["--views"]
  ? "views"
  : args["--only"];

const debug = require("debug")("me_db:seed");

const mongo = new MongoClient(MONGO_URL);
const meDb = mongo.db(DB_NAME);

const sign = (obj, dcsVersion) => {
  obj["@created"] = new Date().toISOString();
  obj["@dcsversion"] = dcsVersion;
  return obj;
};

const populateCollection =
  (dcsVersion) =>
  async ({ name, data, keyFields }) => {
    console.log(`Adding ${name} to DB`);
    const collection = await meDb.collection(name);
    let modifiedCount = 0;
    let upsertedCount = 0;
    if (name === "spawnPoints") {
      const theatre = data[0].theatre;
      const filePath = path.join(
        __dirname,
        "spawnPointsDump",
        `${theatre}.json`
      );
      await remove(filePath);
      await writeFile(filePath, JSON.stringify(data, null, 2));
      console.log(
        `Spawn points data dumped to spawnPointsDump/${theatre}.json`
      );
      return;
    }
    await Aigle.eachSeries(data, async (value, _) => {
      try {
        const signed = sign(value, dcsVersion);
        const filter = keyFields.reduce(
          (a, v) => ({ ...a, [v]: signed[v] }),
          {}
        ); //Can add in DCS version here if we want to support multiple versions in the future.
        // use upsert to avoid duplication when running more than once (Eg more than one theatre)
        const response = await collection.updateOne(
          filter,
          { $set: signed },
          { upsert: true }
        ); // TODO: Use Bulk Insert
        modifiedCount += response.modifiedCount;
        upsertedCount += response.upsertedCount;
      } catch (e) {
        console.warn(e.message);
      }
    });
    if (data) {
      const groupId = keyFields.reduce((a, v) => ({ ...a, [v]: `$${v}` }), {});
      const dupes = await collection
        .aggregate([
          { $group: { _id: groupId, count: { $sum: 1 } } },
          { $match: { count: { $gt: 1 } } },
        ])
        .toArray();
      if (dupes.length > 0)
        console.warn(
          `Warning: ${dupes.length} duplicate key(s) found in collection ${name}:`,
          dupes.map((d) => d._id)
        );
      console.log(
        `Upsert Result - Name: ${name}, Total: ${data.length}, Mod: ${modifiedCount}, Upserted: ${upsertedCount}`
      );
    }
  };

const extractData = (dcsVersion) => async (_path) => {
  console.log(`Processing ${_path}`);
  const exportScript = readFileSync(_path, "utf-8");
  const [_, target, env, keyFieldsStr] = exportScript.match(
    /^.*?(GUI|MISSION):(\w*):?(\w*,?\w*)/
  );
  const keyFields = keyFieldsStr.split(",");
  const name = basename(_path).replace(extname(_path), "");
  const baseURL = ENVS[target];
  let response = await axios
    .post(
      `rpc`,
      {
        jsonrpc: "2.0",
        method: "ping",
        params: [exportScript, env],
        id: "1",
      },
      {
        baseURL,
        params: { env },
        maxContentLength: Infinity,
      }
    )
    .catch((e) => {
      if (e.code === "ECONNREFUSED") {
        console.info(
          `Failed to connect to the target environment ${target}:${env} while processing ${_path}, please investigate further using DCS Fiddle`
        );
      } else {
        console.error(e);
      }
    });
  if (response.data && response.data.error) {
    console.error(response.data.error.message, response.data.error.data);
    data = undefined;
  }
  let data = response.data.result;
  const schemaModulePath = resolve(_path.replace(".lua", ".schema.js"));
  if (await pathExists(schemaModulePath)) {
    const schema = require(schemaModulePath);
    data = schema.cast(data);
  }
  return { name, data, keyFields };
};

/// RUN -------------------------------------------------------------------
async function run() {
  console.log("Validating Mongo Connection");
  await mongo.connect();
  console.log("Mongo Connection OK");

  console.log("Validating DCS Connection");
  await Promise.all(
    Object.keys(ENVS).map(async (key) => {
      const dcsVersion = await axios
        .get(`${ENVS[key]}health`)
        .then((it) => it.data.result);
      return dcsVersion;
    })
  );

  const dcsVersion = await axios
    .post(
      `rpc`,
      {
        jsonrpc: "2.0",
        method: "ping",
        params: ["return _APP_VERSION", "default"],
        id: "1",
      },
      {
        baseURL: ENVS.GUI,
        params: { env: "default" },
        maxContentLength: Infinity,
      }
    )
    .then((it) => it.data.result);
  console.log("DCS Connection OK");
  if (!only || only === "collections") {
    console.log("Extracting and populating Mission Editor DB");
    await Aigle.eachSeries(await glob(FILES), async (_path) => {
      const collectionData = await extractData(dcsVersion)(_path);
      await populateCollection(dcsVersion)(collectionData);
    });
    console.log("Populated Mission Editor DB");
  }

  if (!only || only === "operators") {
    console.log("Populating Custom File Tables");
    await Aigle.eachSeries(
      [
        {
          name: "UnitOperators",
          data: require("./customDataSets/UnitOperators.json"),
          keyFields: ["type"],
        },
        {
          name: "UnitOperators",
          data: require("./customDataSets/UnitOperatorsMods.json"),
          keyFields: ["type"],
        },
        {
          name: "Templates",
          data: require("./customDataSets/TemplatesCustom.json"),
          keyFields: ["name", "country"],
        },
      ],
      populateCollection("N/A")
    );
    console.log("Populated Custom File Tables");
  }

  if (only === "views") {
    console.log("Creating Views");
    await Aigle.eachSeries(await glob(VIEWS), async (_path) => {
      const { pipeline, collection, name } = require(resolve(_path));
      console.log(`Adding View ${name}`);
      await meDb
        .command({ collMod: name, viewOn: collection, pipeline })
        .catch(async (e) => {
          console.error(`Failed to update view ${name} due to ${e.message}`);
          await meDb
            .command({ create: name, viewOn: collection, pipeline })
            .catch((e) =>
              console.error(`Failed to create view ${name} due to ${e.message}`)
            );
        });
    });
    console.log("Created Views");
  }

  await mongo.close();
}

run();
