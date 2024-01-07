const {basePipeline} = require("./DWE_units_planes")
const { pipelineModsOnlyFilter } = require('../viewsUtils')

const pipeline = [
  pipelineModsOnlyFilter,
  ...basePipeline
]

module.exports = {
  pipeline,
  collection: 'Planes',
  name: 'DWE_units_planes_mod',
};