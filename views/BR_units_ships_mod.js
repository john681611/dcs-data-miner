const {basePipeline} = require("./BR_units_ships")
const { pipelineModsOnlyFilter } = require('../viewsUtils')

const pipeline = [
  pipelineModsOnlyFilter, 
  ...basePipeline
]

module.exports = {
  pipeline,
  collection: "Ships",
  name: "BR_units_ships_mod",
};