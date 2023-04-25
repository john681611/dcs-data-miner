--- GUI:default
local loadoutUtils = require('me_loadoututils')
me_loadoututils.initBriefingRoomPayloads(nil,nil,nil)
local units = me_db.db.Units.Planes.Plane
local _list = {}
local banList = { -- Rows of data that seems to be very broken
    [34] = true,
    [69] = true,
    [70] = true,

}
for k, v in pairs(units) do
    if banList[k] == nil then
    local schemes = {}
    for ck, cv in pairs(me_db.db.Countries) do -- This is slow need to find a way to only iterate though countries that are actually used
        local sub_scheme = {}
        local liveriesData = DCS.getObjectLiveriesNames(string.gsub(v.type, '/', '_'), cv.ShortName,
        string.lower(require('i18n').getLocale()))

        if liveriesData and not (next(liveriesData) == nil)  then
            for k, v in ipairs(liveriesData) do
                table.insert(sub_scheme, v[2])
            end
            schemes[tostring(cv.WorldID)] = sub_scheme
        end

    end
    v['paintSchemes'] = schemes
    v['payloadPresets'] = me_loadoututils.getUnitPayloads(v.type)
    table.insert(_list, v)
    end
end

return _list
