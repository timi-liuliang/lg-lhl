local main = { }
local houses = nil
local ground = nil
local bgs = nil

-- start
function main:start()
	houses = self:get_node("houses")
	bgs    = self:get_node("bgs")
	ground = self:get_node("ground")
end

-- update
function main:update()
	if(Input:getMouseButtonDown(0)) then
		local newHouse = self:instance("Res://scene/house.scene")
		if newHouse~=nil then
			houses:add_child(newHouse)
		end
	end
end

return setmetatable(main, Node)
