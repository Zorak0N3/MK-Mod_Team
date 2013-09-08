var home = new Array(3);
 
function useItem(x, y, z, item, block)
{
  if(item == 265)
	{
		home[0] = getPlayerX();
		home[1] = getPlayerY();
		home[2] = getPlayerZ();
		
		print("Set home!");
	}
	
	if(item == 266)
	{
		if(home[0] == 0 && home[1] == 0 && home[2] == 0)
		{
			print("You do not have a house.");
		}
		else
		{
			setPosition(getPlayerEnt(), home[0], home[1], home[2]);
			print("Go to home!");
		}
	}
}