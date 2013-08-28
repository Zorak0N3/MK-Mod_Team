// 초크의 10번째 공식 스크립트
// 제목 : 지진 ( earthquake )
// 버젼 : 1.4
// MCPE Korea

function newLevel()
{
	print("\n[Earth-Quake]\nBy Chalk(amato17)\n금부츠를 들면 지진이?\n나는 중에 사용하면 큰일남!");
	
}

function modTick()
{
    if( getCarriedItem() == 317 ) // Gold Boots
    {
		
		setPosition( getPlayerEnt() , getPlayerX() , getPlayerY() + 0.1 , getPlayerZ() );	
	}
}
