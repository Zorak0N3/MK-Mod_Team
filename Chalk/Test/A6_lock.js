/* 
 * 잠금 스크립트 - Lock Script 
 * By. Chalk - amato17
 * MCPE Korea Mod Team
 * Version : 0.7
 *
 */

 
/* 사용되는 아이템 - 잠금블럭 및 열쇠 */

var def = 7; // Default - Bedrock

var wool = 35;
var woolkey = 287; // string

var brc = 45;
var brckey = 336; // brick

var iron = 42;
var ironkey = 265;

var gold = 41;
var goldkey = 266;

var diam = 57;
var diamkey = 264;

var qua = 155; // quartz
var quakey = 406;

var net = 112; // nether brick
var netkey = 405;

var adm = 95; // invisible bedrock
var admkey = 341; // slime ball


/* 상태 변수 */

var you = 0; // 0 Guest - 1 Trust - 2 Admin

var locsta = false; // ready to lock ( this > "/lock" )

var ulocsta = false; // ready to lock ( this > "/lock" )

var onoff = true; // Is Lock Enable?

/* 명령어 목록 */

var lock = "lock";
var unlock = "unlock";
var help = "lock?";
var enable = "lock!";


/* 입장 메세지 */

function newLevel()
{ print( "\n[Lock]\nBy Chalk(amato17\n" + help + " 명령어로 사용법을 확인하세요" ); }


/* 명령어 사용 */

function procCmd( cmd )
{
	switch( cmd )
	{
		case lock :
		
			if( !locsta )
			{
				print("\n잠글 블럭을 열쇠로 클릭해 주세요");
				locsta = true;
			}
			else
			{
				print("\n잠글 블럭을 열쇠로 클릭해 잠금을 완료하세요");
			}
			break;
			
		case unlock :
		
			if( !ulocsta )
			{
				print("\n잠금을 풀 블럭을 열쇠로 클릭해 주세요");
				ulocsta = true;
			}
			else
			{
				print("\n잠금을 풀 블럭을 열쇠로 클릭해 잠금해제를 완료하세요");
			}
			break;
			
		case help :
		
			print("\n/" + lock + " 명령어로 블럭을 잠급니다\n/" + unlock + " 명령어로 블럭의 잠금을 풉니다\n/" + enable + " 명령어로 잠금을 설정합니다");
			break;
			
		case enable :
		
			onoff = onoff ? false : true;
			oomsg = onoff ? " " : " 비"; 
			print("\n잠금 기능이" + oomsg + "활성화되었습니다");
			break;
				
	}
}


/* 블럭 클릭했을 때 - 스크립트 핵심 */

function useItem( x , y , z , i , b )
{
	if( onoff )
	{
		if( i == woolkey || i == brckey || i == ironkey || i == goldkey || i == diamkey || i == quakey || i == netkey || i == admkey )
		{
			if( locsta )
			{
				preventDefault();
				if( setLock( x , z , i , false ) )
				{
					print( "\n클릭한 블럭을 " + getLock( x , z , false ) + " 열쇠로 잠궜습니다");
					
				}
				locsta = false;
			}
			else if( ulocsta )
			{
				preventDefault();
				if( setLock( x , z , i , true ) )
				{
					print( "\n" + getLock( x , z , false ) + " 열쇠로 잠겨있던 블럭을 풀었습니다");
					
				}
				ulocsta = false;
			}
			else if( checkLock( x , z , i ) )
			{
				preventDefault();
				print("\n이 블럭은 " + getLock( x , z , false ) + " 열쇠로 잠겨있습니다");
			}
		}
		else if( checkLock( x , z , i ) )
		{
			preventDefault();
			print("\n이 블럭은 " + getLock( x , z , false ) + " 열쇠로 잠겨있습니다");
			
		}
	}
}


/* 클릭한 블럭이 잠금되어있는지 , 올바른 열쇠로 클릭했는지 확인 ( 주인체크 ) */

function checkLock( x , z , key )
{
	var lockedblock = getTile( x , 0 , z );
	
	switch( lockedblock )
	{
		case wool :
		
			if( key == woolkey || key == admkey )
			{
				return false;
			}
			else
			{
				return true;
			}
			break;
	
		case brc :
		
			if( key == brckey || key == admkey )
			{
				return false;
			}
			else
			{
				return true;
			}
			break;
	
	
		case iron :
		
			if( key == ironkey || key == admkey )
			{
				return false;
			}
			else
			{
				return true;
			}
			break;
	
		case gold :
		
			if( key == goldkey || key == admkey )
			{
				return false;
			}
			else
			{
				return true;
			}
			break;
	
		case diam :
		
			if( key == diamkey || key == admkey )
			{
				return false;
			}
			else
			{
				return true;
			}
			break;
	
		case qua :
		
			if( key == quakey || key == admkey )
			{
				return false;
			}
			else
			{
				return true;
			}
			break;
	
		case net :
		
			if( key == netkey || key == admkey )
			{
				return false;
			}
			else
			{
				return true;
			}
			break;
	
		case adm :
		
			if( key == admkey )
			{
				return false;
			}
			else
			{
				return true;
			}
			break;
	
		default :
		
			return false;
	}

}


