var level = 1;
var exp = 0;
var mexp = 500;
var score = 0;
var start = 0;
var a = 0;
var b = 0;
var c = 0;
check = 1;
var round = 1;
var attack = 0;
function newLevel()
{
print ("1.0.0 싱글버젼 by 곱등연가");
print ("다음버젼에는 멀티기능 추가예정");
}

function modTick()
{
    if (check == 0)
    {
        return;
    }
     a = getPlayerX();
     b = getPlayerY();
     c = getPlayerZ();
if(exp >= mexp)
{
 level = level + 1;
  mexp = mexp + 120;
  exp = 0;
}
if(attack==12)
{
 spawnChicken(a + 4,b + 2,c);
spawnChicken(a + 4,b + 2,c);
spawnChicken(a + 4,b + 2,c);
spawnChicken(a + 4,b + 2,c);
spawnChicken(a + 4,b + 2,c);
spawnChicken(a + 4,b + 2,c);
spawnChicken(a + 4,b + 2,c);
spawnChicken(a + 4,b + 2,c);
spawnChicken(a + 4,b + 2,c);
spawnChicken(a + 4,b + 2,c);
spawnChicken(a + 4,b + 2,c);
spawnChicken(a + 4,b + 2,c);
round = round + 1;
print("round " + round)
attack = 0;
}
}

function useItem(x,y,z,itemId,blockId)
{   
    
  if(itemId==280 && start==0)
{ 

start = 1;
print("Hunter start! round " + round);
spawnChicken(a + 4,b + 2,c);
spawnChicken(a + 4,b + 2,c);
spawnChicken(a + 4,b + 2,c);
spawnChicken(a + 4,b + 2,c);
spawnChicken(a + 4,b + 2,c);
spawnChicken(a + 4,b + 2,c);
spawnChicken(a + 4,b + 2,c);
spawnChicken(a + 4,b + 2,c);
spawnChicken(a + 4,b + 2,c);
spawnChicken(a + 4,b + 2,c);
spawnChicken(a + 4,b + 2,c);
spawnChicken(a + 4,b + 2,c);

}


}
function attackHook(attacker,Cow)
{
score = score + 42.56;
exp = exp + 80;
if(start==1)
{
attack = attack + 1;
} 
}



function procCmd(cmd)
{
    var Data = cmd.split(" ");
if(Data[0]=="view") {
    switch(Data[1]) {
case "level": {
   print("level:" + level);
break;
}
case "exp": {
   print("exp:" + exp + "/" + mexp);
break;
}
case "score": {
   print("score:" + score);
break;
}
case "end": {
   print("Hunter end. Your score:" + score);
break;
}
}
}
}
