//ver 0.4

var byVal = 5;
var upItem = 267;
var downItem = 292;

function newLevel()
{
	print("[highdot] 제작자 : 초크(amato17)\n철칼로 상승, 철괭이로 하강\n이동할 거리 설정 - /highdot 이동할 거리");
	print("이동할 거리 : " + byVal + "칸");
}

function useItem( x , y , z , i , b )
{
	if( i == upItem )
	{
		if( getTile( getPlayerX() , getPlayerY() - 2 , getPlayerZ() ) == 0)
		{
			setVelY( getPlayerEnt() , byVal );
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
	
	if( cutcmd[0] == "highdot" )
	{
		if( !(isNaN( cutcmd[1] ) ) )
		{
			byVal = cutcmd[1];
			print("이동할 거리 : " + byVal + "칸");
		}
		else
		{
			if( cutcmd[1] == "help" )
			{
				print("철칼로 상승, 철괭이로 하강\n이동할 거리 설정 - /highdot 이동할 거리");
			}
			else
			{
				print("이동할 거리는 숫자로 설정해야 합니다");
			}
		}
	}
}
