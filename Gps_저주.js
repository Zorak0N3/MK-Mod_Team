var lavaX;
var lavaY;
var lavaZ;
var Active=0;
var Time;

function useItem(x,y,z,itemId,blockId)
{
	if(blockId==4&&itemId==292)
	{
		if(Active==0)
		{
			Active=1;
			print("몇초나 버티나 볼까?");
			setTile(getPlayerX(),getPlayerY(),getPlayerZ(),30);
			lavaX = getPlayerX();
			lavaY = getPlayerY();
			lavaZ = getPlayerZ();
		}
		else
		if(Active == 1)
		{
			Active = 0;
			print("게임을 종료하지!");
		}
		preventDefault();
	}
}

function placeLava(x,y,z)
{
	setTile(x,y+4,z,10);
		setTile(x+10,y+4,z,10);
		setTile(x-10,y+4,z,10);
		setTile(x+10,y+4,z-10,10);
		setTile(x-10,y+4,z+10,10);
		setTile(x+10,y+4,z+10,10);
		setTile(x-10,y+4,z-10,10);
	lavaX=x;
	lavaY=y;
	lavaZ=z;
}

function modTick()
{

	if(Active == 1)
	{
	Time=getPlayerX()-lavaX;
	if(Time<0) {Time=-Time;}
	if(Time>10) {placeLava(getPlayerX(), getPlayerY(), getPlayerZ());}
	else
	{
		Time=getPlayerY()-lavaY;
		if(Time<0) {Time=-Time;}
		if(Time>10) {placeLava(getPlayerX(), getPlayerY(), getPlayerZ());}
		else
		{
			Temp=getPlayerZ()-lavaZ;
			if(Time<0) {Time=-Time;}
			if(Time>10) {placeLava(getPlayerX(), getPlayerY(), getPlayerZ());}
		}
	}
	}
}