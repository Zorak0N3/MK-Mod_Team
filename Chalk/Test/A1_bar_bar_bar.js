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

function procCmd( cmd )
{
	if( cmd == "팝 팝 크레용팝" )
	{
		px = getPlayerX();
		py = getPlayerY() + 5;
		pz = getPlayerZ();
		
		print("\nGet,");
		
		a = spawnCow( px - 2 , py , pz , "mob/cow.png" );
		b = spawnCow( px - 1 , py , pz , "mob/cow.png" );
		c = spawnCow( px + 0 , py , pz , "mob/cow.png" );
		d = spawnCow( px + 1 , py , pz , "mob/cow.png" );
		e = spawnCow( px + 2 , py , pz , "mob/cow.png" );
		
		print("\nSet,");
		
		rideAnimal( a , a );
		rideAnimal( b , b );
		rideAnimal( c , c );
		rideAnimal( d , d );
		rideAnimal( e , e );
		
		print("\nReady,");
		
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
