--- GUI:default:id
-- Guard against mission not loaded
if (DCS.getTheatreID() == nil) then
    console.warning("WARNING: Not in mission can't extact terrain")
    return {}
end

-- Start
local theatreDetails = {}

local loadedTheatreDetail = {
    id = DCS.getTheatreID(),
    mgrs = terrain.GetMGRScoordinates(),
    seasons = terrain.GetSeasons().seasons
}

local getUtm = function(lon)
    local utm = {}
    if lon >= 0 then
        utm.startLon = lon - (lon % 6)
        utm.endLon = utm.startLon + 6
        utm.centralMeridian = utm.startLon + 3
        utm.zone = 30 + (utm.endLon / 6)
    else
        utm.startLon = lon + ((lon * -1) % 6)
        utm.endLon = utm.startLon - 6
        utm.centralMeridian = utm.startLon - 3
        utm.zone = 30 + (utm.startLon / 6)
    end

    return utm
end

local properties = { type = "TERRAIN", id = terrain.GetTerrainConfig("id"), name = terrain.GetTerrainConfig("name") }

local lat, lon = terrain.convertMetersToLatLon(0, 0)

properties.center = { lat = lat, lon = lon, alt = alt }

local utm = getUtm(lon)

local scale = 0.9996

local x, z = terrain.convertLatLonToMeters(0, 0 + utm.centralMeridian)

local proj = "+proj=tmerc +lat_0=0 +lon_0=" .. utm.centralMeridian .. " +k_0=" .. scale .. " +x_0=" .. z .. " +y_0=" .. x .. " +towgs84=0,0,0,0,0,0,0 +units=m +vunits=m +ellps=WGS84 +no_defs +axis=neu"

loadedTheatreDetail.hemisphere = lat > 0 and "n" or "s"
loadedTheatreDetail.utm = utm
loadedTheatreDetail.projection = { scale = scale, offset = { x = x, y = 0, z = z }, proj = proj }

-- Map Bounds
local NE_bound = terrain.GetTerrainConfig("NE_bound")
local SW_bound = terrain.GetTerrainConfig("SW_bound")

local nw_lat, nw_lon = terrain.convertMetersToLatLon(NE_bound[1]*1000,SW_bound[3]*1000)
local ne_lat, ne_lon = terrain.convertMetersToLatLon(NE_bound[1]*1000,NE_bound[3]*1000)

local se_lat, se_lon = terrain.convertMetersToLatLon(SW_bound[1]*1000,NE_bound[3]*1000)
local sw_lat, sw_lon = terrain.convertMetersToLatLon(SW_bound[1]*1000,SW_bound[3]*1000)

loadedTheatreDetail.mapBounds = {
    nw_lat, nw_lon,
    ne_lat, ne_lon,
    se_lat, se_lon, 
    sw_lat, sw_lon,
}

table.insert(theatreDetails, loadedTheatreDetail)

return theatreDetails