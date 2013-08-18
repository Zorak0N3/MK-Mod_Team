// 초크의 10번째 공식 스크립트
// 제목 : 지진 ( earthquake )
// 버젼 : 1.3.0
// MCPE Korea

var pl;

function modTick()
{
    if( getCarriedItem() == 317 ) // Gold Boots
    {
		pl = getPlayerEnt();
		setPosition( pl , getPlayerX() , getPlayerY() + 0.1 , getPlayerZ() );	
	}
}
