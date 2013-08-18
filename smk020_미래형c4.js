//LIFE SCRIPT BY 곱등연가//
    //NO REWRITE!!!//
     // ↖(^o^)↗ //


var ex = 0;
var ey = 0;
var ez = 0;
function newLevel()
{
   print("FUTURE C4 By 곱등연가");
   print("무단수정이나 배포를 금합니다.");
}
function useItem(x,y,z,itemId,blockId)
{
        if(itemId==37)
        {
   ex = x;
		ey = y + 4;
		ez = z;
		 print("c4가 설치되었습니다.");
    
    }
}
function procCmd(cmd)
{
    var Data = cmd.split(" ");
    if(Data[0]=="c4")
    {
        if(Data[1]=="0")
        {
            print("위력 0은 말이 안됩니다.");
        }
        else
        {
            explode(ex,ey,ez, parseInt(Data[1]));
        }
    }
}


