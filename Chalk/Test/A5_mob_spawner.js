// 0.6

var sx, sy, sz;
var on, tm, tc;
var md = 0;

function useItem( x , y , z , i , b )
{
	if( b == 49 || b == 246 )
	{
		if( i == 259 )
		{
			preventDefault();
		
			sx=x; 
			sy=y; 
			sz=z; 
		
			on = on ? false : true; 
			if( !on )
			{
				setTile( sx , sy , sz , 49 );		
				
			}
			var msg = on ? " " : " 비";
			
			print("몹스포너가"+ msg +"활성화되었습니다");
		}
		else if( i == 318 )
		{
			switch( md )
			{
				case 0 :
					md = 1;
					print("닭 모드");
					break;
				case 1 :
					md = 2;
					print("좀피 모드");
					break;
				case 2 :
					md = 0;
					print("소 모드");
					break;
				
				
			}
			
		}
}

function modTick()
{
	if(on)
	{
		if(tc > 0 )
		{
			if(tc > 10 )
			{
				setTile( sx , sy , sz , 246 ); 
			}
			else
			{
				setTile( sx , sy , sz , 49 );	
			}
			tc--;
		
		}
		else
		{
			setTile( sx , sy , sz , 49 );
			tc = 150;
			mobSpawner();
		}
	}
}
/*
function attackHook( attacker , victim )
{
	tm = 0;
}
*/
function mobSpawner()
{
	//if( Math.abs( getPlayerX() - sx ) <= 17 && Math.abs( getPlayerY() - sy ) <= 17 && Math.abs( getPlayerZ() - sz ) <= 17 )
	//{
		var mx = sx + ( Math.random() - Math.random() ) * 4;
		var my = sy; // -1 0 +1 중 하나이지만 패스
		var mz = sz + ( Math.random() - Math.random() ) * 4;
		
		//if( getTile( mx , my - 1 , mz ) == 2 )
		//{
			//if(tm < 7 )
			//{
				switch( md )
				{
					case 0 :
						spawnCow( mx , my , mz , 'mob/cow.png' );
						break;
					case 1 :
						spawnChicken( mx , my , mz , 'mob/chicken.png' );
						break;
					case 2 :
						spawnPigZombie( mx , my , mz , 276 , 'mob/char.png' );
						break;
				}
				
				//tm++;
			//}
		//}
	//}
}
