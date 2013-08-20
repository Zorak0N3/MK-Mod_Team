//Script By ns827@Mod Team


var posx;
var posy;
var posz;
var cmdtmp;
var switcher = false;



function newLevel(){
switcher = false;
print("아직 디버그 모드는 활성화되어 있지 않습니다.");
print("수동으로 활성화시키십시오.);

}
function useItem(x, y, z, itemId, blockId){

if(switcher == true){
print("터치된 곳의 좌표: x " + x + " y " + y + " z ");
print("들고 있는 아이템: " + itemId);
print("터치한 블럭: " + blockId);
print("좌표(머리 기준): x " + posx + " y " + posy + " z " + posz);

}

}


function modTick(){
if(switcher == true){

posx = getPlayerX();
posy = getPlayerY();
posz = getPlayerZ();

setTile(posx, posy - 2, posz, 87);
}


}

function procCmd(){
cmdtmp = cmd

if(cmdtmp == debug_on){

    switcher = true;
    print("디버그 모드가 활성화되었습니다.");
    
} else 
if(cmdtmp == debug_off){

    switcher = false;
    print("디버그 모드가 비활성화되었습니다.");
    
}
}
