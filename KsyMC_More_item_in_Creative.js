var LAVA = 37;
var WATER = 38;
var FLINT_AND_STEEL = 39;
var COBWAB = 40;
 
function useItem(x, y, z, itemId, blockId, side)
{
	block = getSide(x, y, z, side);
	
	if(getTile(block[0], block[1], block[2]) != 0) return;
	
	if(itemId == LAVA)
	{
		setTile(block[0], block[1], block[2], 11);
		preventDefault();
	}
	
	if(itemId == WATER)
	{
		setTile(block[0], block[1], block[2], 9);
		preventDefault();
	}
	
	if(itemId == FLINT_AND_STEEL)
	{
		setTile(block[0], block[1], block[2], 51);
		preventDefault();
		
		if(getTile(x, y, z) == 46)
			explode(x, y, z, 0.5);
	}
	
	if(itemId == COBWAB)
	{
		setTile(block[0], block[1], block[2], 30);
		preventDefault();
	}
}
 
function procCmd(cmd)
{
	var arg = cmd.split(" ");
	
	if(arg == "setlava")
		LAVA = getCarriedItem();
	else if(arg == "setwater")
		WATER = getCarriedItem();
	else if(arg == "setfas")
		FLINT_AND_STEEL = getCarriedItem();
	else if(arg == "setcobweb")
		COBWEB = getCarriedItem();
}
 
function getSide(x, y, z, side)
{
	var pos = new Array(2);
	
	if(side == 0) pos = [x, y - 1, z];
	if(side == 1) pos = [x, y + 1, z];
	if(side == 2) pos = [x, y, z - 1];
	if(side == 3) pos = [x, y, z + 1];
	if(side == 4) pos = [x - 1, y, z];
	if(side == 5) pos = [x + 1, y, z];
	
	return pos;
}