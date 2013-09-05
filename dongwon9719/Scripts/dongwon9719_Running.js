var check=false;
var px=0;
var py=0;
var pz=0;
var player=null;
var num=0;
function useItem ( x, y, z, itemId, blockId ){
  if(itemId==280&&!(check)){
    check=true;
    player=getPlayerEnt();
    print("달리기 on");
    px=getPlayerX();
    py=getPlayerY();
    pz=getPlayerZ();
  }else if(itemId==280&&check){
    check=false;
    print("달리기 off");
  }
}
function modTick(){
  if(!(check)){
    return;
  }
  if(num==0){
  px=getPlayerX();
  py=getPlayerY();
  pz=getPlayerZ();
  }
  if(num==0){
    setVelX( player, 0);
    setVelZ( player, 0);
  }
  if(num<5){
    num++;
  }
  if(num==5){
  setVelX( player, (getPlayerX()-px)*10);
  setVelZ( player, (getPlayerZ()-pz)*10);
  num=0;
  }
}
