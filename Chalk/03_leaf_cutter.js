// 초크의 3번째 스크립트 
// ver 1.4
// leaf cutter script

function newLevel()
{
	print("\n[Leaf-Cutter]\nBy Chalk(amato17)");
}


function useItem(x,y,z,itemId,blockId)
{
    if(blockId==18)
    {
		setTile(x,y,z,0);
		addItemInventory(6,1);
		addItemInventory(260,1);
	}
}
