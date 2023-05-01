const pipeline = [
  {
    '$project': {
      'type': 1, 
      'displayName': '$DisplayName', 
      'categories': '$Categories', 
      'module': '$_origin', 
      'shapeName': '$ShapeName'
    }
  }
]

module.exports = {
  pipeline,
  collection: "Warehouses",
  name: "BR_units_static_Warehouses",
};