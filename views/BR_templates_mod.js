const {basePipeline} = require("./BR_templates")
const pipelineCustomOnlyFilter = {
  '$match': {
    'sys': false
  }
}


const pipeline = [
  pipelineCustomOnlyFilter,
  ...basePipeline
]

module.exports = {
  pipeline,
  collection: "Templates",
  name: "BR_templates_mod",
};
