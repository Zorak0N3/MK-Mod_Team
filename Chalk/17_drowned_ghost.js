// 물귀신 스크립트 - drowned ghost
// By Chalk ( amato17 ) - MCPE Korea

var isOn = true;

function procCmd( command )
{
	if( command == "물귀신님 사랑해요" )
	{
		isOn = false;
		print("\n오냐! 너는 풀어주마~");
	}
}

function modTick()
{
	var bb = getTile( getPlayerX() , getPlayerY() - 2 , getPlayerZ() );
	
	if( isOn && ( bb == 8 || bb == 9 || bb == 10 || bb == 11 ) )
	{

		setVelY( getPlayerEnt() , -0.05 );
	}
}
