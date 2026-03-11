const pipelineVanillaOnlyFilter = {
  '$match': {
    'sys': true
  }
}

const basePipeline = [
  {
    $addFields: {
      unitsArray: {
        $cond: [
          {
            $isArray: "$units"
          },
          "$units",
          {
            $cond: [
              {
                $and: [
                  {
                    $ne: ["$units", null]
                  },
                  {
                    $eq: [
                      {
                        $type: "$units"
                      },
                      "object"
                    ]
                  }
                ]
              },
              {
                $map: {
                  input: {
                    $objectToArray: "$units"
                  },
                  as: "el",
                  in: "$$el.v"
                }
              },
              []
            ]
          }
        ]
      }
    }
  },
  {
    $project: {
      name: 1,
      country: 1,
      sys: 1,
      type: 1,
      units: {
        $map: {
          input: "$unitsArray",
          as: "u",
          in: {
            coords: [
              {
                $ifNull: ["$$u.dx", null]
              },
              {
                $ifNull: ["$$u.dy", null]
              }
            ],
            specificType: "$$u.name",
            heading: "$$u.heading"
          }
        }
      }
    }
  },
]

const pipeline = [
  pipelineVanillaOnlyFilter,
  ...basePipeline
]

module.exports = {
  basePipeline,
  pipeline,
  collection: "Templates",
  name: "BR_templates",
};
