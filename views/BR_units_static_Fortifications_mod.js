const {basePipeline} = require("./BR_units_static_Fortifications")
const { pipelineModsOnlyFilter } = require('../viewsUtils')

const pipeline = [
  pipelineModsOnlyFilter, 
  ...basePipeline
]

module.exports = {
  pipeline,
  collection: "Fortifications",
  name: "BR_units_static_Fortifications_mod",
};