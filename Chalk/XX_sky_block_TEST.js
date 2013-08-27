// Ver 0.2
// By Chlak - amato17

var realy = 0;
var givedItem = 0;
var spawnX = 128;
var spawnY = 64;
var spawnZ = 128;
var money = 0;

function useItem( x , y , z , iID , bID )
{
	if( iID == 345 )
	{
		setPosition( getPlayerEnt() , spawnX , spawnY , spawnZ );
		print("\n메인 섬으로 이동하였습니다");
	}
}

function attackHook( attacker , victim )
{
	if( getCarriedItem() == 0 )
	{
		money += 50;
	}
	else
	{
		money += 10;
	}
	
	if( money % 1000 == 0 )
	{
		print( "\n현재 획득한 돈은 " + money + "원 입니다");
	}

}

function modTick()
{
	if( getCarriedItem() == 344 ) // 계란
	{
		setVelY( getPlayerEnt() , 0 ); // 하늘에서 날기 유지
	}
}

function procCmd( cmd )
{
	var cc = cmd.split( ' ' );
	
	if( cc[0] == "skyblock" )
	{
		if( cc[1] == "help" )
		{
			print("\n맵을 스카이블럭으로 만들려면 /skyblock make 를 입력하세요\n스카이블럭 기본 아이템을 얻으려면 /skyblock item 을 입력하세요");
			print("\n아이템을 사려면 /skyblock buy [아이템 영어 이름] [개수] 를 입력하세요\n들고 있는 아이템을 한개 팔려면 /skyblock sell 을 입력하세요");
			print("\n살 수 있는 아이템을 확인하려면 /skyblock buy list 를 입력하세요\n팔 수 있는 아이템을 확인하려면 /skyblock sell list 를 입력하세요");
			print("\n나침판으로 블럭을 클릭하면 메인 섬으로 이동할 수 있습니다\n계란을 들고 있으면 공중에 떠 있을 수 있습니다");
			print("\n현재 가지고 있는 돈을 확인하려면 /skyblock money 를 입력하세요");
			print("\n몹을 손으로 때리면 50원을 벌 수 있습니다\n도구를 이용해서 때리면 10원만 벌 수 있습니다");	
		}
		else if( cc[1] == "make" )
		{
			if( realy == 0 )
			{
				realy = 1;
				print("\n맵을 스카이블럭으로 만듭니다\n원래 맵은 복구할 수 없습니다\n정말로 스카이블럭으로 변경하시겠습니까?\n\n다시 한번 명령어를 입력하면 맵을 스카이블럭으로 변경합니다");
			}
			if( realy == 1 )
			{
				realy == 2;
				print("\n스카이블럭으로 만드는 중...\n잠시만 기다려 주십시오...\n약간의 렉이 있을 수 있습니다");
				c2sb();
			}		
		}
		else if( cc[1] == "item" )
		{
			if( givedItem == 0 )
			{
				addItemInventory( 79 , 1 ); // 얼음
				addItemInventory( 352 , 1 ); // 뼈
				addItemInventory( 10 , 1 ); // 용암
				addItemInventory( 287 , 12 ); // 실 12개 - 침대용
				addItemInventory( 295 , 10 ); // 씨앗
				addItemInventory( 338 , 1 ); // 사탕수수
				addItemInventory( 345 , 1 ); // 나침반
				addItemInventory( 344 , 3 ); // 달걀
				givedItem = 1;
			}
			else
			{
				print("\n이미 스카이블럭 기본 아이템을 지급받았습니다");
			}
		}
		else if( cc[1] == "buy" )
		{
			if( cc[2] == "list")
			{
				print("\n나무판자 - 500원\n석탄 - 1000원\n철괴 - 2000원\n금괴 - 3000원\n다이아몬드 - 5000원");
				return;
			}
			
			var mount = 1;
			
			if( cc[3] > 1 )
			{
				mount = cc[3];
			}
			
			if( cc[2] == "wood")
			{
				if( money > ( 500 * mount ) )
				{
					money -= ( 500 * mount );
					addItemInventory( 5, mount );
					print("\n나무판자 " + mount + "개를 " + ( 500 * mount ) + "원에 구입했습니다\n구입 후 남은 돈은 " + money + "원입니다");
				}
				else
				{
					print( "\n돈이 " + ( 500 * mount ) - money + "원 모자라서 구입할 수 없습니다");
				}
			}
			if( cc[2] == "coal")
			{
				if( money > ( 1000 * mount ) )
				{
					money -= ( 1000 * mount );
					addItemInventory( 263, mount );
					print("\n석탄 " + mount + "개를 " + ( 1000 * mount ) + "원에 구입했습니다\n구입 후 남은 돈은 " + money + "원입니다");
				}
				else
				{
					print( "\n돈이 " + ( 1000 * mount ) - money + "원 모자라서 구입할 수 없습니다");
				}
			}
			if( cc[2] == "iron")
			{
				if( money > ( 2000 * mount ) )
				{
					money -= ( 2000 * mount );
					addItemInventory( 265, mount );
					print("\n철괴 " + mount + "개를 " + ( 2000 * mount ) + "원에 구입했습니다\n구입 후 남은 돈은 " + money + "원입니다");
				}
				else
				{
					print( "\n돈이 " + ( 2000 * mount ) - money + "원 모자라서 구입할 수 없습니다");
				}
			}
			if( cc[2] == "gold")
			{
				if( money > ( 3000 * mount ) )
				{
					money -= ( 3000 * mount );
					addItemInventory( 266, mount );
					print("\n금괴 " + mount + "개를 " + ( 3000 * mount ) + "원에 구입했습니다\n구입 후 남은 돈은 " + money + "원입니다");
				}
				else
				{
					print( "\n돈이 " + ( 3000 * mount ) - money + "원 모자라서 구입할 수 없습니다");
				}
			}
			if( cc[2] == "diamond")
			{
				if( money > ( 5000 * mount ) )
				{
					money -= ( 5000 * mount );
					addItemInventory( 264, mount );
					print("\n다이아몬드 " + mount + "개를 " + ( 5000 * mount ) + "원에 구입했습니다\n구입 후 남은 돈은 " + money + "원입니다");
				}
				else
				{
					print( "\n돈이 " + ( 5000 * mount ) - money + "원 모자라서 구입할 수 없습니다");
				}
			}
		
		}
		else if( cc[1] == "sell" )
		{
		
			if( cc[2] == "list")
			{
				print("\n조약돌 - 10원\n깃털 - 150원\n실 - 200원\n화약 - 250원\n뼈 - 350원\n사탕수수 - 450원\n밀 - 500원");
				return;
			}
			
			var sellItem = getCarriedItem();
			
			if( sellItem == 4 )
			{
				addItemInventory( sellItem , -1 );
				money += 10;
				print("\n조약돌 한개를 팔아서 10원을 벌었습니다\n판매 후 남은 돈은 " + money + "원입니다");
			}
			else if( sellItem == 289 ) // 화약
			{
				addItemInventory( sellItem , -1 );
				money += 250;
				print("\n화약 한개를 팔아서 250원을 벌었습니다\n판매 후 남은 돈은 " + money + "원입니다");
			}
			else if( sellItem == 288 ) // 깃털
			{
				addItemInventory( sellItem , -1 );
				money += 150;
				print("\n깃털 한개를 팔아서 150원을 벌었습니다\n판매 후 남은 돈은 " + money + "원입니다");
			}
			else if( sellItem == 287 ) // 실
			{
				addItemInventory( sellItem , -1 );
				money += 200;
				print("\n실 한개를 팔아서 200원을 벌었습니다\n판매 후 남은 돈은 " + money + "원입니다");
			}
			else if( sellItem == 338 ) // 사탕수수
			{
				addItemInventory( sellItem , -1 );
				money += 450;
				print("\n사탕수수 한개를 팔아서 450원을 벌었습니다\n판매 후 남은 돈은 " + money + "원입니다");
			}
			else if( sellItem == 352 ) // 뼈
			{
				addItemInventory( sellItem , -1 );
				money += 350;
				print("\n뼈 한개를 팔아서 350원을 벌었습니다\n판매 후 남은 돈은 " + money + "원입니다");
			}
			else if( sellItem == 296 ) // 밀
			{
				addItemInventory( sellItem , -1 );
				money += 500;
				print("\n밀 한개를 팔아서 500원을 벌었습니다\n판매 후 남은 돈은 " + money + "원입니다");
			}
		}
		else if( cc[1] == "money")
		{
			print("\n현재 가지고 있는 돈은 " + money + "원입니다");
		
		}
	}
}

