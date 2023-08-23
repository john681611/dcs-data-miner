const {basePipeline} = require("./BR_units_planes")
const { pipelineModsOnlyFilter } = require('../viewsUtils')

const pipeline = [
  pipelineModsOnlyFilter,
  ...basePipeline
]

module.exports = {
  pipeline,
  collection: 'Planes',
  name: 'BR_units_planes_mod',
};