/* 어떤 열쇠로 잠금되어 있는지 확인 */

function getLock( x , z , bycode )
{
	var lockedblock = getTile( x , 0 , z );
	
	switch( lockedblock )
	{
		case wool :
		
			if( bycode )
			{
				return woolkey;
			}
			else
			{
				return "거미의";
			}
			break;
	
		case brc :
		
			if( bycode )
			{
				return brckey;
			}
			else
			{
				return "벽돌의";
			}
			break;
	
	
		case iron :
		
			if( bycode )
			{
				return ironkey;
			}
			else
			{
				return "철의";
			}
			break;
	
		case gold :
		
			if( bycode )
			{
				return goldkey;
			}
			else
			{
				return "금의";
			}
			break;
	
		case diam :
		
			if( bycode )
			{
				return diamkey;
			}
			else
			{
				return "다이아몬드의";
			}
			break;
	
		case qua:
		
			if( bycode )
			{
				return quakey;
			}
			else
			{
				return "석영의";
			}
			break;
	
		case net :
		
			if( bycode )
			{
				return netkey;
			}
			else
			{
				return "지옥의";
			}
			break;
	
		case adm :
		
			if( bycode )
			{
				return admkey;
			}
			else
			{
				return "어드민의";
			}
			break;
	
		default :
		
			if( bycode )
			{
				return def;
			}
			else
			{
				return "모두의";
			}
	}

}


/* 열쇠로 잠그기 */

function setLock( x , z , key , del )
{	
	var thiskey = getLock( x , z , true );
	
	switch( key )
	{
		case woolkey :
		
			if( key == thiskey || thiskey == def)
			{
				if( del )
				{
					setTile( x , 0 , z , def );
					return true;
				}
				else
				{
					setTile( x , 0 , z , wool );
					return true;
				}
			}
			else
			{
				print("\n이 블럭은 " + getLock( x , z , false ) + " 열쇠로 잠겨있습니다");
				return false;
			}
			break;
	
		case brckey :
		
			if( key == thiskey || thiskey == def )
			{
				if( del )
				{
					setTile( x , 0 , z , def );
					return true;
				}
				else
				{
					setTile( x , 0 , z , brc );
					return true;
				}
			}
			else
			{
				print("\n이 블럭은 " + getLock( x , z , false ) + " 열쇠로 잠겨있습니다");
				return false;
			}
			break;
	
	
		case ironkey :
		
			if( key == thiskey || thiskey == def )
			{
				if( del )
				{
					setTile( x , 0 , z , def );
					return true;
				}
				else
				{
					setTile( x , 0 , z , iron );
					return true;
				}
			}
			else
			{
				print("\n이 블럭은 " + getLock( x , z , false ) + " 열쇠로 잠겨있습니다");
				return false;
			}
			break;
	
		case goldkey :
		
			if( key == thiskey || thiskey == def )
			{
				if( del )
				{
					setTile( x , 0 , z , def );
					return true;
				}
				else
				{
					setTile( x , 0 , z , gold );
					return true;
				}
			}
			else
			{
				print("\n이 블럭은 " + getLock( x , z , false ) + " 열쇠로 잠겨있습니다");
				return false;
			}
			break;
	
		case diamkey :
		
			if( key == thiskey || thiskey == def )
			{
				if( del )
				{
					setTile( x , 0 , z , def );
					return true;
				}
				else
				{
					setTile( x , 0 , z , diam );
					return true;
				}
			}
			else
			{
				print("\n이 블럭은 " + getLock( x , z , false ) + " 열쇠로 잠겨있습니다");
				return false;
			}
			break;
	
		case quakey :
		
			if( key == thiskey || thiskey == def )
			{
				if( del )
				{
					setTile( x , 0 , z , def );
					return true;
				}
				else
				{
					setTile( x , 0 , z , qua );
					return true;
				}
			}
			else
			{
				print("\n이 블럭은 " + getLock( x , z , false ) + " 열쇠로 잠겨있습니다");
				return false;
			}
			break;
	
		case netkey :
		
			if( key == thiskey || thiskey == def )
			{
				if( del )
				{
					setTile( x , 0 , z , def );
					return true;
				}
				else
				{
					setTile( x , 0 , z , net );
					return true;
				}
			}
			else
			{
				print("\n이 블럭은 " + getLock( x , z , false ) + " 열쇠로 잠겨있습니다");
				return false;
			}
			break;
	
		case admkey :
		
			if( key == thiskey || thiskey == def )
			{
				if( del )
				{
					setTile( x , 0 , z , def );
					return true;
				}
				else
				{
					setTile( x , 0 , z , adm );
					return true;
				}
			}
			else
			{
				print("\n이 블럭은 " + getLock( x , z , false ) + " 열쇠로 잠겨있습니다");
				return false;
			}
			break;
	
		default :
			
			if( del )
			{
				setTile( x , 0 , z , def );
				return true;
			}
			else
			{
				print("\n이 아이템은 열쇠로 사용할 수 없습니다");
				return false;
			}
			
			return false;
	}

}
