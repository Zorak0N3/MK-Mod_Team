// LTE NUTT Script - 11th Script - test
// Made By Chalk(amato17) - MCPE Korea Mod Team
// Idea By SK Telecom - LTE NUTT APP
// Current Version = 1.3.0

var startYaw;
var curYaw;
var isShakeStart = 0;

function newLevel()
{
	// startYaw = getYaw();
	print("[LTE 눝] Idea By SKT - Made By Chalk(amato17)");

}

function modTick()
{
	if(getCarriedItem() == 6 && isShakeStart == 0 )
	{
		isShakeStart = 1;
		startYaw = getYaw();
		print("[LTE 눝] 눝돌리기 시작!");
	
	}
	else if(getCarriedItem() == 6 && isShakeStart == 1 )
	{
		curYaw = getYaw();
		if( getMax( curYaw , startYaw ) - getMin( curYaw , startYaw ) >= 1080 )
		{
			addItemInventory( 6 , -1 );
			addItemInventory( 17 , 5 );
			isShakeStart = 0;
			print("[LTE 눝] 눝눝누누눝!");
		}
	
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
