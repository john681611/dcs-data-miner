const {basePipeline} = require("./BR_units_cars")
const { pipelineModsOnlyFilter } = require('../viewsUtils')
const pipeline = [
  pipelineModsOnlyFilter, ...basePipeline
]

module.exports = {
  pipeline,
  collection: "Cars",
  name: "BR_units_cars_mod",
};