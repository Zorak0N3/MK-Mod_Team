var homeX , homeY , homeZ;
var homeSet = 0;

function useItem( x , y , z , i , b )
{
    if( i == 265 )
    {
        homeX = x; homeY = y; homeZ = z; homeSet = 1;
        print("\n집의 위치가 설정되었습니다!\n몹을 석탄으로 때리면 이곳으로 이동합니다!");
    }
}

function attackHook( att , vic )
{
    if( getCarriedItem() == 263 )
    {
        preventDefault();
        setPosition( vic , homeX , homeY + 1 , homeZ );
        print("\n방금 때린 몹은 집으로 이동되었습니다");
    }
}
