// 초크의 10번째 공식 스크립트
// 제목 : 지진 ( earthquake )
// 버젼 : 1.4
// MCPE Korea

function newLevel()
{
	print("\n[지진]\n제작자 : 초크\n금부츠를 들면 지진이 일어납니다\n나는 중에는 사용하지 마세요");
	
}

function modTick()
{
    if( getCarriedItem() == 317 ) // Gold Boots
    {
		
		setPosition( getPlayerEnt() , getPlayerX() , getPlayerY() + 0.1 , getPlayerZ() );	
	}
}
