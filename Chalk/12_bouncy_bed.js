// Bouncy Bed
// By Chalk
// Current Version : 0.9

var val = 0.1;

function newLevel()
{
	print("\n[BouncyBed]\n제작자 : 초크\n침대의 가운데를 밟지 않으면 위험할 수 있습니다");	
	
}

function modTick()
{
	if( getTile( Player.getX() , Player.getY() - 2 , Player.getZ() ) == 26 )
	{
			Entity.setVelY( Player.getEntity() , val );
			val += 0.1;

	}
}
