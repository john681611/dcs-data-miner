--- GUI:default:beaconId,theatre
-- Guard against mission not loaded
if (DCS.getTheatreID() == nil) then
    console.warning("WARNING: Not in mission can't extact Beacons")
    return {}
end

dofile("Scripts/World/Radio/BeaconTypes.lua")

local beacon_types = {}

for k,v in pairs(_G) do
    if (string.match(k, "BEACON_TYPE_%a")) then
        beacon_types[v] = string.gsub(k, "BEACON_TYPE_", "")
    end
end

local beacons = terrain.getBeacons()

for _, v in ipairs(beacons) do
    v["type_name"] = beacon_types[v.type]
    v["theatre"] = DCS.getTheatreID()
end

return beacons