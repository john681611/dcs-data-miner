module.exports = {
  MONGO_URL: "mongodb://admin:admin@127.0.0.1:27017",
  DB_NAME: "me_db",
  //FILES: "./tables/{Airbases,Airodromes,Terrains,Beacons,Radios}.lua", // Run once per theatre
  FILES: "./tables/{Planes,Cars,Helicopters,Fortifications,Ships}.lua", // Run once per dcs version
  VIEWS: "./views/*.js", // Run once per dcs version
  ENVS: {
    MISSION: "http://127.0.0.1:12080/",
    GUI: "http://127.0.0.1:12081/",
  },
};
