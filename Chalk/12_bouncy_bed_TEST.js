// Bouncy Bed
// By Chalk
// Current Version : 0.6

var val = 1;
var del = 0;
function modTick()
{
	if( getTile( Player.getX() , Player.getY() - 2 , Player.getZ() ) == 26 && del = 0 )
	{
			Entity.setVelY( Player.getEntity() , val );
			val += 0.1;
			del = 1;
	}
	else if( getTile( Player.getX() , Player.getY() - 2 , Player.getZ() ) == 0 && del = 1 )
	{
		del = 0;
		
	}


}
