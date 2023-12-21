const pipelineVanillaOnlyFilter = {
  '$match': {
    'sys': true
  }
}

const basePipeline = [
  {
    '$project': {
      'name': 1,
      'country': 1,
      'type': 1,
      'units': 1
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
