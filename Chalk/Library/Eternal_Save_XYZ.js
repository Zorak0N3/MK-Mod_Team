/* 
 *
 * 이 주석 아래에 있는 모든 내용을 그대로
 * 라이브러리를 이용할 스크립트에 붙여넣으세요 
 *
 * ## 좌표 배열을 리스트에 저장하는 방법
 * var myLocation = [ 128 , 64 , 128 ];
 * saveData( myLocation , 99 ); 
 * // 99번째 리스트에 myLocation의 값을 저장함
 *
 * ## 리스트에서 좌표 배열을 불러오는 방법
 * var myLoadedLocation = loadData( 99 ); 
 * // 99번째 리스트에 저장된 배열을 myLoadedLocation 에 저장
 *
 * 제작자 : 초크 ( amato17 ) | 버젼 : 0.2 | MCPE Korea Mod Team
 *
 */

function saveData( xyz , list )
{	
	if( list > 100 )
	{
		print("사용 가능한 리스트의 범위는 0 ~ 99 입니다");
		return;
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
	else if xyz[0] <= 256 )
	{
		Xone = getNum( parseInt( xyz[0] * 0.01 ) ); //256 > 2
		Xtwo = getNum( parseInt( xyz[0] * 0.1 - Xone * 10 ) ); // 5
		Xthree = getNum( xyz[0] - ( ( Xone * 100 ) + ( Xtwo * 10 ) ) );
	}
	else
	{
		print("X축의 값이 올바르지 않습니다");
		return;
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
	else if xyz[1] <= 128 )
	{
		Yone = getNum( parseInt( xyz[1] * 0.01 ) ); //256 > 2
		Ytwo = getNum( parseInt( xyz[1] * 0.1 - Yone * 10 ) ); // 5
		Ythree = getNum( xyz[1] - ( ( Yone * 100 ) + ( Ytwo * 10 ) ) );
	}
	else
	{
		print("Y축의 값이 올바르지 않습니다");
		return;
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
	else if xyz[2] <= 256 )
	{
		Zone = getNum( parseInt( xyz[2] * 0.01 ) ); //256 > 2
		Ztwo = getNum( parseInt( xyz[2] * 0.1 - Zone * 10 ) ); // 5
		Zthree = getNum( xyz[2] - ( ( Zone * 100 ) + ( Ztwo * 10 ) ) );
	}
	else
	{
		print("Z축의 값이 올바르지 않습니다");
		return;
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
	
	print( list + "번째 리스트에 저장이 완료되었습니다.");
}

function loadData( list )
{
	if( list > 100 )
	{
		print("사용 가능한 리스트의 범위는 0 ~ 99 입니다");
		return;
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
		print( list + "번째 리스트에 저장된 데이터가 없거나 손상되었습니다");
		return;
	}
	
	var finalX = XoneL * 100 + XtwoL * 10 + XthreeL;
	var finalY = YoneL * 100 + YtwoL * 10 + ZthreeL;
	var finalY = ZoneL * 100 + ZtwoL * 10 + ZthreeL;
	
	var xyzSend = [ finalX , finalY , finalZ ];
	
	print( list + "번째 리스트에 저장된 데이터를 불러왔습니다");

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
}
