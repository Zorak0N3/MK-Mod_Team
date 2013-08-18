/* 제작자 : 초록크리퍼(amato17) - MCPE Korea
 * 버젼 : 1.3
 */

function useItem(x, y, z, itemId, blockId) 
{
    if(itemId==339) 
    {
        var px = getPlayerX();
		var py = getPlayerY();
		var pz = getPlayerZ();
		print("[F3 PE] Player Info - ID : " + itemId + "\nX : " + px  + "\nY : " + py + "\nZ : " + pz);
		print("[F3 PE] Block Info - ID : " + blockId + ", X : " + x  + ", Y : " + y + ", Z : " + z);
    }
	else if(itemId==340)
    {
		print("[F3 PE] Block ID : " + blockId);
    }
}
