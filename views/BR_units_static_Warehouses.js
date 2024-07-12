const pipeline = [
  {
    '$project': {
      '_id': 0,
      'type': 1, 
      'displayName': '$DisplayName', 
      'categories': '$Categories', 
      'module': '$_origin', 
      'shapeName': '$ShapeName'
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
  collection: "Warehouses",
  name: "BR_units_static_Warehouses",
};