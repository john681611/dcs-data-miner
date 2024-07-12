const pipeline = [
  {
    '$project': {
      '_id': 0,
      'type': 1, 
      'displayName': '$DisplayName', 
      'categories': '$Categories', 
      'module': '$_origin', 
      'shapeName': '$ShapeName',
      'numParking': 1
    }
  },
  {
    '$sort': {
      'type': 1
    }
  }
]

module.exports = {
  pipeline,
  collection: "Heliports",
  name: "BR_units_static_Heliports",
};