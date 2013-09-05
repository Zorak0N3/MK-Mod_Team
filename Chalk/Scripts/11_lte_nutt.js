// LTE NUTT Script - 11th Script
// Made By Chalk(amato17) - MCPE Korea Mod Team
// Idea By SK Telecom - LTE NUTT APP
// Current Version = 1.4

//1.4

var startYaw;
var curYaw;
var isShakeStart = 0;
var delay = 150;

function newLevel()
{
	print("\n[LTE 눝]\nBy Chalk(amato17)\nIdea By SKT");
}

function modTick()
{
	if(getCarriedItem() == 6 && isShakeStart == 0)
	{
		if( delay == 0 )
		{
			isShakeStart = 1;
			startYaw = getYaw();
			print("\n[LTE 눝]\n눝돌리기 시작!");
		}
	}
	else if(getCarriedItem() == 6 && isShakeStart == 1 )
	{
		curYaw = getYaw();
		
		if( getMax( curYaw , startYaw ) - getMin( curYaw , startYaw ) >= 1080 )
		{
			addItemInventory( 6 , -1 );
			addItemInventory( 17 , 5 );
			isShakeStart = 0;
			print("\n[LTE 눝]\n나무를 만들었습니다!\n눝눝누누눝!");
			delay = 150;
		}
	
	}
	
	if( delay > 0 && isShakeStart  == 0 )
	{
		delay--;
	}

}

function getMax( one , two )
{
	if( one == two )
	{
		return 0;
	}
	return one > two ? one : two;
}

function getMin( one , two )
{
	if( one == two )
	{
		return 0;
	}
	return one < two ? one : two;
}
