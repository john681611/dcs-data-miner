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
  collection: "Cargos",
  name: "BR_units_cargo",
};