/* 제작자 : 초록크리퍼(amato17) - MCPE Korea - 2
 * 버젼 : 1.4
 */
function newLevel()
{
	print("\n[F3-PE]\nBy Chalk(amato17)");
}

function useItem(x, y, z, itemId, blockId) 
{
    if(itemId==339) 
    {
    	preventDefault();
        var px = getPlayerX();
	var py = getPlayerY();
	var pz = getPlayerZ();
	print("\n[F3-PE] Player Info\nID : " + itemId + "\nX : " + px  + "\nY : " + py + "\nZ : " + pz);
	print("\n[F3-PE] Block Info\nID : " + blockId + ",\nX : " + x  + ",\nY : " + y + ",\nZ : " + z);
    }
    else if(itemId==340)
    {
    	preventDefault();
	print("\n[F3-PE] Block ID : " + blockId);
    }
}
