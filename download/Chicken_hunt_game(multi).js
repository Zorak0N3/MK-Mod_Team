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
var level2 = 0;
var exp2 = 0;
var mexp2 = 500;
var attack2 = 0;
var round2 = 1;
var start2 = 0;
var score2 = 0;
function newLevel()
{
print ("1.0.0 멀티버젼 by 곱등연가");
print ("2P 입니다.");
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

if(exp2 >= mexp2)
{
 level2 = level2 + 1;
  mexp2 = mexp2 + 120;
  exp2 = 0;
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
print("1P round " + round)
attack = 0;
}
if(attack2==12)
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
round2 = round2 + 1;
print("2P round " + round2)
attack2 = 0;
}
}

function useItem(x,y,z,itemId,blockId)
{   
    
  if(itemId==280 && start==0)
{ 

start = 1;
print("1P Hunter start! round " + round);
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
if(itemId==288 && start2==0)
{ 

start2 = 1;
print("2P Hunter start! round " + round2);
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
if(start==1 && getCarriedItem()==276)
{
score = score + 42.56;
exp = exp + 80;
attack = attack + 1;
} 

if(start2==1 && getCarriedItem()==283)
{
score2 = score2 + 42.56;
exp2 = exp2 + 80;
attack2 = attack2 + 1;
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
case "level2": {
   print("level:" + level2);
break;
}
case "exp2": {
   print("exp:" + exp2 + "/" + mexp2);
break;
}
case "score2": {
   print("score:" + score2);
break;
}
case "end": {
   print("Hunter end. Your score:" + score);
break;
}
}
}
}
