var gX;
var gY;
var gZ;
var direction;


var active = 0;
var tickCurrent = 0;
var tickDuration = 2.5;

var activationItem = 344;
var actBlock1 = 103;
var actBlock2 = 87;
var actBlock3 = 42;

var debugMode = 0;

function useItem(x,y,z,itemId,blockId)
{
	if(itemId == activationItem)
	{
		if(debugMode) {clientMessage("USED ACTIVATION ITEM ON SOMETHING");}
		if(blockId == actBlock1 && getTile(x,y-1,z) == actBlock2 && getTile(x,y-2,z) == actBlock3)
		{
			gX = x;
			gY = y - 2;
			gZ = z;
			direction = Math.floor((Math.random()*24)+1);
			active = 1;
			if(debugMode) {clientMessage("ACTIVATED");}
		}

		if(blockId == actBlock2 && getTile(x,y+1,z) == actBlock1 && getTile(x,y-1,z) == actBlock3)
		{
			gX = x;
			gY = y - 1;
			gZ = z;
			direction = Math.floor((Math.random()*24)+1);
			active = 1;
			if(debugMode) {clientMessage("ACTIVATED");}
		}
		
		if(blockId == actBlock3 && getTile(x,y+1,z) == actBlock2 && getTile(x,y+2,z) == actBlock1)
		{
			gX = x;
			gY = y;
			gZ = z;
			direction = Math.floor((Math.random()*24)+1);
			active = 1;
			if(debugMode) {clientMessage("ACTIVATED");}
		}
	}
}

function moveTick()
{
	tickCurrent++;
	if(tickCurrent >= tickDuration)
	{
		tickCurrent = 0;
		return 1;
	}
	return 0;
}

function checkExistence()
{
	if(getTile(gX,gY,gZ) == actBlock3)
	{
		if(getTile(gX,gY+1,gZ) == actBlock2)
		{
			if(getTile(gX,gY+2,gZ) == actBlock1)
			{
				return 1;
			}
		}
	}
	return 0;
}

function canMoveOnFloor(px,py,pz)
{
	switch(getTile(px,py,pz))
	{
		case 0:
		case 6:
		case 8:
		case 9:
		case 10:
		case 11:
		case 26:
		case 30:
		case 31:
		case 32:
		case 37:
		case 38:
		case 39:
		case 40:
		case 44:
		case 50:
		case 51:
		case 53:
		case 54:
		case 59:
		case 63:
		case 64:
		case 65:
		case 67:
		case 68:
		case 71:
		case 78:
		if(debugMode) {clientMessage("CANNOT MOVE ON FLOOR");}
		return 0; break;
		default: if(debugMode) {clientMessage("CAN MOVE ON FLOOR");} return 1; break;
	}
	if(debugMode) {clientMessage("CAN MOVE ON FLOOR");}
	return 1;
}

function canMoveOn(ox,oy,oz)
{
	if((getTile(ox,oy,oz) == 0 || getTile(ox,oy,oz) == 51) && getTile(ox,oy+1,oz) == 0 && getTile(ox,oy+2,oz) == 0)
	{
		if(canMoveOnFloor(ox,oy-1,oz))
		{
			return 1;
		}
	}
	return 0;
}

function MoveOn(mx,my,mz)
{
	setTile(gX,gY,gZ,51);
	setTile(gX,gY+1,gZ,0);
	setTile(gX,gY+2,gZ,0);
	
	setTile(mx,my,mz,actBlock3);
	setTile(mx,my+1,mz,actBlock2);
	setTile(mx,my+2,mz,actBlock1);
}

