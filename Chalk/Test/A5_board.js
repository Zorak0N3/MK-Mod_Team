// 0.1

var onoff = 0; // 맨처음에는 꺼짐
var use; // 보드를 만들었는지 여부

var lastX = 0; // 보드를 만든 위치 X
var lastY = 0; // 보드를 만든 위치 Y
var lastZ = 0; // 보드를 만든 위치 Z


var itemT = 0;			   
var itemL = 0; var itemC = 0; var itemR = 0;
var itemB = 0;

function newLevel()
{
	print("\n[Board]\nBy Chalk(amato17\n/board help 명령어로 사용법을 확인하세요");

}
function useItem( x , y , z , i , b )
{
	if( b == 89 )
	{
		if( x == lastX && y == lastY && z == lastZ )
		{
			preventDefault(); // 가운데 클릭시
			setVelY( getPlayerEnt() , 2 ); // 두칸위로 점프
		}
	}
}
  
function procCmd( cmd )
{
	if( cmd == "board" )
	{
		
		onoff = onoff ? 0 : 1;
		if( onoff )
		{
			print( "\n[Board]\n보드를 활성화합니다" );
		}
		else
		{
			print( "\n[Board]\n보드를 비활성화합니다" );
			
			if( use )
			{
				setTile( lastX + 0 , lastY , lastZ - 1 , itemT );
				setTile( lastX - 1 , lastY , lastZ + 0 , itemL );
				setTile( lastX + 0 , lastY , lastZ + 0 , itemC );
				setTile( lastX + 1 , lastY , lastZ + 0 , itemR );
				setTile( lastX + 0 , lastY , lastZ + 1 , itemB );
				
				use = 0; // 보드를 없애고 사용해제
			}
		}
	}
	else if( cmd == "board help" )
	{
		print( "\n[Board]\n/board 를 입력해 보드를 활성화 / 비활성화합니다" );
	}
}

function modTick()
{

	if( use == 0 ) // 카운트가 초기값인 경우 불을 만들 위치 지정 ( 사용하지 않았을때에만 )
	{
		lastX = parseInt( getPlayerX() );
		lastY = parseInt( getPlayerY() - 2 ); // 밟고있는 블럭
		lastZ = parseInt( getPlayerZ() );
	}
	
	if( onoff ) // 켜저있을 경우
	{
		if( !use ) // 아직 사용하지 않았을 경우
		{
			itemT = getTile( lastX + 0 , lastY , lastZ - 1);
			itemL = getTile( lastX - 1 , lastY , lastZ + 0);
			itemC = getTile( lastX + 0 , lastY , lastZ + 0);
			itemR = getTile( lastX + 1 , lastY , lastZ + 0);
			itemB = getTile( lastX + 0 , lastY , lastZ + 1);
			
			setTile( lastX + 0 , lastY , lastZ - 1 , 89 );
			setTile( lastX - 1 , lastY , lastZ + 0 , 89 );
			setTile( lastX + 0 , lastY , lastZ + 0 , 89 );
			setTile( lastX + 1 , lastY , lastZ + 0 , 89 );
			setTile( lastX + 0 , lastY , lastZ + 1 , 89 );

			use = 1; // 사용함
		}
		else if( lastX != parseInt( getPlayerX() ) || lastY != parseInt( getPlayerY() - 2 ) || lastZ != parseInt( getPlayerZ() ) )
		{ 
			// 이미 사용했고, 플레이어가 움직였울 경우
			
			setTile( lastX + 0 , lastY , lastZ - 1 , itemT );
			setTile( lastX - 1 , lastY , lastZ + 0 , itemL );
			setTile( lastX + 0 , lastY , lastZ + 0 , itemC );
			setTile( lastX + 1 , lastY , lastZ + 0 , itemR );
			setTile( lastX + 0 , lastY , lastZ + 1 , itemB );
			
			use = 0; // 보드를 없애고 사용해제
		}
	}
}
