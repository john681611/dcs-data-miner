const { pipelineVanillaOnlyFilter } = require('../viewsUtils')

const basePipeline = [
  {
    '$project': {
      'type': 1,
      'displayName': '$DisplayName',
      'category': 1,
      'module': '$_origin',
      'paintSchemes': 1,
      'shape': '$visual.shape',
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
      'category': 1,
      'module': 1,
      'paintSchemes': 1,
      'operators':  {'$ifNull': [ "$operators.operators", {}]},
      'shape': 1,
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
  collection: "Cars",
  name: "BR_units_cars",
};