--- GUI:default:type
local units = me_db.db.Units.Cars.Car
local locale = string.lower(require('i18n').getLocale())

local _list = {}
for k, v in pairs(units) do
    local schemes = {}
    for ck, cv in pairs(me_db.db.Countries) do -- This is slow need to find a way to only iterate though countries that are actually used
        local liveriesData = DCS.getObjectLiveriesNames(string.gsub(v.type, '/', '_'), cv.ShortName, locale)

        if liveriesData and next(liveriesData) ~= nil then
            local sub_scheme = {}
            for lk, lv in ipairs(liveriesData) do
                table.insert(sub_scheme, lv)
            end
            schemes[tostring(cv.WorldID)] = sub_scheme
        end

    end
    v['paintSchemes'] = schemes
    table.insert(_list, v)
end

return _list

