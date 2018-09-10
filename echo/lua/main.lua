local main = { }
local houses = nil
local ground = nil
local bgs = nil
local camera = nil
local cameraYPos = 0.0

-- start
function main:start()
	houses = self:getNode("houses")
	bgs    = self:getNode("bgs")
	ground = self:getNode("ground")
	camera = self:getNode("camera")
end

-- update
function main:update()
	if(Input:getMouseButtonDown(0)) then
		local newHouse = Node.load("Res://scene/house.scene")
		if newHouse~=nil then
			houses:addChild(newHouse)
			
			cameraYPos = cameraYPos + 30.0
			camera:setLocalPosition(vec3(0.0, cameraYPos, 0.0))
		end
	end
end

return setmetatable(main, Node)
