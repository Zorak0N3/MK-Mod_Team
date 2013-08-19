//Script by ns827@Mod Team
var onoff = false;
var hitcount = 0;
var targetblock;
var carried;
function attackHook(attacker, victim){

hitcount++;
if(hitcount == 100){

addItemInventory(266, 1);

}


}


function useItem(x, y, z, itemId, blockId){

targetblock - blockId;
carried = getCarriedItem();

if(targetblock == 41 && carried == 39){

print("지구멸망 시작. 알아서 생존하시길...")
onoff = true;


}


}
