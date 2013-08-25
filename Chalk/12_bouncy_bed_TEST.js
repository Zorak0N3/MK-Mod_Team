// Bouncy Bed
// By Chalk
// Current Version : 0.7

var val = 0.1;

function modTick()
{
	if( getTile( Player.getX() , Player.getY() - 2 , Player.getZ() ) == 26 )
	{
			Entity.setVelY( Player.getEntity() , val );
			val += 0.01;

	}
}
