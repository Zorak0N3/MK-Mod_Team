// Warp Script
// By Chalk
// MCPE Korea
// Version : 0.3

function newLevel()
{
	print("\n[Warp]\nBy Chalk(amato17)\n/warp help로 사용법을 확인하세요");
}

function procCmd( cmd )
{	
	msg = cmd.split( ' ' );
	
	if( msg[0] == 'warp' )
	{
		if( isNaN( msg[1] ) )
		{
			if( msg[1] == 'help' )
			{
				print( "\n[Warp]\n/warp set [번호] 로 현재 위치를 저장합니다\n/warp [번호] 로 저장한 위치로 이동합니다" );
			}
			else if( msg[1] == 'set' )
			{
				if( isNaN( msg[2] ) )
				{
					print( "\n[Warp]\n워프 번호는 숫자여야 합니다" );
				}
				else
				{
					pl = [ getPlayerX() , getPlayerY() , getPlayerZ() ];
					
					if( saveData( pl , msg[2] ) )
					{
						print( "\n[Warp]\n워프가 설정되었습니다" );
					}
					else
					{
						print( "\n[Warp]\n워프를 설정할 수 없습니다");
					}
				}
			}			
		}
		else
		{
			var load = loadData( msg[1] );
				
			if( load != null )
			{
				setPosition( getPlayerEnt() , load[0] , load[1] , load[2] );
				print( "\n[Warp]\n워프로 이동하였습니다" );
			}
			else
			{
				print( "\n[Warp]\n워프가 존재하지 않습니다");
			}
			
		}
	}
	
}
/* 
 *
 * 이 주석 아래에 있는 모든 내용을 그대로
 * 라이브러리를 이용할 스크립트에 붙여넣으세요
 *
 * 제작자 : 초크 ( amato17 ) | 버젼 : 0.4 | MCPE Korea Mod Team
 *
 * 좌표 배열을 리스트에 저장하는 방법
 *
 * var myLocation = [ parseInt( getPlayerX() ) , parseInt( getPlayerY() ) , parseInt( getPlayerZ() ) ];
 * var isSuccess = saveData( myLocation , 99 );
 * // 99번째 리스트에 myLocation의 값( 플레이어의 현재 위치 )을 저장함
 * // 전달할 배열과 순서는 반드시 자연수여야 함
 * // saveData() 함수는 성공여부를 반환함
 *
 * 리스트에서 좌표 배열을 불러오는 방법
 *
 * var myLoadLocation = loadData( 99 ); 
 * // 99번째 리스트에 저장된 배열을 myLoadedLocation 에 저장
 * // 해당 리스트에 저장된 배열이 존재하지 않으면 null 반환
 *
 */

function saveData( xyz , lis )
{	
	var list = parseInt( lis );
	if( list > 100 )
	{
		print("\n사용 가능한 리스트의 범위는 0 ~ 99 입니다");
		return false;
	}
	
	var Xone; 
	var Xtwo;
	var Xthree;
	
	var Yone;
	var Ytwo;
	var Ythree;
	
	var Zone;
	var Ztwo;
	var Zthree;
	
	if( xyz[0] < 10 )
	{
		Xone = getNum(0);
		Xtwo = getNum(0);
		Xthree = getNum( xyz[0] );
	}
	else if( xyz[0] < 100 )
	{
		Xone = getNum(0);
		Xtwo = getNum( parseInt( xyz[0] * 0.1 ) );
		Xthree = getNum( xyz[0] - ( Xtwo * 10 ) );
	}
	else if( xyz[0] <= 256 )
	{
		Xone = getNum( parseInt( xyz[0] * 0.01 ) ); //256 > 2
		Xtwo = getNum( parseInt( xyz[0] * 0.1 - Xone * 10 ) ); // 5
		Xthree = getNum( xyz[0] - ( ( Xone * 100 ) + ( Xtwo * 10 ) ) );
	}
	else
	{
		print("\nX축의 값이 올바르지 않습니다");
		return false;
	}
	
	
	if( xyz[1] < 10 )
	{
		Yone = getNum(0);
		Ytwo = getNum(0);
		Ythree = getNum( xyz[1] );
	}
	else if( xyz[1] < 100 )
	{
		Yone = getNum(0);
		Ytwo = getNum( parseInt( xyz[1] * 0.1 ) );
		Ythree = getNum( xyz[1] - ( Ytwo * 10 ) );
	}
	else if( xyz[1] <= 128 )
	{
		Yone = getNum( parseInt( xyz[1] * 0.01 ) ); //256 > 2
		Ytwo = getNum( parseInt( xyz[1] * 0.1 - Yone * 10 ) ); // 5
		Ythree = getNum( xyz[1] - ( ( Yone * 100 ) + ( Ytwo * 10 ) ) );
	}
	else
	{
		print("\nY축의 값이 올바르지 않습니다");
		return false;
	}
	
	
	if( xyz[2] < 10 )
	{
		Zone = getNum(0);
		Ztwo = getNum(0);
		Zthree = getNum( xyz[2] );
	}
	else if( xyz[2] < 100 )
	{
		Zone = getNum(0);
		Ztwo = getNum( parseInt( xyz[2] * 0.1 ) );
		Zthree = getNum( xyz[2] - ( Ztwo * 10 ) );
	}
	else if( xyz[2] <= 256 )
	{
		Zone = getNum( parseInt( xyz[2] * 0.01 ) ); //256 > 2
		Ztwo = getNum( parseInt( xyz[2] * 0.1 - Zone * 10 ) ); // 5
		Zthree = getNum( xyz[2] - ( ( Zone * 100 ) + ( Ztwo * 10 ) ) );
	}
	else
	{
		print("\nZ축의 값이 올바르지 않습니다");
		return false;
	}
	
	setTile( 256 - list , 0 , 1 , Xone );
	setTile( 256 - list , 0 , 2 , Xtwo );
	setTile( 256 - list , 0 , 3 , Xthree );
	
	setTile( 256 - list , 1 , 1 , Yone );
	setTile( 256 - list , 1 , 2 , Ytwo );
	setTile( 256 - list , 1 , 3 , Ythree );
	
	setTile( 256 - list , 2 , 1 , Zone );
	setTile( 256 - list , 2 , 2 , Ztwo );
	setTile( 256 - list , 2 , 3 , Zthree );
	
	print( "\n" + list + "번째 리스트에 저장이 완료되었습니다.");
	return true;
}

