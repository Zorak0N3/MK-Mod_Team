// 물귀신 스크립트 - drowned ghost
// By Chalk ( amato17 ) - MCPE Korea
// Ver 0.2

var isOn = true;

function newLevel()
{
	print("\n[Drowned-Ghost]\nBy Chalk(amato17)\n\"/물귀신님 사랑해요\" 또는 \"/i love drowned ghost\"를 외치면 물귀신의 노여움이 풀립니다");
}

function procCmd( command )
{
	if( command == "물귀신님 사랑해요" || command == "i love drowned ghost" )
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
