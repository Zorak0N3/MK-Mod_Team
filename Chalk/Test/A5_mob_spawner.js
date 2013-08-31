var sx, sy, sz;
var on, tm, tc;

function useItem( x , y , z , i , b )
{
	if( i == 259 && b == 49 )
	{
		preventDefault();
		
		sx=x; 
		sy=y; 
		sz=z; 
		
		on=1; 
		
		print("소 스폰 몹스포너가 생성되었습니다");
	}
}

function modTick()
{
	if(on)
	{
		if(tc == 0 )
		{
			setTile( sx , sy , sz , 49 );
			tc = Math.floor(Math.random() * 600);
			mobSpawner();
		}
		else
		{
			setTile( sx , sy , sz , 246 );
			tc--;
		}
	}
}

function attackHook( attacker , victim )
{
	tm = 0;
}

function mobSpawner()
{
	if( Math.abs( getPlayerX() - sx ) <= 17 && Math.abs( getPlayerY() - sy ) <= 17 && Math.abs( getPlayerZ() - sz ) <= 17 )
	{
		var mx = sx + ( Math.random() - Math.random() ) * 4;
		var my = sy; // -1 0 +1 중 하나이지만 패스
		var mz = sz + ( Math.random() - Math.random() ) * 4;
		
		if( getTile( mx , my - 1 , mz ) == 2 )
		{
			if(tm < 7 )
			{
				spawnCow( mx , my , mz , 'mob/cow.png' );
				tm++;
			}
		}
	}
}
