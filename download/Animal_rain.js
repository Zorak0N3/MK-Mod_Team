function useItem(x, y, z, item, block)
{
	if(item == 341)
	{
		var startX = getPlayerX() - 50;
		var endX = getPlayerX() + 50;
		var startY = getPlayerY() + 200;
		var endY = getPlayerY() + 200;
		var startZ = getPlayerZ() - 50;
		var endZ = getPlayerZ() + 50;
		
		for(var x = startX; x <= endX; x++)
		{
			for(var y = startY; y <= endY; y++)
			{
				for(var z = startZ; z <= endZ; z++)
				{
					var random = parseInt(Math.random() * 100);
					if(random == 7)
					{
						spawnCow(x, y, z, "mob/cow.png");
						spawnChicken(x, y, z, "mob/chicken.png");
					}
				}
			}
		}
	}
}