function modTick()
{
	if(active == 1)
	{
		if(!checkExistence()) {active = 0;}
	
		if(moveTick())
		{
			if(Math.floor((Math.random()*5)+1) == 4)
			{
				if(debugMode) {clientMessage("RANDOMIZING DIRECTION");}
				direction = Math.floor((Math.random()*24)+1);
			}
			switch(direction)
			{
				 case 1:
					if(canMoveOn(gX+1,gY,gZ))
					{
						if(debugMode) {clientMessage("MOVING");}
						MoveOn(gX+1,gY,gZ);
						gX = gX+1;
					}
					else {direction = Math.floor((Math.random()*24)+1);}
					break;
					
				case 2:
					if(canMoveOn(gX-1,gY,gZ))
					{
						if(debugMode) {clientMessage("MOVING");}
						MoveOn(gX-1,gY,gZ);
						gX = gX-1;
					}
					else {direction = Math.floor((Math.random()*24)+1);}
					break;

				case 3:
					if(canMoveOn(gX,gY,gZ+1))
					{
						if(debugMode) {clientMessage("MOVING");}
						MoveOn(gX,gY,gZ+1);
						gZ = gZ+1;
					}
					else {direction = Math.floor((Math.random()*24)+1);}
					break;
					
				case 4:
					if(canMoveOn(gX,gY,gZ-1))
					{
						if(debugMode) {clientMessage("MOVING");}
						MoveOn(gX,gY,gZ-1);
						gZ = gZ-1;
					}
					else {direction = Math.floor((Math.random()*24)+1);}
					break;
			
			case 5:
					if(canMoveOn(gX-1,gY,gZ-1))
					{
						if(debugMode) {clientMessage("MOVING");}
						MoveOn(gX-1,gY,gZ-1);
gX = gX-1;
						gZ = gZ-1;
					}
					else {direction = Math.floor((Math.random()*24)+1);}
					break;

case 6:
					if(canMoveOn(gX+1,gY,gZ+1))
					{
						if(debugMode) {clientMessage("MOVING");}
						MoveOn(gX+1,gY,gZ+1);
gX = gX+1;
						gZ = gZ+1;
					}
					else {direction = Math.floor((Math.random()*24)+1);}
					break;

case 7:
					if(canMoveOn(gX+1,gY,gZ-1))
					{
						if(debugMode) {clientMessage("MOVING");}
						MoveOn(gX+1,gY,gZ-1);
gX = gX+1;
						gZ = gZ-1;
					}
					else {direction = Math.floor((Math.random()*24)+1);}
					break;

case 8:
					if(canMoveOn(gX-1,gY,gZ+1))
					{
						if(debugMode) {clientMessage("MOVING");}
						MoveOn(gX-1,gY,gZ+1);
gX = gX-1;
						gZ = gZ+1;
					}
					else {direction = Math.floor((Math.random()*24)+1);}
					break;

case 9:
					if(canMoveOn(gX+1,gY+1,gZ))
					{
						if(debugMode) {clientMessage("MOVING");}
						MoveOn(gX+1,gY+1,gZ);
						gX = gX+1;
gY = gY+1;
					}
					else {direction = Math.floor((Math.random()*24)+1);}
					break;
					
				case 10:
					if(canMoveOn(gX-1,gY+1,gZ))
					{
						if(debugMode) {clientMessage("MOVING");}
						MoveOn(gX-1,gY+1,gZ);
						gX = gX-1;
gY = gY+1;
					}
					else {direction = Math.floor((Math.random()*24)+1);}
					break;

				case 11:
					if(canMoveOn(gX,gY+1,gZ+1))
					{
						if(debugMode) {clientMessage("MOVING");}
						MoveOn(gX,gY+1,gZ+1);
gY = gY+1;
						gZ = gZ+1;
					}
					else {direction = Math.floor((Math.random()*24)+1);}
					break;
					
				case 12:
					if(canMoveOn(gX,gY+1,gZ-1))
					{
						if(debugMode) {clientMessage("MOVING");}
						MoveOn(gX,gY+1,gZ-1);
gY = gY+1;
						gZ = gZ-1;
					}
					else {direction = Math.floor((Math.random()*24)+1);}
					break;
			
			case 13:
					if(canMoveOn(gX-1,gY+1,gZ-1))
					{
						if(debugMode) {clientMessage("MOVING");}
						MoveOn(gX-1,gY+1,gZ-1);
gX = gX-1;
gY = gY+1;
						gZ = gZ-1;
					}
					else {direction = Math.floor((Math.random()*24)+1);}
					break;

case 14:
					if(canMoveOn(gX+1,gY+1,gZ+1))
					{
						if(debugMode) {clientMessage("MOVING");}
						MoveOn(gX+1,gY+1,gZ+1);
gX = gX+1;
gY = gY+1;
						gZ = gZ+1;
					}
					else {direction = Math.floor((Math.random()*24)+1);}
					break;

case 15:
					if(canMoveOn(gX+1,gY+1,gZ-1))
					{
						if(debugMode) {clientMessage("MOVING");}
						MoveOn(gX+1,gY+1,gZ-1);
gX = gX+1;
gY = gY+1;
						gZ = gZ-1;
					}
					else {direction = Math.floor((Math.random()*24)+1);}
					break;

case 16:
					if(canMoveOn(gX-1,gY+1,gZ+1))
					{
						if(debugMode) {clientMessage("MOVING");}
						MoveOn(gX-1,gY+1,gZ+1);
gX = gX-1;
gY = gY+1;
						gZ = gZ+1;
					}
					else {direction = Math.floor((Math.random()*24)+1);}
					break;

case 17:
					if(canMoveOn(gX+1,gY-1,gZ))
					{
						if(debugMode) {clientMessage("MOVING");}
						MoveOn(gX+1,gY-1,gZ);
						gX = gX+1;
gY = gY-1;
					}
					else {direction = Math.floor((Math.random()*24)+1);}
					break;
					
				case 18:
					if(canMoveOn(gX-1,gY-1,gZ))
					{
						if(debugMode) {clientMessage("MOVING");}
						MoveOn(gX-1,gY-1,gZ);
						gX = gX-1;
gY = gY-1;
					}
					else {direction = Math.floor((Math.random()*24)+1);}
					break;

				case 19:
					if(canMoveOn(gX,gY-1,gZ+1))
					{
						if(debugMode) {clientMessage("MOVING");}
						MoveOn(gX,gY-1,gZ+1);
gY = gY-1;
						gZ = gZ+1;
					}
					else {direction = Math.floor((Math.random()*24)+1);}
					break;
					
				case 20:
					if(canMoveOn(gX,gY-1,gZ-1))
					{
						if(debugMode) {clientMessage("MOVING");}
						MoveOn(gX,gY-1,gZ-1);
gY = gY-1;
						gZ = gZ-1;
					}
					else {direction = Math.floor((Math.random()*24)+1);}
					break;
			
			case 21:
					if(canMoveOn(gX-1,gY-1,gZ-1))
					{
						if(debugMode) {clientMessage("MOVING");}
						MoveOn(gX-1,gY-1,gZ-1);
gX = gX-1;
gY = gY-1;
						gZ = gZ-1;
					}
					else {direction = Math.floor((Math.random()*24)+1);}
					break;

case 22:
					if(canMoveOn(gX+1,gY-1,gZ+1))
					{
						if(debugMode) {clientMessage("MOVING");}
						MoveOn(gX+1,gY-1,gZ+1);
gX = gX+1;
gY = gY-1;
						gZ = gZ+1;
					}
					else {direction = Math.floor((Math.random()*24)+1);}
					break;

case 23:
					if(canMoveOn(gX+1,gY-1,gZ-1))
					{
						if(debugMode) {clientMessage("MOVING");}
						MoveOn(gX+1,gY-1,gZ-1);
gX = gX+1;
gY = gY-1;
						gZ = gZ-1;
					}
					else {direction = Math.floor((Math.random()*24)+1);}
					break;

case 24:
					if(canMoveOn(gX-1,gY-1,gZ+1))
					{
						if(debugMode) {clientMessage("MOVING");}
						MoveOn(gX-1,gY-1,gZ+1);
gX = gX-1;
gY = gY-1;
						gZ = gZ+1;
					}
					else {direction = Math.floor((Math.random()*24)+1);}
					break;
			}
			
			
		}
	}
}