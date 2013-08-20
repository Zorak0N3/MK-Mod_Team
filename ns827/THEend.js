//Script by ns827@Mod Team


/*
      사용 가이드
      
      몹을 100번 때릴 때마다 금 지급
      금으로 금블럭을 만든 후 갈색 버섯으로 금블럭을 누르면
      지구멸망 시나리오가 시작된다
      효과:
      
      * 하늘이 어두워지고 몹 24시간 생성
      * 하늘에서 용암이 떨어짐
      * 땅 속이 지옥으로 변함(네더렉으로 가득 차고 광석도 사라짐)
      * 랜덤으로 폭파된 지형이 보임
      * 자면 사망(주의)
    
*/
var onoff = false;
var hitcount = 0;
var targetblock;
var carried;
var counter = 0;
var counter2 = 0;
var counter3 = 0;
var netherize_tmp;
var exx;
var exy;
var exz;
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


  
    while(counter2 < 256){
    while(counter < 256){
      doomsky();
      counter++;
    }
    counter = 0;
    counter2++;
    )
    counter2 = 0;
    
    counter = 0;
    counter2 - 0;
    counter3 = 0;
    
    while(counter3 < 121){
    while(counter2 < 256){
    while(counter < 256){
    netherize(counter, counter3, counter2);
    counter++;
    }
    counter = 0;
    counter2++;
    )
    counter2 = 0;
    counter3++;
    }
counter3 = 0;

counter = 0;

while(counter < 81){
  parseInt(Math.random() * 255) = exx;
  parseInt(Math.random() * 100) = exy;
  parseInt(Math.random() * 100) = exz;
  explode(exx, exy, exz);
  counter++;
}
counter = 0;


    while(counter < 26){
      parseInt(Math.random() * 255) = exx;
      parseInt(Math.random() * 255) = exy;
      setTile(exx, 116, exy, 10);
      counter++;
    }
    
    
    
  if(targetblock == 26 && !(onoff)){
  
     print("지구멸망이 시작되어 잠잘 수 없습니다.")
  exx = getPlayerX();
  exy = getPlayerY();
  exz = getPlayerZ();
  
  explode(exx, exy, exz);
  }
    
}


function modTick(){
    if(!(onoff)){
    setNight(true);
    }
}


function doomsky(){
  setTile(counter, 127, counter2, 87);
}

function netherize(x, y, z){
  netherize_tmp = getTile(x,y,z);
  if(netherize_tmp == 1){
    setTile(x, y, z, 87);
  } else if(netherize_tmp == 16){
    setTile(x, y, z, 89);
  } else if(netherize_tmp == 15){
    setTile(x, y, z, 89);
  } else if(netherize_tmp == 14){
    setTile(x, y, z, 10);
    print("땅 속에 있던 금이 붉게 타올랐습니다");
  } else if(netherize_tmp == 21){
    setTile(x, y, z, 22);
  } else if(netherize_tmp == 56){
    setTile(x, y, z, 7);
    print("땅 속에 잠들어 있던 다이아몬드가 빛을 내며 사라졌습니다");
  }
}
