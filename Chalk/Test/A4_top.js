// 0.1

function findAir( x , y , z )
{
	var ind = 0;
	
	while( ind <= ( 128 - y ) )
	{
		
		if( getTile( x , y + ind - 1 , z ) != 0 && getTile( x , y + ind , z ) == 0 && getTile( x , y + ind + 1 , z ) == 0 )
		{
			return ind + 2;
		}
		
		ind += 1;
	}
	return 0;
}

function procCmd( cmd )
{
	if( cmd == 'top' )
	{
		var x = getPlayerX();
		var y = getPlayerY();
		var z = getPlayerZ();
		var idx = findAir( x , y , z );
		
		setPosition( getPlayerEnt() , x , y + idx , z );
		
		print( idx + "칸 위로 이동하였습니다");
	}
}
