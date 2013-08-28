// Bouncy Bed
// By Chalk
// Current Version : 1.4

var up = 0.1;

function newLevel()
{
	print( "\n[Bouncy-Bed]\nBy Chalk(amato17\n침대를 밟으면 낙사데미지를 입는다고!" );	
}

function useItem( x , y , z , itemID , blockID )
{
	up = 0.1;
}

function modTick()
{
	if( getTile( getPlayerX() , getPlayerY() - 2 , getPlayerZ() ) == 26 )
	{
		setVelY( getPlayerEnt() , up );
		up += 0.1;
	}
	else if( getTile( getPlayerX() , getPlayerY() - 2 , getPlayerZ() ) != 0  )
	{
		
		up = 0.1;
	}
}
