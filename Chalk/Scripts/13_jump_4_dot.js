//ver 0.6

var byVal = 5;
var upItem = 267;
var downItem = 292;

function newLevel()
{
	print("\n[Jump4Dot]\nBy Chalk(amato17\n철칼로 상승, 철괭이로 하강\n이동할 높이 설정 - /j4d 이동할 높이");
	print("\n이동할 거리 : " + byVal + "칸");
}

function useItem( x , y , z , i , b )
{
	if( i == upItem )
	{
		if( getTile( getPlayerX() , getPlayerY() - 2 , getPlayerZ() ) == 0)
		{
			setVelY( getPlayerEnt() , byVal );
		}
		else
		{
			print("\n날지 않은 상태에서 사용하면 위험합니다");
			
		}
	}
	else if( i == downItem )
	{
		setVelY( getPlayerEnt() , -byVal );
	}
}

function procCmd( cmd )
{
	cutcmd = cmd.split( ' ' );
	
	if( cutcmd[0] == "j4d" )
	{
		if( !(isNaN( cutcmd[1] ) ) )
		{
			byVal = cutcmd[1];
			print("\n이동할 거리 : " + byVal + "칸");
		}
		else
		{
			print("\n철칼로 상승, 철괭이로 하강\n이동할 높이 설정 - /j4d 이동할 높이");
		}
	}
}
