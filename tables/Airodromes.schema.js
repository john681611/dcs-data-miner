const { zLuaArray, zLuaObject } = require("../schemas");

module.exports = zLuaArray(
  zLuaObject({
    projectors: zLuaArray(),
    beacons: zLuaArray(),
    runways: zLuaArray(),
    runwayName: zLuaArray(),
    stands: zLuaArray()
  }),
);
