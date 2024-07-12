const pipelineVanillaOnlyFilter = {
  '$match': {
    'sys': true
  }
}

const basePipeline = [
  {
    '$project': {
      '_id': 0,
      'name': 1,
      'country': 1,
      'type': 1,
      'units': 1
    }
  },
  {
    '$sort': {
      'name': 1
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
  collection: "Templates",
  name: "BR_templates",
};
