const pipelineModsOnlyFilter = {
    '$match': {
        '_file': {
            '$regex': new RegExp('^C:')
        }
    }
}

const pipelineVanillaOnlyFilter =
{
    '$match': {
        '_file': {
            '$not': {
                '$regex': new RegExp('^C:')
            }
        }
    }
}

module.exports = {
    pipelineVanillaOnlyFilter,
    pipelineModsOnlyFilter
}