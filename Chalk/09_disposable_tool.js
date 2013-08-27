// 초크의 9번째 스크립트
// 일회용 도구
// 스크립트 버젼 : 1.4
// disposable-tool.js
function newLevel()
{
	print("\n[일회용도구]\n제작자 : 초크\n손으로 클릭시 일회용 도구 지급");
	
}

function useItem( x , y , z , iID , bID )
{
    if( iID == 0 )
    {
		 addItemInventory( 276 , -1 );
		 addItemInventory( 277 , -1 );
		 addItemInventory( 278 , -1 );
		 addItemInventory( 279 , -1 );
		 print( "\n일회용 다이아몬드 도구를 지급하였습니다" );
	}
}
