// Bouncy Bed
// By Chalk
// Current Version : 0.4

var val = 2;
var del = 15;
function modTick()
{
	if( del > 0 )
	{
		del--;
		
	}
	else
	{
		if( Level.getTile( Player.getX() , Player.getY() - 2 , Player.getZ() ) == 26 )
		{
			Entity.setVelY( Player.getEntity() , val );
			val += 1;
		}
	}

}
