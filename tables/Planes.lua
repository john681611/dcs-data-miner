--- GUI:default:type
local loadoutUtils = require('me_loadoututils')
me_loadoututils.initBriefingRoomPayloads(nil,nil,nil)
local units = me_db_api.db.Units.Planes.Plane
local _list = {}
local banList = { -- Rows of data that seems to be very broken
    [34] = true, -- MiG-29S
    -- [69] = true, -- KC130 fix pending: WorldID == WSTYPE_PLACEHOLDER,  =>  WorldID = WSTYPE_PLACEHOLDER, DCS World OpenBeta\CoreMods\aircraft\AV8BNA\KC130.lua
    -- [70] = true, -- KC135MPRS fix pending: WorldID == WSTYPE_PLACEHOLDER,  =>  WorldID = WSTYPE_PLACEHOLDER, DCS World OpenBeta\CoreMods\aircraft\AV8BNA\KC135MPRS.lua
}
for k, v in pairs(units) do
    if banList[k] == nil and v[1] == nil then
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