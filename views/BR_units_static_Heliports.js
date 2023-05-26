const pipeline = [
  {
    '$project': {
      'type': 1, 
      'displayName': '$DisplayName', 
      'categories': '$Categories', 
      'module': '$_origin', 
      'shapeName': '$ShapeName',
      'numParking': 1
    }
  }
]

module.exports = {
  pipeline,
  collection: "Heliports",
  name: "BR_units_static_Heliports",
};