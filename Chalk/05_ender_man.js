// EnderMan Script - 5th
// By Chalk 
// Ver 1.4
// For MCPE Korea

var pl = null;

function newLevel()
{
	print("\n[Ender-Man]\nBy Chalk(amato17)");
}


function useItem(x, y, z, itemId, blockId)
{
    if(itemId==262)
    {
		while(true)
		{
			var rx = Math.floor(Math.random() * 257);
			var ry = Math.floor(Math.random() * 129);
			var rz = Math.floor(Math.random() * 257);
		
			if(getTile(rx, ry , rz)==0&&getTile(rx, ry + 1, rz)==0&&getTile(rx, ry - 1, rz)!=0)
			{
				pl = getPlayerEnt();
				setPosition(pl, rx, ry, rz);
				addItemInventory(262, -1);
				break;
			}
		}
		
	}
}
