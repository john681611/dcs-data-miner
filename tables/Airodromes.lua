--- GUI:default:id
-- Guard against mission not loaded (Mission must be running for this to work)
if (DCS.getTheatreID() == nil) then
    return {}
end

local airodromes = terrain.GetTerrainConfig("Airdromes")

local _airodromes_list = {}

for k, v in pairs(airodromes) do
    v["airbase_id"] = k
    v["theatre"] = DCS.getTheatreID()
    table.insert(_airodromes_list, v)
end

return _airodromes_list