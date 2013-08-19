//Script by ns827@Mod Team
var onoff = false;
var hitcount = 0;
var targetblock;
var carried;
var counter = 0;
var counter2 = 0;
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


function modTick(){
  
  if(!(onoff)){
    setNight(isNight);
    while(counter2 < 256){
    while(counter < 256){
      setTile(counter, 127, counter2, 1);
      counter++;
    }
    counter = 0;
    counter2++;
    )
    counter2 = 0;
    
  }
}
