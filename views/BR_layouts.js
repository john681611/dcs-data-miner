const pipeline = [
  {
    '$project': {
      'name': 1,
      'units': {
        'dx': 1,
        'dy': 1,
        'heading': 1
      }
    }
  },
  { '$set': { "minUnits": 0, "categories": [] } }
]

module.exports = {
  pipeline,
  collection: "Layouts",
  name: "BR_layouts",
};
