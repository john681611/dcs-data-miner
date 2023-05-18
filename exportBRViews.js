const { MongoClient } = require("mongodb");
const { DB_NAME, MONGO_URL, ENVS, FILES, VIEWS } = require("./config");
const mongo = new MongoClient(MONGO_URL);
const meDb = mongo.db(DB_NAME);
const fs = require('fs');

const extractMap = {
    'BR_units_cars': 'UnitCars',
    'BR_units_cars_mod': 'UnitCarsMod',
    'BR_units_planes': 'UnitPlanes',
    'BR_units_planes_mod': 'UnitPlanesMod',
    'BR_units_helicopters': 'UnitHelicopters',
    'BR_units_helicopters_mod': 'UnitHelicoptersMod',
    'BR_units_ships': 'UnitShips',
    'BR_units_ships_mod': 'UnitShipsMod',
    'BR_units_static_Fortifications': 'UnitFortifications',
    'BR_units_static_Warehouses': 'UnitWarehouses',
    'BR_units_cargo': 'UnitCargo',
    'BR_units_static_Heliports': 'UnitHeliports',
    'Templates': 'Templates',
    'BR_layouts': 'Layouts',
    'BR_airbases': 'TheatersAirbases'
}

async function run() {
    await mongo.connect();
    for (const [key, value] of Object.entries(extractMap)) {
        console.log(key, value)
        const cursor = meDb.collection(key).find()
        const data = await cursor.toArray()
        fs.writeFileSync(`./exports/${value}.json`, JSON.stringify(data, null, 4))
    }
    await mongo.close();
}

run();
