var player = null;

function useItem(x, y, z, itemId, blockId)
{
	if(itemId == 0)
	{
		player = getPlayerEnt();
		
		setVelY(player, 2);
	}
}