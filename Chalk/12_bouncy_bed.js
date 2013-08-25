// Bouncy Bed
// By Chalk
// Current Version : 1.0

var val = 0.1;

function newLevel()
{
	print("\n[BouncyBed]\n제작자 : 초크\n침대의 가운데를 밟지 않으면 위험할 수 있습니다");	
	
}

function useItem( x, y, z, i, b )
{
	val = 0.1;
}

function modTick()
{
	if( getTile( getPlayerX() , getPlayerY() - 2 , getPlayerZ() ) == 26 )
	{
			setVelY( getPlayerEnt() , val );
			val += 0.1;
	}
}
