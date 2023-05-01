--- GUI:default:name,country
local base = _G
local T	= tools
local ConfigHelper	= require('ConfigHelper')
local writePath = ConfigHelper.getConfigWritePath('templates.lua')
local sysPath = ConfigHelper.getSysFilePath('templates.lua')

templates = {}

function load_templates()
	local fTempl = T.safeDoFile(writePath, false)
	local fTemplSys = T.safeDoFile(sysPath)
	templates = {}
  
	for k, fTempl in ipairs({fTempl, fTemplSys}) do
		tmpTemplates = (fTempl and fTempl.templates) or {}
		for templName, templ in pairs(tmpTemplates) do
			--fix templates name
			if templName ~= templ.name then
				templ.name = templName
			end
			
			if templ.units then
				local bAdd = true
				for k,v in base.pairs(templ.units) do
					if me_db_api.unit_by_type[v.name] == nil then
						bAdd = false
					end
				end
				if bAdd == true then
					if templates[templName] then
						if U.compareTables(templates[templName], templ) ~= true then
							local newName = templName.."-copy"
							templates[newName] = {}
							base.U.recursiveCopyTable(templates[newName], templates[templName])
							templates[newName].name = newName
						end
					end
					templates[templName] = templ
					if k == 2 then
						templates[templName].sys = true
					end
				end
			end
		end
	end	
end

load_templates()

return templates