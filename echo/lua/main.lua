local main = { }
local uiFailed = nil
local houses = nil
local bgs = nil
local camera = nil
local craneNode = nil
local dropNode = nil
local currentHouse = nil
local preHouse = nil
local preHouseYHeight = -420.0
local isFailed = false
local isWaitingResult = false
local waitingResultTime = 0.0
local destCraneHeightY = 0.0

-- start
function main:start()
	uiFailed    = self:getNode("ui/failed")
	craneNode 	= self:getNode("crane")
	dropNode	= self:getNode("crane/dropHouse")
	houses 		= self:getNode("houses")
	bgs    		= self:getNode("bgs")
	camera 		= self:getNode("camera")
end

-- update
function main:update()
	-- drop house when click screen
	if(Input:getMouseButtonDown(0)) then
		self:dropHouse()
	end

	if currentHouse ~= nil then
		if currentHouse:getPositionY() < preHouseYHeight then
			onFaile()
		end
	
		-- waiting result state
		if isWaitingResult then
			
			isWaitingResult = false
			waitingResultTime = 0.0
		end

		-- update crane node position
		if craneNode:getPositionY() < destCraneHeightY then
			local stepLen = (destCraneHeightY - craneNode:getPositionY()) * 0.04
			
			-- move crane and camera
			craneNode:setPositonY(craneNode:getPositionY() + stepLen)
			camera:setPositionY(craneNode:getPositionY() - 150.0)
		end
	end
end

-- drop house
function main:dropHouse()
	if isFailed then
		return
	end

	local newHouse = Node.load("Res://scene/house.scene")
	if newHouse~=nil then
		newHouse:setParent(houses)
		newHouse:setPosition(dropNode:getPosition())
		
		-- hidden drop node
		dropNode:setVisible(false)
		
		-- move up crane
		destCraneHeightY = preHouseYHeight + 550
		
		-- remember nodes
		preHouse = currentHouse
		currentHouse = newHouse
		
		isWaitingResult = true
		
		if preHouse ~= nil then
			preHouseYHeight = preHouse:getPositionY()
		end
	end
end

-- on faile
function main:onFail()
	isFailed = true
end

return setmetatable(main, Node)
