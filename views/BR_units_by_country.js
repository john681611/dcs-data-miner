const pipeline = [
    {
      '$project': {
        'Name': 1, 
        'WorldID': 1, 
        'Units': {
          '$filter': {
            'input': {
              '$concatArrays': [
                '$Units.Ships.Ship', '$Units.Helicopters.Helicopter', '$Units.Cars.Car', '$Units.Planes.Plane'
              ]
            }, 
            'as': 'item', 
            'cond': {
              '$eq': [
                '$$item.in_service', 0
              ]
            }
          }
        }
      }
    }
  ]

  module.exports = {
    pipeline,
    collection: "Countries",
    name: "BR_units_by_country",
  };