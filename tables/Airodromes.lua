--- GUI:default:id,theatre
-- Guard against mission not loaded (Mission must be running for this to work)
if (DCS.getTheatreID() == nil) then
    return error("No Theater ID")
end

local airodromes = terrain.GetTerrainConfig("Airdromes")

local _airodromes_list = {}

for k, v in pairs(airodromes) do
    v["airbase_id"] = k
    v["theatre"] = DCS.getTheatreID()
    v["stands"] = terrain.getStandList(v['roadnet'], {"SHELTER","FOR_HELICOPTERS","FOR_AIRPLANES","WIDTH","LENGTH","HEIGHT"})
    table.insert(_airodromes_list, v)
end

return _airodromes_list