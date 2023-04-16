const { isObject, values } = require("lodash");
const { array, object } = require("yup");

const zLuaArray = (schema) =>
  array(schema).transform((it) => {
    if (isObject(it)) return values(it);
    return it;
  });

const zLuaObject = (schema) => object(schema);

module.exports = { zLuaArray, zLuaObject };