function c2sb()
{
	for( var selX = 0; selX <= 256; selX++ )
	{
		for( var selY = 0; selY <= 128; selY++ )
		
			for( var selZ = 0; selZ <= 256; selZ++ )
			{
				setTile( selX , selY , selZ , 0 );
			}
		}
	}
	print("\n맵 클리어 완료!\n이제 스카이블럭을 만듭니다!");
	
	for( var sbX = 124; sbX <= 129; sbX++ ) // 흙 생성
	{
		for( var sbY = 60; sbY <= 63; sbY++ )
		
			for( var sbZ = 124; sbZ <= 129; sbZ++ )
			{
				setTile( sbX , sbY , sbZ , 3 );
			}
		}
	}
	
	for( var sbgX = 124; sbgX <= 129; sbgX++ ) // 잔디 생성
	{
		for( var sbgZ = 124; sbgZ <= 129; sbgZ++ )
		{
			setTile( sbgX , 64, sbgZ , 2 );
		}
	}
	
	for( var sbaX = 124; sbaX <= 126; sbaX++ ) // ㄱ자로 변경
	{
		for( var sbaY = 60; sbaY <= 64; sbaY++ )
		
			for( var sbaZ = 124; sbaZ <= 126; sbaZ++ )
			{
				setTile( sbaX , sbaY , sbaZ , 0 );
			}
		}
	}
	
	setTile( 124 , 65 , 128 , 54 ); // 창고 설치
	
	setTile( 128 , 65 , 125 , 6 ); // 묘목 설치
	
	setTile( 127 , 60 , 128 , 7 ); // 용암 떨어짐 방지 베드락 설치
	
	print("\n스카이블럭이 생성되었습니다\n정상적인 플레이를 위해 리스폰합니다");
	
	setPosition( getPlayerEnt() , 0 , 0 , 0 ); // 플레이어 죽임
	
	print("\n스카이블럭 기본 아이템을 얻으려면 /skyblock item 을 입력하세요");
	
	money = 1000; // 기본지급 1000원
	
	realy = 0;
}
