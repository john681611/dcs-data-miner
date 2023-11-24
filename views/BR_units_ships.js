const { pipelineVanillaOnlyFilter } = require('../viewsUtils')

const basePipeline = [
  {
    '$project': {
      'type': 1,
      'displayName': '$DisplayName',
      'categories': '$Categories',
      'module': '$_origin',
      'shape': '$visual.shape',
      'numParking': 1,
      'detectionRange': '$DetectionRange',
      'threatRangeMin':'$ThreatRangeMin',
      'ThreatRange':'$ThreatRange'
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
      'type': 1,
      'displayName': 1,
      'categories': 1,
      'module': 1,
      'operators':  { '$ifNull': [ "$operators.operators", {}]},
      'shape': 1,
      'numParking': 1,
      'detectionRange': 1,
      'threatRangeMin':1,
      'ThreatRange':1
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