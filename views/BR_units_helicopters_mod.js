const {basePipeline} = require("./BR_units_helicopters")
const { pipelineModsOnlyFilter } = require('../viewsUtils')

const pipeline = [
  pipelineModsOnlyFilter,
  ...basePipeline
]

module.exports = {
  pipeline,
  collection: "Helicopters",
  name: "BR_units_helicopters_mod",
};