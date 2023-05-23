const { pipelineVanillaOnlyFilter } = require('../viewsUtils')
const basePipeline = [
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
      'maxAlt': '$H_max',
      'cruiseSpeed': '$V_opt',
      'shape': '$Shape',
      'height': 1,
      'length': 1,
      'width': '$wing_span',
      'callsigns': 1
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
      'radio': 1,
      'ammoType': 1,
      'countries': '$Countries.Name',
      'countriesWorldID': '$Countries.WorldID',
      'inheriteCommonCallnames': 1,
      'specificCallnames': 1,
      'maxAlt': 1,
      'cruiseSpeed': 1,
      'shape': 1,
      'height': 1,
      'length': 1,
      'width': 1,
      'callsigns': 1
    }
  }
]

const pipeline = [
  pipelineVanillaOnlyFilter,
  ...basePipeline
]

module.exports = {
  basePipeline,
  pipeline,
  collection: 'Planes',
  name: 'BR_units_planes',
};