// Anti-Terror Script v1.5
// By CHALK ( amato17 ) - 7th
// For MCPE Korea < II > ~

var TimerTick = 15;
var CarriedTimer = 10;
var ThreeOut = 3;

function useItem( x , y , z , iID , bID )
{
    switch ( iID ) // Used Item
    {
		case 10 , 11 : // Place Lava
			preventDefault();
			antiTerror( "용암을 놓았습니다" );
			break;
		
		case 46 : // Place TNT
			preventDefault();
			antiTerror( "TNT 블럭를 놓았습니다" );
			break;
		
		case 7 : 
			// Place Bedrock
			preventDefault();
			antiTerror( "베드락을 놓았습니다" );
			break;
		
		case 95 : 
			// Get Only Cheat
			preventDefault();
			antiTerror( "미지블럭을 놓았습니다" );
			break;
		
		case 259 : // Make Fire
			preventDefault();
			antiTerror( "라이터를 사용했습니다" );
			break;
			
		case 51 : // Use Fire
			preventDefault();
			antiTerror( "불을  놓았습니다" );
			break;
			
		case 325 : // Use Lava Bukkit
			preventDefault();
			antiTerror( "용암을 놓았습니다" );
			break;
			
		case 383 : // Use Spawn Egg
			preventDefault();
			antiTerror( "스폰알을 사용했습니다" );
			break;
			
		case 30 :
			preventDefault();
			antiTerror( "거미줄을 놓았습니다" );
			break;
	}
	
	switch ( bID ) // Clicked Block
	{
		case 46 : // Click TNT
			preventDefault();
			antiTerror( "TNT 블럭를 클릭했습니다" );
			break;
	}
}

/*

적대적인 몹을 때려도 경고를 주어 비활성화

function attackHook( attacker , victim )
{
	preventDefault();
	antiTerror( "누군가를 때렸습니다" );
	// rideAnimal( attacker , attacker );
}

*/

function modTick()
{
	if ( TimerTick == 0 )
	{
		TimerTick = 15;
		
		switch ( getCarriedItem() )
		{		
			case 10 , 11 : // Carried Lava
				carriedTerror( "용암을 들었습니다" );
				break;
		
			case 46 : // Carried TNT
				carriedTerror( "TNT 블럭를 들었습니다" );
				break;
		
			case 7 : // Carried Bedrock
				carriedTerror( "베드락을 들었습니다" );
				break;
			
			case 95 : // Carried Block The Cheat only
				carriedTerror( "미지블럭을 들었습니다" );
				break;
		
			case 259 : // Carried Dangerous Item
				carriedTerror( "라이터를 들었습니다" );
				break;
			
			case 51 : // Carried Dangerous Item
				carriedTerror( "불을  들었습니다" );
				break;
				
			case 325 : // Lava Bukkit
				carriedTerror( "용암 양동이를 들었습니다" );
				break;
				
			default :
				CarriedTimer = 10;
				
			/*
			case 383 : // Spawn Egg
				carriedTerror( "스폰알을 들었습니다" );
				break;
			*/
		}
	}
	else
	{
		TimerTick--;
	}
}

function carriedTerror( reason ) // Timer Terrorist
{
	if ( CarriedTimer <= 0 )
	{
		antiTerror( reason );
	}
	else
	{
		CarriedTimer--;
		print("[Anti-Terror] " + reason + " \n" + CarriedTimer + "초 안에 아이템을 내려놓지 않으면 처벌합니다");
	}
}

function antiTerror( reason ) //  Kill Terrorist
{

	if ( ThreeOut <= 0 ) // 3회 이상 경고
	{
		setPosition( getPlayerEnt() , getPlayerX() , 0 , getPlayerZ() );
	}
	else
	{
		ThreeOut--;
		print("[Anti-Terror] 다음과 같은 이유로 경고 : " + reason + " \n" + ThreeOut + "번 더 경고를 받으면 처벌합니다");
	}
}
