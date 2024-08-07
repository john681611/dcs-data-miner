const { pipelineVanillaOnlyFilter } = require('../viewsUtils')

const basePipeline = [
  {
    '$project': {
      'type': 1,
      'displayName': '$DisplayName',
      'categories': '$Categories',
      'module': '$_origin',
      'shape': '$visual.shape',
      'helicopterStorage': '$Helicopter_Num_',
      'planeStorage': '$Plane_Num_',
      'detectionRange': '$DetectionRange',
      'threatRangeMin':'$ThreatRangeMin',
      'threatRange':'$ThreatRange'
    }
  }, {
    '$lookup': {
      'from': 'UnitOperators',
      'localField': 'type',
      'foreignField': 'type',
      'as': 'operators'
    }
  }, {
    '$unwind': {
      'path': '$operators',
     'preserveNullAndEmptyArrays': true
    }
  }, {
    '$project': {
      '_id': 0,
      'type': 1,
      'displayName': 1,
      'categories': 1,
      'module': 1,
      'operators':  { '$ifNull': [ "$operators.operators", {}]},
      'shape': 1,
      'helicopterStorage': 1,
      'planeStorage': 1,
      'detectionRange': 1,
      'threatRangeMin':1,
      'threatRange':1
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
  collection: "Ships",
  name: "BR_units_ships",
};