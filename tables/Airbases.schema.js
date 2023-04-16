const { zLuaArray, zLuaObject } = require("../schemas");

module.exports = zLuaArray(
  zLuaObject({ runways: zLuaArray(), parking: zLuaArray() }),
);
