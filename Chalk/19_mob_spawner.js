// 1.1

var sx, sy, sz;
var on, tm, tc;
var md = 0;

function newLevel()
{
	print("\n[Mob-Spawner]\nBy Chalk(amato17)\n옵시디언을 라이터로 클릭해 몹스포가 활성화됩니다\n몹스포너를 부싯돌로 클릭하면 모드를 변경할 수 있습니다\n몹스포너를 다시 라이터로 클릭하면 비활성화됩니다");
}

function useItem( x , y , z , i , b )
{
	if( b == 49 || b == 246 )
	{
		if( i == 259 )
		{
			preventDefault();
			
			if( sx != x && sy != y && sz != z )
			{
				sx = x; 
				sy = y; 
				sz = z; 
				on = true;
				print("\n[Mob-Spawner\n몹스포너가 설정되었습니다");
			}
			else
			{
		
				on = on ? false : true; 
				
				if( !on )
				{
					setTile( sx , sy , sz , 49 );	
					print("\n[Mob-Spawner\n몹스포너가 비활성화되었습니다");
					
				}
				else
				{
					print("\n[Mob-Spawner\n몹스포너가 활성화되었습니다");
				}
			}
		}
		else if( i == 318 )
		{
			if( sx == x && sy == y && sz == z )
			{
				switch( md )
				{
					case 0 :
						md = 1;
						print("\n[Mob-Spawner\n몹스포너를 닭 모드로 설정했습니다");
						break;
						
					case 1 :
						md = 0;
						print("\n[Mob-Spawner\n몹스포너를 소 모드로 설정했습니다");
						break;
				}
			}
			
		}
	}
}

function modTick()
{
	if(on)
	{
		var xx = Math.abs( getPlayerX() - sx );
		var yy = Math.abs( getPlayerY() - sy );
		var zz = Math.abs( getPlayerZ() - sz );
		
		if(tc > 0 )
		{
			if(tc < 10 )
			{
				setTile( sx , sy , sz , 49 ); 
			}
			else
			{
				if( xx < 17 && yy < 17 && zz < 17 )
				{
					setTile( sx , sy , sz , 246 );	
				}
				else
				{
					setTile( sx , sy , sz , 49 ); 
				}
			}
			tc--;
		
		}
		else
		{
			setTile( sx , sy , sz , 49 );
			tc = Math.floor(Math.random() * 600);
			// tc = 150;
	
			if( xx < 17 && yy < 17 && zz < 17 )
			{
				mobSpawner();
			}
		}
	}
}

function mobSpawner()
{
	
		var mx = sx + ( Math.random() - Math.random() ) * 4;
		var my = sy; // -1 0 +1 중 하나이지만 패스
		var mz = sz + ( Math.random() - Math.random() ) * 4;
		
		switch( md )
		{
			case 0 :
				spawnCow( mx , my , mz , 'mob/cow.png' );
				break;
				
			case 1 :
				spawnChicken( mx , my , mz , 'mob/chicken.png' );
				break;
				
		}
	}
	
