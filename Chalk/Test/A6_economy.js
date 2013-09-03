// 경제 스크립트 //
// 버젼 : 0.1 //
// By Chalk //

// 화폐 //

var goldI = 266; // 금괴 - 1골드
var goldB = 41; // 금블럭 - 9골드

// 상태 변수 //

var charge = false;

var myFund = 0; // 통장 잔고

var inputMode = false; // 입금모드
var inputFund = 0; // 입금한 금액

var outputMode = false; // 출금모드

// 맵 로딩시 //

function newLevel()
{
	print( "\n[Economy]\nBy Chalk(amato17\n\"/통장\" 명령어 확인" );
	
	var d = new Date();
	
	if( d.getDay() < 1 || d.getHours() < 7 || d.getHours() > 17 )
	{
		charge = true;
		print("현재 은행 영엄시간이 아닙니다\n입금시 수수료가 부과됩니다");
	}
}

function procCmd( cmd )
{
	var msg = cmd.split( ' ' );
	
	if( msg[0] == "통장" )
	{
		if( msg.length == 1 )
		{
			print("원하시는 거래를 선택하세요\n\n- 입금\n- 출금\n- 잔고\n\n블럭런쳐를 종료하면 통장이 초기화됩니다");
		}
		else if( msg[1] == "입금" )
		{
			if( inputMode )
			{
				print( "금괴 또는 금블럭으로 블럭을 클릭해 입금해 주십시오" );
			}
			else
			{
				print( "원하시는 금액을 입금해 주십시오\n입금이 끝나면 \"/통장 입금완료\" 를 입력해 주십시오" );
				inputMode = true;
			}
		}
		else if( msg[1] == "입금완료" )
		{
			myFund += inputFund;
			print( "총 " + inputFund + "골드 입금하셨습니다\n잔고는 " + myFund + "골드입니다");
			inputFund = 0;
			inputMode = false;
		}
		else if( msg[1] == "출금" )
		{
			if( outputMode )
			{
				print( "원하시는 금액을 숫자로 입력해 주십시오" );
			}
			else
			{
				print("현재 잔고는 " + myFund + "골드입니다\n원하시는 금액을 숫자로 입력해 주십시오\n1회당 최대 64골드까지 출금할 수 있습니다");
				outputMode = true;
			}
		}
		else if( msg[1] == "잔고" )
		{
			print("현재 통장 잔고는 " + myFund + "골드입니다");
		}
	}
	else if( !( isNaN( parseInt( msg[0] ) ) ) && outputMode )
	{
		
		if( myFund - parseInt( msg[0] ) < 0 )
		{
			print("출금하려는 금액이 잔고보다 많습니다\n처음부터 출금을 다시 시도하십시오");
			outputMode = false;
		}
		else if( parseInt( msg[0] ) > 64 )
		{
			print( "1회당 최대 64골드까지 출금할 수 있습니다\n처음부터 출금을 다시 시도하십시오");
			outputMode = false;
		}
		else
		{
			myFund -= parseInt( msg[0] );
			addItemInventory( goldI , parseInt( msg[0] ) );
			print( "총 " + parseInt( msg[0] ) + "골드 출금하셨습니다\n잔고는 " + myFund + "골드입니다");
			outputMode = false;
		}
	}
}

function useItem( x , y , z , i , b , s )
{
	if( inputMode )
	{
		if( i == goldI || i == goldB )
		{
			preventDefault();
			addItemInventory( i , -1 );
			
			if( i == goldI )
			{
				inputFund += 1;
			}
			else
			{
				if( charge ) // 수수료 있으면
				{
					inputFund += 9;
				}
				else
				{
					inputFund += 10;
				}
			}
			print("현재까지 총 " + inputFund + "골드 입금하셨습니다\n입금을 완료하시려면 \"/통장 입금완료\" 를 입력해 주십시오");
		}
	}
}
