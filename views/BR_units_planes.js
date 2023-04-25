const pipeline = [
  {
    '$project': {
      'type': 1,
      'displayName': '$DisplayName',
      'categories': '$Categories',
      'module': '$_origin',
      'tasks': '$Tasks',
      'paintSchemes': 1,
      'payloadPresets': 1,
      'EPLRS': 1,
      'fuel': '$M_fuel_max',
      'flares': '$passivCounterm.flare.default',
      'chaff': '$passivCounterm.chaff.default',
      'extraProps': '$AddPropAircraft',
      'panelRadio': 1,
      'radio': {
        'frequency': '$HumanRadio.frequency',
        'modulation': '$HumanRadio.modulation',
      },
      'ammoType': '$ammo_type_default',
      'inheriteCommonCallnames': '$InheriteCommonCallnames',
      'specificCallnames': '$SpecificCallnames',
      'maxAlt': '$H_max',
      'cruiseSpeed': '$V_opt'
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
      'tasks': 1,
      'paintSchemes': 1,
      'payloadPresets': 1,
      'EPLRS': 1,
      'fuel': 1,
      'flares': 1,
      'chaff': 1,
      'extraProps': {
        'id': 1,
        'defValue': 1,
      },
      'panelRadio': 1,
      'playable': 1,
      'radio': 1,
      'ammoType': 1,
      'countries': '$Countries.Name',
      'countriesWorldID': '$Countries.WorldID',
      'inheriteCommonCallnames': 1,
      'specificCallnames': 1,
      'maxAlt': 1,
      'cruiseSpeed': 1
    }
  }
]

module.exports = {
  pipeline,
  collection: 'Planes',
  name: 'BR_units_planes',
};