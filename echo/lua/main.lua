local template =
{
	bgsOffsetY = 0
}

-- start
function template:start()
end

-- update
function template:update()
	if(Input:getMouseButtonDown(0)) then
		self.bgsOffsetY = self.bgsOffsetY + 10
		self:setLocalPosition(vec3( 0, self.bgsOffsetY, 0))
	end
end

return template
