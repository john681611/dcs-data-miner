const { pipelineVanillaOnlyFilter } = require('../viewsUtils')
const basePipeline = [
  {
    '$project': {
      'type': 1, 
      'displayName': '$DisplayName', 
      'categories': '$Categories', 
      'module': '$_origin', 
      'shapeName': '$ShapeName'
    }
  }
]

const pipeline = [
  pipelineVanillaOnlyFilter,
  ...basePipeline
]

module.exports = {
  basePipeline,
  pipeline,
  collection: "Fortifications",
  name: "BR_units_static_Fortifications",
};