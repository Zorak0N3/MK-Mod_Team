/* 이스크립트는 곱등연가의 것이며 수정할권한은 오직
곱둥연가에게만 있습니다 */
var a = 0;
var chestT = 0;
var T = 0;
var playerE = null;
var zombieE = null;
var bullet = 30;
var playerH = 20;
var Radioactivity = 0;
var playerL = new Array(3);
var zombieL = new Array(3);

var L = new Array(3);
// Data
var chest = true;

function newLevel()
{
chestTcheck();
ModPE.setItem(392,0,15,"사냥총");
ModPE.setItem(393,1,15,"방사능측정기");
}
function leaveGame()
{
a = 0;
chest = true;
}
function getlocation()
{
playerL[0] = getPlayerX();
playerL[1] = getPlayerY();
playerL[2] = getPlayerZ();
}
function modTick()
{
setPlayerHealth(playerH);
if(Radioactivity>500)
{
playerH = playerH - 4;

Radioactivity = 0;
}
chestTcheck();
getlocation();
if(getCarriedItem()==393)
{
T = T + 1;
}
if(T==150)
{
Radioactivity = parseInt(Math.random() * 1000);
clientMessage("방사능농도:" + Radioactivity);
T = 0;
}
if(getTile(120,5,89) == 247)
{
chest = false;
}
setchest();

if(a == 0)
{

clientMessage("곱등연가의 DAYZ에 오신것을 환영합니다");
clientMessage("당신은 방사능과 돌연변이속에서 혹독하게 살아가야하며");
clientMessage("음식을 1일내로 구하지못한다면 죽습니다.");
clientMessage("당신앞에있는 창고를 열면 살아가는데 필요한 기본적인 물품이 나옵니다");
clientMessage("당신은 그것만을가지고 버텨야합니다");
clientMessage("얼마나 버텨야 하냐고요? 영원히.......");
a = 1;
}
}
function useItem(x,y,z,i,b,s)
{
if(b==54 && chestT==0)
{
addItemInventory(393,1);
addItemInventory(392,1);
setTile(1,1,50,246);
}

if(i == 392)
{
shoot();
}

if(i == 280)
{
addItemInventory(393,1);
addItemInventory(392,1);
}
}
function setchest()
{
if(chest == true && playerL[0] > 0)
{
setTile(playerL[0] + 1,playerL[1] - 1,playerL[2],54);
setTile(playerL[0] + 1,playerL[1] - 2,playerL[2],5);
setTile(120,5,89,247);
}
}

function chestTcheck()
{
if(getTile(1,1,50) == 246)
{
chestT = 1;
} else {
chestT = 0;
}
}
function shoot()
{
if(bullet>0)
{
px=Math.floor(playerL[0]);
py=Math.floor(playerL[1]);
pz=Math.floor(playerL[2]);
yaw=Math.floor(getYaw());
pitch=Math.floor(getPitch());
sin=-Math.sin(yaw/180*Math.PI);
cos=Math.cos(yaw/180*Math.PI);
tan=-Math.sin(pitch/180*Math.PI);
pcos=Math.cos(pitch/180*Math.PI);
explode(px+5*sin*pcos,py+5*tan,pz+5*cos*pcos,2);
bullet = bullet - 1;
}
}
function setitem()
{
ModPE.setItem(392,0,15,"사냥총");
ModPE.setItem(393,1,15,"방사능측정기");
}
