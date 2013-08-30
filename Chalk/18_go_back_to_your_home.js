// Go Back To Your Home - 너의 집으로 돌아가
// 제작자 : 초크 ( amato17 )
// Current Version : 0.3

var homeX , homeY , homeZ;
var homeSet = 0;

function newLevel()
{
	print("\n[Go-Back-To-Your-Home]\nBy Chalk(amato17)\n철괴로 블럭을 클릭해 집의 위치를 설정합니다\n석탄으로 때린 몹을 집으로 돌려보냅니다");
}

function useItem( x , y , z , i , b )
{
    if( i == 265 )
    {
        homeX = x; homeY = y; homeZ = z; homeSet = 1;
        print("\n[Go-Back-To-Your-Home]\n집의 위치가 설정되었습니다!\n몹을 석탄으로 때리면 이곳으로 돌려보냅니다!");
    }
}

function attackHook( att , vic )
{
    if( getCarriedItem() == 263 )
    {
        preventDefault();
        
        if( homeSet )
        {
            setPosition( vic , homeX , homeY + 1 , homeZ );
            print("\n[Go-Back-To-Your-Home]\n석탄으로 때린 몹을 집으로 돌려보냈습니다!");
        }
        else
        {
            print("\n[Go-Back-To-Your-Home]\n먼저 철괴로 블럭을 클릭해 집의 위치를 설정해야 합니다!");
        }
    }
}
