const pipeline = [
  {
    '$project': {
      'type': 1,
      'displayName': '$DisplayName',
      'categories': '$Categories',
      'module': '$_origin',
    }
  }, {
    '$lookup': {
      'from': 'BR_units_by_country',
      'localField': 'type',
      'foreignField': 'Units.Name',
      'as': 'Countries'
    }
  }, {
    '$project': {
      'type': 1,
      'displayName': 1,
      'categories': 1,
      'module': 1,
      'countries': '$Countries.Name',
      'countriesWorldID': '$Countries.WorldID'
    }
  }
]

module.exports = {
  pipeline,
  collection: "Ships",
  name: "BR_units_ships",
};