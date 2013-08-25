// Bouncy Bed
// By Chalk
// Current Version : 0.5

var val = 1;
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
			val += 0.1;
			del = 15;
		}
	}

}
