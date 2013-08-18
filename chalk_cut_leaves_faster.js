// 초크의 3번째 스크립트 
// ver 1.3
// cut leaves faster script

function useItem(x,y,z,itemId,blockId)
{
    if(blockId==18)
    {
		setTile(x,y,z,0);
		addItemInventory(6,1);
		addItemInventory(260,1);
	}
}
