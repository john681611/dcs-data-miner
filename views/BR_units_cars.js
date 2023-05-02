const pipeline = [
  {
    '$project': {
      'type': 1, 
      'displayName': '$DisplayName', 
      'category': 1, 
      'module': '$_origin', 
      'paintSchemes': 1, 
      'shape': '$visual.shape'
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
      'category': 1, 
      'module': 1, 
      'paintSchemes': 1, 
      'countries': '$Countries.Name', 
      'countriesWorldID': '$Countries.WorldID', 
      'shape': 1
    }
  }
]

module.exports = {
  pipeline,
  collection: "Cars",
  name: "BR_units_cars",
};