//버그: 사용 불가(오류 발생...)


print("광물 탐지기를 설치합니다. 이용해 주셔서 감사합니다.");
print("Made by ns827_Mod Team");

function newLevel(){
  print("광물 탐지기를 시작합니다. 이용해 주셔서 감사합니다.");
  print("Made by ns827_Mod Team");
  
}


var ores = 0;
var posx;
var posy;
var posz;
var count = 0;
var count2 = 0;
var count3 = 0;
var gett;
var gi;


function checkme(){


getTile(posx, posy, posz) = gett;

if(gett == 14 || gett == 15 || gett == 16 || gett == 21 ||  gett == 56){

found = 1;
ores = ores + 1;

}

}


function useItem(x,y,z,itemId,blockId){
gi = getCarriedItem();
if(gi == 285){
posx=getPlayerX();
posy=getPlayerY();
posz=getPlayerZ();

posx = posx - 3;
posy = posy - 3;
posz = posz - 3;


while(count3 < 4){
while(count2 < 4){
while(count < 4){
posx = posx + 1;
checkme();
count = count + 1;
}
posy = posy + 1;
count = 0;
count2 = count2 + 1;
}
posz = posz + 1;
count2 = 0;
count3 = count3 + 1;
}
count3 = 0;

if(ores > 0){
print( ores + "개의 광물이 주변에서 포착되었습니다");
ores = 0;
}


}
}
