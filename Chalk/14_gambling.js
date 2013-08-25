// ver 0.2

var coal = 263;
var iron = 265;
var gold = 266;
var diam = 264;

function newLevel()
{
	print("\n[도박]\n제작자 : 초크(amato17)\n석탄, 철괴, 금괴, 다이아몬드로\n도박을 할 수 있습니다");

}

function useItem( x , y , z , i , b )
{
	if( b == 22 ) // 청금석 블럭이 도박기계
	{
		if( ( i == coal ) || ( i == iron ) || ( i == gold ) || ( i == diam ) )
		
			if( i == coal && rand( 10 ) )
			{
				give( i );
			}
			else if( i == iron && rand( 30 ) )
			{
				give( i );
			}
			else if( i == gold && rand( 50 ) )
			{
				give( i );
			}
			else if( i == diam && rand( 70 ) )
			{
				give( i );
			}
			else
			{
				print("광물 하나 날렸네 ㅊㅊ");
				addItemInventory( i , -1 );
			}
		
		else
		{
			print("어허! 돈 없으면 가라!");
		}
	}
	
}

function rand( per )
{
	var ran = Math.floor( Math.random() * 100 );
	
	if( per > ran )
	{
		return true;
	}
	else
	{
		return false;
	}

}

function give( sucItem )
{	
	addItemInventory( sucItem , 9 );
	print("판돈은 내가 싹 쓸어간다~");
}