function loadData( lis )
{
	var list = parseInt( lis );
	if( list > 100 )
	{
		print("\n사용 가능한 리스트의 범위는 0 ~ 99 입니다");
		return null;
	}
	
	var XoneL = getNum( getTile( 256 - list , 0 , 1 ) );
	var XtwoL = getNum( getTile( 256 - list , 0 , 2 ) );
	var XthreeL = getNum( getTile( 256 - list , 0 , 3 ) );
	
	var YoneL = getNum( getTile( 256 - list , 1 , 1 ) );
	var YtwoL = getNum( getTile( 256 - list , 1 , 2 ) );
	var YthreeL = getNum( getTile( 256 - list , 1 , 3 ) );
	
	var ZoneL = getNum( getTile( 256 - list , 2 , 1 ) );
	var ZtowL = getNum( getTile( 256 - list , 2 , 2 ) );
	var ZthreeL = getNum( getTile( 256 - list , 2 , 3 ) );
	
	if( XoneL == 404 || XtwoL == 404 || XthreeL == 404 || YoneL == 404 || YtwoL == 404 || YthreeL == 404 || ZoneL == 404 || ZtwoL == 404 || ZthreeL == 404 )
	{
		print( "\n" + list + "번째 리스트에 저장된 데이터가 없거나 손상되었습니다");
		return null;
	}
	
	var finalX = XoneL * 100 + XtwoL * 10 + XthreeL;
	var finalY = YoneL * 100 + YtwoL * 10 + ZthreeL;
	var finalY = ZoneL * 100 + ZtwoL * 10 + ZthreeL;
	
	var xyzSend = [ finalX , finalY , finalZ ];
	
	print( "\n" + list + "번째 리스트에 저장된 데이터를 불러왔습니다");

	return xyzSend;
}

function getNum( nn )
{
	var zero = 80; // 눈블럭
	var one = 41; // 금블럭
	var two = 42; // 은블럭
	var three = 43; // 돌반블럭 두개겹침
	var four = 44; // 돌반블럭
	var five = 45; // 벽돌
	var six = 46; // TNT
	var seven = 47; //책장
	var eight = 48; // 모스스톤
	var nine = 49; // 옵시디언


	switch( nn )
	{
		case 0 :
			return zero;
		
		case 1 :
			return one;
			
		case 2 : 
			return two;
		
		case 3 :
			return three;
		
		case 4 :
			return four;
			
		case 5 :
			return five;
			
		case 6 :
			return six;
			
		case 7 :
			return seven;
			
		case 8 :
			return eight;
			
		case 9 :
			return nine;
			
		case zero :
			return 0;
		
		case one :
			return 1;
			
		case two : 
			return 2;
		
		case three :
			return 3;
		
		case four :
			return 4;
			
		case five :
			return 5;
			
		case six :
			return 6;
			
		case seven :
			return 7;
			
		case eight :
			return 8;
			
		case nine :
			return 9;
		
		default :
			return 404;
			
	}
	print("!");
}
