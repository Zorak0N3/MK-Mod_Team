//Script By ns827@Mod Team
var px;
var py;
var pz;
var xx;
var ty;
var cart;
var tb;
var railmode = false;
var player;
var recent = null;
function useItem(x, y, z, itemId, blockId){
px = getPlayerX();
py = getPlayerY();
pz = getPlayerZ();
px = parseInt(px);
py = parseInt(py);
pz = parseInt(pz);
xx = blockId;
if(py-parseInt(y) == 2  && xx == 49){
print("RailRoad Started...");
railroad();
}
}



function railroad(){
while(true){
px = getPlayerX();
py = getPlayerY();
pz = getPlayerZ();
ty = py - 2;
px = parseInt(px);
py = parseInt(py);
pz = parseInt(pz);
ty = parseInt(ty);

tb = getTile(px + 1, ty - 1, pz);
if(tb == 42 && recent != 1 || recent == null){
setTile(px, py, pz, 0);
px++;
setTile(px, py, pz, 49);
player = getPlayerEnt();
setPosition(player, px, py, pz);
recent = 1;

} else {

tb = getTile(px - 1, ty - 1, pz);
if(tb == 42 && recent != 2 || recent == null){
setTile(px, py, pz, 0);
px--;
setTile(px, py, pz, 49);
player = getPlayerEnt();
setPosition(player, px, py, pz);
recent = 2;
} else {
tb = getTile(px, ty - 1, pz + 1);
if(tb == 42 && recent != 3 || recent == null){
setTile(px, py, pz, 0);
pz++;
setTile(px, py, pz, 49);
player = getPlayerEnt();
setPosition(player, px, py, pz);
recent = 3;

} else {
tb = getTile(px, ty - 1, pz - 1);
if(tb == 42 && recent != 1 || recent == null){
setTile(px, py, pz, 0);
pz--;
setTile(px, py, pz, 49);
player = getPlayerEnt();
setPosition(player, px, py, pz);
recent = 4;
railroad();
}else {
break;

}}}
}
}
}
