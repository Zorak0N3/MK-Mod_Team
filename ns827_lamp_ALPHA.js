/***********************************
 *                                 *
 *          Lamp Script By         *
 *          ModTeam_ns827_         *
 *                                 *
 ***********************************/

/*
 * 체인지로그
 * 
 * 현재 버전: Alpha 0.1
 * 
 * 
 * #Alpha 0.1
 *   -첫 릴리즈
 *
 *
 * @버그:
 * 
 *     - 발광석이 사라지지 않음(작업 중)
 *     - 대각선 방향으로 움직일 때 블럭의 1칸 밑으로 내려갈 수 없음(작업 중)
*/




var below;
var gc;
var lastx;
var lasty;
var lastz;
var nowx;
var nowy;
var nowz;
var savb;
var tarY;
var lasY;
var bet;
function newLevel(){

print("램프 스크립트 by Mod Team_ns827");




}

function modTick(){
gc = getCarriedItem();

lasY = lasty - 2;
nowx = getPlayerX();
nowy = getPlayerY();
nowz = getPlayerZ();
tarY = nowy - 2;


bet = getTile(nowx, tarY, nowz);
if(bet != 0 && gc == 50){
savb = getTile(nowx, tarY, nowz);
setTile(255, 127, 255, savb);
setTile(nowx, tarY, nowz, 89);
}

if(nowx - lastx >= 1 || nowy - lasty >= 1 || nowz - lastz >= 1 || nowx - lastx <= 1|| nowy - lasty <= 1 || nowz - lastz <= 1 ){
loadsb();
}
}

function loadsb(){

savb = getTile(255, 127, 255);
setTile(lastx, lasY, lastz, savb);

}

function savesb(){

}
