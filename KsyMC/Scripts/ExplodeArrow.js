var arrow = null;
var pos = [];

function newLevel(){
	arrow = null;
	pos = [];
}

function modTick(){
	if(arrow == null) return;
	
	if(Entity.getX(arrow) == pos[0] && Entity.getZ(arrow) == pos[1]){
		explode(Entity.getX(arrow), Entity.getY(arrow), Entity.getZ(arrow), 3.5);
		Entity.remove(arrow);
	}
	
	pos[0] = Entity.getX(arrow);
	pos[1] = Entity.getZ(arrow);
}

function entityAddedHook(ent){
	if(Entity.getEntityTypeId(ent) == 80) arrow = ent;
}

function entityRemovedHook(ent){
	if(arrow != null && Entity.getPitch(ent) == Entity.getPitch(arrow)) arrow = null;
}