local main = { }
local houses = nil
local ground = nil
local bgs = nil

-- start
function main:start()
	houses = self:getNode("houses")
	bgs    = self:getNode("bgs")
	ground = self:getNode("ground")
end

-- update
function main:update()
	if(Input:getMouseButtonDown(0)) then
		local newHouse = self:instance("Res://scene/house.scene")
		if newHouse~=nil then
			houses:addChild(newHouse)
		end
	end
end

return setmetatable(main, Node)
