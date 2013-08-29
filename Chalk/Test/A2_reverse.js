// Ver 0.1

var on = 0;

function procCmd( cmd )
{
	if( cmd == "reverse on" )
	{
		on = 1;
		print("\n[Reverse]\nReverse ON");
	}
	else if( cmd == "reverse off" )
	{
		on = 0;
		print("\n[Reverse]\nReverse OFF");
	}
}

function modTick()
{
	var b = getTile( getPlayerX() , getPlayerY() - 2 , getPlayerZ() );
	
	if( on )
	{
		if( b )
		{
			setPosition( getPlayerX() , getPlayerY() - 0.05 , getPlayerZ() );
	
		}
		else
		{
			setVelY( getPlayerEnt() , 0 );
		}
	}
}
