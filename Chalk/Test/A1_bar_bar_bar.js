// Crayon Pop - Bar Bar Bar
// Pop Pop Crayon Pop - Get Set Ready Go!
// Ver 0.3

var px;
var py;
var pz;

var a;
var b;
var c;
var d;
var e;

var time = 60;

var go = 0;

function procCmd( cmd )
{
	if( cmd == "팝 팝 크레용팝" )
	{
		px = getPlayerX();
		py = getPlayerY();
		pz = getPlayerZ();
		
		print("\nGet - 소 5마리가 스폰됩니다");
		
		spawnCow( px - 4 , py , pz , "mob/cow.png" );
		spawnCow( px - 2 , py , pz , "mob/cow.png" );
		spawnCow( px + 0 , py , pz , "mob/cow.png" );
		spawnCow( px + 2 , py , pz , "mob/cow.png" );
		spawnCow( px + 4 , py , pz , "mob/cow.png" );
		
		print("\nSet - 스폰된 소 5마리를 때려주세요");
		
		attReady = 1;
	
	}

}

function attackHook( attacker , victim )
{
	switch( attReady )
	{
		case 1 :
			a = victim;
			rideAnimal( a , a );
			attReady = 2;
			print("\n첫번째 소를 설정했습니다");
			break;
		case 2 :
			b = victim;
			rideAnimal( b , b );
			attReady = 3;
			print("\n두번째 소를 설정했습니다");
			break;
		case 3 :
			c = victim;
			rideAnimal( c , c );
			attReady = 4;
			print("\n세번째 소를 설정했습니다");
			break;
		case 4 :
			d = victim;
			rideAnimal( d , d );
			print("\n네번째 소를 설정했습니다");
			attReady = 5;
			break;
		case 5 :
			e = victim;
			rideAnimal( e , e );
			print("\n다섯번째 소를 설정했습니다");
			attReady = 6;
			
			print("\nReady - 춤을 출 위치를 철괴로 설정하세요");
			
			break;
			
	}
	
}

function useItem( x , y , z , i , b )
{
	
	if( i == 265 )
	{
		
		addItemInventory( 265 , -1 );
		setPosition( a , x - 2 , y );
		go = true;
		print("\nGo!");
	
	}
		
}

function modTick()
{

	if( go )
	{	
		if( time > 0 )
		{
			time--;
			
			if( time == 30 )
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
			time = 60;
		}
	
	}
}
