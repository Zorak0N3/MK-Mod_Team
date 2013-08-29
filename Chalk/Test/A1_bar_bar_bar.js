// Crayon Pop - Bar Bar Bar
// Pop Pop Crayon Pop - Get Set Ready Go!
// Ver 0.4

var px;
var py;
var pz;

var a;
var b;
var c;
var d;
var e;

var time = 30;

var go = 0;
var attReady = 0;

function procCmd( cmd )
{
	if( cmd == "팝 팝 크레용팝" )
	{
		px = getPlayerX();
		py = getPlayerY();
		pz = getPlayerZ();
		
		print("\n겟! - 소 5마리가 스폰됩니다");
		
		spawnCow( px - 4 , py , pz , "mob/cow.png" );
		spawnCow( px - 2 , py , pz , "mob/cow.png" );
		spawnCow( px + 0 , py , pz , "mob/cow.png" );
		spawnCow( px + 2 , py , pz , "mob/cow.png" );
		spawnCow( px + 4 , py , pz , "mob/cow.png" );
		
		print("\n셋! - 스폰된 소 5마리를 때려주세요");
		
		attReady = 1;
	
	}

}

function attackHook( attacker , victim )
{
	switch( attReady )
	{
		case 1 :
			preventDefault();
			a = victim;
			rideAnimal( a , a );
			attReady = 2;
			print("\n첫번째 소를 설정했습니다");
			break;
		case 2 :
			preventDefault();
			b = victim;
			rideAnimal( b , b );
			attReady = 3;
			print("\n두번째 소를 설정했습니다");
			break;
		case 3 :
			preventDefault();
			c = victim;
			rideAnimal( c , c );
			attReady = 4;
			print("\n세번째 소를 설정했습니다");
			break;
		case 4 :
			preventDefault();
			d = victim;
			rideAnimal( d , d );
			print("\n네번째 소를 설정했습니다");
			attReady = 5;
			break;
		case 5 :
			preventDefault();
			e = victim;
			rideAnimal( e , e );
			print("\n다섯번째 소를 설정했습니다");
			attReady = 6;
			
			print("\n레디! - 춤을 출 위치를 철괴로 설정하세요");
			
			break;
			
		case 6 :
			preventDefault();
			print("\n인벤토리에 추가된 철괴로 춤을 출 위치를 클릭하세요");
			
	}
	
}

function useItem( x , y , z , i , b )
{
	
	if( i == 265 && attReady == 6 )
	{
		
		addItemInventory( 265 , -1 );
		setPosition( a , x - 2 , y + 1 , z );
		setPosition( b , x - 1 , y + 1 , z );
		setPosition( c , x + 0 , y + 1 , z );
		setPosition( d , x + 1 , y + 1 , z );
		setPosition( e , x + 2 , y + 1 , z );
		go = 1;
		print("\n고!");
		attReady = 7;
	
	}
		
}

function modTick()
{

	if( go )
	{	
		if( time > 0 )
		{
			time--;
			
			if( time == 15 )
			{
				setVelY( a , 2 );
				//setVelY( b , -2 );
				setVelY( c , 2 );
				//setVelY( d , -2 );
				setVelY( e , 2 );
			}
			
		}
		else
		{
			//setVelY( a , -2 );
			setVelY( b , 2 );
			//setVelY( c , -2 );
			setVelY( d , 2 );
			//setVelY( e , -2 );
			time = 30;
		}
	
	}
}
