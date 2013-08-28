// 초크의 8번쨰 스크립트
// Obsidian TrashCan
// MCPE Korea Only
// Current Version : 1.4

function newLevel()
{
	print("\n[Trash-Can]\nBy Chalk(amato17)\n옵시디언에 아이템을 버려라!");
}

function useItem( x , y , z , iID , bID )
{
    if( bID == 49 ) // Obdidian
    {
		preventDefault();
		addItemInventory( iID , -1 );
	}
}
