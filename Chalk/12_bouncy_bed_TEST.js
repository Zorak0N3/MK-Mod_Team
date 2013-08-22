// Bouncy Bed
// By Chalk
// Current Version : 0.2

var val = 2;

function modTick()
{
	if( Level.getTile( Player.getX() , Player.getY() - 2 , Player.getZ() ) == 26 )
	{
		Entity.setVelY( Player.getEntity() , val );
		val *= 1.5;
	}
}
