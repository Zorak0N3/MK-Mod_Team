var egg = null;

function newLevel(){
	egg = null;
}

function entityAddedHook(ent){
	if(Entity.getEntityTypeId(ent) == 82){
		egg = ent;
		Entity.setFireTicks(egg, 20 * 100);
	}
}

function entityRemovedHook(ent){
	if(egg != null && Entity.getPitch(ent) == Entity.getPitch(egg)){
		var pos = [];
		for(var x = 0; x < 5; x++) for(var z = 0; z < 5; z++) pos.push(getFloor((Entity.getX(egg) - 2) + x, 127, (Entity.getZ(egg) - 2) + z));
		
		for(var i = 0; i < pos.length; i++) setTile(pos[i][0], pos[i][1] + 1, pos[i][2], 51);
		
		Entity.remove(egg);
		egg = null;
	}
}

function getFloor(x, y, z){
	for(var i = y; i >= 0; i--){
		if(getTile(x, i, z) != 0 && getTile(x, i, z) != 78 && getTile(x, i, z) != 83 && getTile(x, i, z) != 50 && getTile(x, i, z) != 51){
			return [x, i, z];
		}

		if(i == 0){
			return [x, i, z];
		}
	}
	return false;
}