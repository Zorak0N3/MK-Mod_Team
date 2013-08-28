// Walk proudly wherever - 어디서나 당당하게 걷기
// 제작자 : 초크 ( amato17 ) - MCPE Korea Mod Team
// Current Version = 0.2

var isOn = false;

function newLevel()
{
	print("\n[Float]\nBy Chalk(amato17)\n/float [on|off]로 액체 위를 걸을 수 있다고!");
}

function procCmd( command )
{
	if( command == "float on" )
	{
		isOn = true;
		print("\n어디서나 당당하게 걷기~");
	}
	else if( command == "float off" )
	{
		isOn = false;
		print("\n이제 물이나 용암 위를 걸을 수 없습니다!");
	}
}

function modTick()
{
	var bb = getTile( getPlayerX() , getPlayerY() - 2 , getPlayerZ() );
	
	if( isOn && ( bb == 8 || bb == 9 || bb == 10 || bb == 11 ) )
	{

		setVelY( getPlayerEnt() , 0 );

	}
}
