const pipeline = [
  {
    '$project': {
      '_id': 0,
      'name': 1,
      'units': {
        'dx': 1,
        'dy': 1,
        'heading': 1
      }
    }
  },
  { '$set': { "minUnits": 0, "categories": [] } },
  {
    '$sort': {
      'name': 1
    }
  }
]

module.exports = {
  pipeline,
  collection: "Layouts",
  name: "BR_layouts",
};
