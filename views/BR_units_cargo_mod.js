const {basePipeline} = require("./BR_units_cargo")
const { pipelineModsOnlyFilter } = require('../viewsUtils')
const pipeline = [
  pipelineModsOnlyFilter, ...basePipeline
]
module.exports = {
  pipeline,
  collection: "Cargos",
  name: "BR_units_cargo_mod",
};