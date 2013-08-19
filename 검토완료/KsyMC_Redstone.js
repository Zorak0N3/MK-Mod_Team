var REDSTORE_TORCH = 50;
var PISTON = 41;
var STICKY_PISTON = 42;
var LEVER = 80;
var ACTIVE_LEVER = 82;
var PRESSURE_PLATE = 44;
var REDSTONE_WIRE = 87;
var ACTIVE_REDSTONE_WIRE = 246;
 
var redstone = new Array();
 
function modTick()
{
	if(getYaw() == 0) return;
	
	for(var pos in redstone)
	{
		var blockPos = pos.split(",");
		var current = getTile(blockPos[0], blockPos[1], blockPos[2]);
		var around = getAroundBlock(blockPos[0], blockPos[1], blockPos[2]);
		var torch = findNearBlocks(blockPos[0], blockPos[1], blockPos[2], REDSTORE_TORCH);
		var plate = findNearBlocks(blockPos[0], blockPos[1], blockPos[2], PRESSURE_PLATE);
		var tnt = findNearBlocks(blockPos[0], blockPos[1], blockPos[2], 46);
		var block = redstone[pos][0];
		var side = redstone[pos][1];
		var active = redstone[pos][2];
		
		if(block == REDSTORE_TORCH)
		{
			if(current != REDSTORE_TORCH) redstone.splice(pos, 1);
			else
			{
			}
		}
		else if(block == PISTON || block == STICKY_PISTON)
		{
			if((block == PISTON && current != PISTON) || (block == STICKY_PISTON && current != STICKY_PISTON)) redstone.splice(pos, 1);
			else
			{
				if(active && (torch !false || plate !false))
				{
					pistonActive(blockPos);
					redstone[pos.join(",")][2] = false;
				}
				
				if(!active && (torch !== false || plate !== false))
				{
					pistonActive(blockPos);
					redstone[pos.join(",")][2] = true;
				}
			}
		}
		else if(block == LEVER)
		{
			if((!active && current != LEVER) || (active && current != ACTIVE_LEVER)) redstone.splice(pos, 1);
			else
			{
			}
		}
		else if(block == PRESSURE_PLATE)
		{
			if(current != PRESSURE_PLATE) redstone.splice(pos, 1);
			else
			{
			}
		}
		else if(block == REDSTONE_WIRE)
		{
			if(current != REDSTONE_WIRE) redstone.splice(pos, 1);
			else
			{
			}
		}
	}
}
 
function useItem(x, y, z, item, block, side)
{
	if(block == LEVER)
	{
		redstone[x+","+y+","+z][2] = true;
		setTile(x, y, z, ACTIVE_LEVER);
		preventDefault();
		return;
	}
	else if(block == ACTIVE_LEVER)
	{
		redstone[x+","+y+","+z][2] = false;
		setTile(x, y, z, LEVER);
		preventDefault();
		return;
	}
	
	var blockPos = getSide(x, y, z, side);
	
	if(item == REDSTORE_TORCH || item == PISTON || item == LEVER || item == STICKY_PISTON || item == PRESSURE_PLATE || item == REDSTONE_WIRE)
		redstone[blockPos.join(",")] = [item, side, false];
}
 
