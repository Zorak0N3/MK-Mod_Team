// PITFALL SCRIPT BY CHALK VER 1.3 FOR MCPEKOREA - 4
function modTick()
{
    sx = getPlayerX();
    sy = getPlayerY() - 3; // 발밑블럭보다 한칸아래
	sz = getPlayerZ();
	// getPlayerEnt();
	
	if(getTile(sx,sy,sz)==82)
	{
		pf(sx, sy, sz);
	}
}

function pf(fx, fy, fz)
{
	if(getTile(fx,fy,fz)==82)
	{
	
		setTile(fx, fy + 1, fz, 0);
        
		setTile(fx, fy, fz, 0);
		
		if(getTile(fx + 1, fy, fz)==82) //동
		{
			pf(fx + 1, fy, fz)
		}
		if(getTile(fx + 1, fy, fz + 1)==82) // 동남
		{
			pf(fx + 1, fy, fz + 1)
		}
		if(getTile(fx + 1, fy, fz - 1)==82) //동북
		{
			pf(fx + 1, fy, fz - 1)
		}
		if(getTile(fx - 1, fy, fz)==82) //서
		{
			pf(fx - 1, fy, fz)
		}
		if(getTile(fx - 1, fy, fz + 1)==82)//서남
		{
			pf(fx - 1, fy, fz + 1)
		}
		if(getTile(fx - 1, fy, fz - 1)==82) //서북
		{
			pf(fx - 1, fy, fz - 1)
		}
		if(getTile(fx, fy, fz + 1)==82) // 남
		{
			pf(fx, fy, fz + 1)
		}
		if(getTile(fx, fy, fz - 1)==82) //북
		{
			pf(fx, fy, fz - 1)
		}
		
	}
}
