local node ={ }
local bgsOffsetY = 0
local bgs = nil

-- start
function node:start()
	bgs = self:get_node("bgs/bg0")
end

-- update
function node:update()
	if(Input:getMouseButtonDown(1)) then
		bgsOffsetY = 0
		bgs:setLocalPosition(vec3( 0, bgsOffsetY, 0))
	end

	if(Input:isMouseButtonDown(0)) then
		bgsOffsetY = bgsOffsetY + 1
		bgs:setLocalPosition(vec3( 0, bgsOffsetY, 0))
	end
end

return node
