var Player = null;
var RandomX = 0;
var RandomY = 0;
var RandomZ = 0;
var tick = 0;
var savetime= 0;

function newLevel()
{
	print("게임을 시작하지");
}

function modTick()
{
	if(getYaw() == 0) return;
	
	tick++;
	if(tick - savetime < 20) return;
	
	savetime = tick;
	
	if(getCarriedItem() == 264)
	{
		print("아깝군....잘가라");
	}
	else
	{
		newrandom();
		
		if(getTile(RandomX, RandomY, RandomZ) != 0)
		{
			setTile(RandomX, RandomY, RandomZ, 0);
		}
	}
}

function newrandom()
{
	RandomX = parseInt(math.random( ) * 256);
	RandomY = parseInt(math.random( ) * 128);
	RandomZ = parseInt(math.random( ) * 256);
}