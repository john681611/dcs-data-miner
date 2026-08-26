--- GUI:default:type
local units = me_db.db.Units.Cars.Car
local locale = string.lower(require('i18n').getLocale())

local function sanitizeValue(value, visited)
    if type(value) ~= 'table' then
        return value
    end

    if visited[value] then
        return nil
    end

    visited[value] = true
    local sanitized = {}
    for key, innerValue in pairs(value) do
        if key ~= '_replace_origin_' and type(key) ~= 'table' then
            local sanitizedInner = sanitizeValue(innerValue, visited)
            if sanitizedInner ~= nil then
                sanitized[key] = sanitizedInner
            end
        end
    end

    return sanitized
end

local _list = {}
for k, v in pairs(units) do
    local schemes = {}
    local unitType = v and v.type
    if type(unitType) == 'string' and unitType ~= '' then
        for ck, cv in pairs(me_db.db.Countries) do -- This is slow need to find a way to only iterate though countries that are actually used
            local countryShortName = cv and cv.ShortName
            if type(countryShortName) == 'string' and countryShortName ~= '' then
                local liveriesData = DCS.getObjectLiveriesNames(string.gsub(unitType, '/', '_'), countryShortName, locale)

                if liveriesData and next(liveriesData) ~= nil then
                    local sub_scheme = {}
                    for lk, lv in ipairs(liveriesData) do
                        table.insert(sub_scheme, lv)
                    end
                    schemes[tostring(cv.WorldID)] = sub_scheme
                end
            end
        end
    end

    local sanitizedUnit = sanitizeValue(v, {})
    if type(sanitizedUnit) == 'table' then
        sanitizedUnit['paintSchemes'] = schemes
        table.insert(_list, sanitizedUnit)
    end
end

return _list
