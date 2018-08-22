local template ={}

-- start
function template:start()
end

-- update
function template:update()
	if(Input:getMouseButtonDown(0)) then
		Log:error("Mouse Left Button Down")
	end
end

return template
