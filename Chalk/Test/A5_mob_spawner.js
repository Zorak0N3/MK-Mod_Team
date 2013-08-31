// 0.9

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
			
			if( sx != x && sy != y && sz != z )
			{
				sx = x; 
				sy = y; 
				sz = z; 
				on = true;
				print("몹스포너가 설정되었습니다");
			}
			else
			{
		
				on = on ? false : true; 
				
				if( !on )
				{
					setTile( sx , sy , sz , 49 );	
					print("몹스포너가 비활성화되었습니다");
					
				}
				else
				{
					print("몹스포너가 활성화되었습니다");
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
						print("몹스포너를 닭 모드로 설정했습니다");
						break;
						
					case 1
						md = 0;
						print("몹스포너를 소 모드로 설정했습니다");
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
	var xx = Math.abs( getPlayerX() - sx );
	var yy = Math.abs( getPlayerY() - sy );
	var zz = Math.abs( getPlayerZ() - sz );
	
	if( xx < 17 && yy < 17 && zz < 17 )
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
	else
	{
		print("테스트용 문구 - 몹스포너에서 멀리 떨어져 있습니다");
		
	}
}
