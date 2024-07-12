const { pipelineVanillaOnlyFilter } = require('../viewsUtils')
const basePipeline = [
  {
    '$project': {
      '_id': 0,
      'type': 1, 
      'displayName': '$DisplayName', 
      'categories': '$Categories', 
      'module': '$_origin', 
      'shapeName': '$ShapeName'
    }
  },
  {
    '$sort': {
      'type': 1
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