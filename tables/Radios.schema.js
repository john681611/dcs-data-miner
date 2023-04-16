const { zLuaArray, zLuaObject } = require("../schemas");

module.exports = zLuaArray(
  zLuaObject({
    frequency: zLuaArray(),
  }),
);
