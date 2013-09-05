var a = 0;
var b = 0;
var c = 0;
var BUILD_START = 0;
check = 1;
var id = 0;
function newLevel()
{
print ("1.0.0 by 곱등연가");
print ("뜯어보지 마세요.");
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
     if(BUILD_START==1)
     {
setTile(a,b-2,c,id);
}
}
function useItem(x,y,z,itemId,block,side)
{
if(itemId==344 && BUILD_START==0)
{
BUILD_START = 1;
print("START BUILD");
}
if(itemId==325 && BUILD_START==1)
{
BUILD_START = 0;
print ("STOP BUILD");
}
}
function procCmd(cmd)
{
    var Data = cmd.split(" ");
    if(Data[0]=="block")
        {
             id = Data[1]
   print ("blockId:" + " " + id + " " + "setting complete");
}
if(Data[0]=="on")
        {
BUILD_START = 1;
}
if(Data[0]=="off")
        {
BUILD_START = 0;
}
}