function pistonActive(pos)
{
	var previous = redstone[pos.join(",")][0];
	var side = redstone[pos.join(",")][1];
	var active = redstone[pos.join(",")][2];
	var backup = 0;
		
	if(side == 0) // 아래로
	{
		if(!active)
		{
			for(var i = y; i > y - 13; i--)
			{
				if(Math.floor(getPlayerX()) == x && Math.floor(getPlayerY()) - 1 == i && Math.floor(getPlayerZ()) == z)
					setVelY(getPlayerEnt(), -0.5);
				
				backup = getTile(x, i, z);
				setTile(x, i, z, previous);
				previous = backup;
				
				if(previous == 0) break;
			}
		}
		else if(redstone[[x,y,z].join(",")][0] == STICKY_PISTON)
		{
			backup = getTile(x, y - 2, z);
			setTile(x, y - 1, z, backup);
			setTile(x, y - 2, z, 0);
		}
		else
		{
			setTile(x, y - 1, z, 0);
		}
	}
	else if(side == 1) // 위로
	{
		if(!active)
		{
			for(var i = y; i < y + 13; i++)
			{
				if(Math.floor(getPlayerX()) == x && (Math.floor(getPlayerY()) - 1 == i || Math.floor(getPlayerY()) == i) && Math.floor(getPlayerZ()) == z)
					setVelY(getPlayerEnt(), 0.5);
				
				backup = getTile(x, i, z);
				setTile(x, i, z, previous);
				previous = backup;
				
				if(previous == 0) break;
			}
		}
		else if(redstone[[x,y,z].join(",")][0] == STICKY_PISTON)
		{
			backup = getTile(x, y + 2, z);
			setTile(x, y + 1, z, backup);
			setTile(x, y + 2, z, 0);
		}
		else
		{
			setTile(x, y + 1, z, 0);
		}
	}
	else if(side == 2) // 남쪽으로
	{
		if(!active)
		{
			for(var i = z; i > z - 13; i--)
			{
				if(Math.floor(getPlayerX()) == x && (Math.floor(getPlayerY()) - 1 == y || Math.floor(getPlayerY()) == y) && Math.floor(getPlayerZ()) == i)
					setVelZ(getPlayerEnt(), -0.5);
				
				backup = getTile(x, y, i);
				setTile(x, y, i, previous);
				previous = backup;
				
				if(previous == 0) break;
			}
		}
		else if(redstone[[x,y,z].join(",")][0] == STICKY_PISTON)
		{
			backup = getTile(x, y, z - 2);
			setTile(x, y, z - 1, backup);
			setTile(x, y, z - 2, 0);
		}
		else
		{
			setTile(x, y, z - 1, 0);
		}
	}
	else if(side == 3) // 북쪽으로
	{
		if(!active)
		{
			for(var i = z; i < z + 13; i++)
			{
				if(Math.floor(getPlayerX()) == x && (Math.floor(getPlayerY()) - 1 == y || Math.floor(getPlayerY()) == y) && Math.floor(getPlayerZ()) == i)
					setVelZ(getPlayerEnt(), 0.5);
				
				backup = getTile(x, y, i);
				setTile(x, y, i, previous);
				previous = backup;
				
				if(previous == 0) break;
			}
		}
		else if(sticky)
		{
			backup = getTile(x, y, z + 2);
			setTile(x, y, z + 1, backup);
			setTile(x, y, z + 2, 0);
		}
		else
		{
			setTile(x, y, z + 1, 0);
		}
	}
	else if(side == 4) // 동쪽으로
	{
		if(!active)
		{
			for(var i = x; i > x - 13; i--)
			{
				if(Math.floor(getPlayerX()) == i && (Math.floor(getPlayerY()) - 1 == y || Math.floor(getPlayerY()) == y) && Math.floor(getPlayerZ()) == z)
					setVelX(getPlayerEnt(), -0.5);
				
				backup = getTile(i, y, z);
				setTile(i, y, z, previous);
				previous = backup;
				
				if(previous == 0) break;
			}
		}
		else if(redstone[[x,y,z].join(",")][0] == STICKY_PISTON)
		{
			backup = getTile(x - 2, y, z);
			setTile(x - 1, y, z, backup);
			setTile(x - 2, y, z, 0);
		}
		else
		{
			setTile(x - 1, y, z, 0);
		}
	}
	else if(side == 5) // 서쪽으로
	{
		if(!active)
		{
			for(var i = x; i < x + 13; i++)
			{
				if(Math.floor(getPlayerX()) == i && (Math.floor(getPlayerY()) - 1 == y || Math.floor(getPlayerY()) == y) && Math.floor(getPlayerZ()) == z)
					setVelX(getPlayerEnt(), 0.5);
				
				backup = getTile(i, y, z);
				setTile(i, y, z, previous);
				previous = backup;
				
				if(previous == 0) break;
			}
		}
		else if(redstone[[x,y,z].join(",")][0] == STICKY_PISTON)
		{
			backup = getTile(x + 2, y, z);
			setTile(x + 1, y, z, backup);
			setTile(x + 2, y, z, 0);
		}
		else
		{
			setTile(x + 1, y, z, 0);
		}
	}
}
 
function getSide(x, y, z, side)
{
	var pos = new Array(2);
	
	switch(side)
	{
		case 0:
			pos = [x, y - 1, z]; // 아래쪽
			break;
		case 1:
			pos = [x, y + 1, z]; // 위쪽
			break;
		case 2:
			pos = [x, y, z - 1]; // 남쪽
			break;
		case 3:
			pos = [x, y, z + 1]; // 북쪽
			break;
		case 4:
			pos = [x - 1, y, z]; // 동쪽
			break;
		case 5:
			pos = [x + 1, y, z]; // 서쪽
			break;
	}
	
	return pos;
}
 
function findNearBlocks(x, y, z, block)
{
	var pos = new Array(2);
	
	if(getTile(x, y - 1, z) == block) pos = [x, y - 1, z, 0];
	else if(getTile(x, y + 1, z) == block) pos = [x, y + 1, z, 1];
	else if(getTile(x, y, z - 1) == block) pos = [x, y, z - 1, 2];
	else if(getTile(x, y, z + 1) == block) pos = [x, y, z + 1, 3];
	else if(getTile(x - 1, y, z) == block) pos = [x - 1, y, z, 4];
	else if(getTile(x + 1, y, z) == block) pos = [x + 1, y, z, 5];
	else pos = false;
	
	return pos;
}
 
function getAroundBlock(x, y, z)
{
	var block = new Array(6);
	
	block[0] = [x, y - 1, z, getTile(x, y - 1, z)];
	block[1] = [x, y + 1, z, getTile(x, y + 1, z)];
	block[2] = [x, y, z - 1, getTile(x, y, z - 1)];
	block[3] = [x, y, z + 1, getTile(x, y, z + 1)];
	block[4] = [x - 1, y, z, getTile(x - 1, y, z)];
	block[5] = [x + 1, y, z, getTile(x + 1, y, z)];
	
	return block;
}