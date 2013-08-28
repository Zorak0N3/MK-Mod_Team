// Timer_PE v1.4
// Script By Chalk
// For MCPE Korea
// 6th

var tick = 0;
var playTime = 0;
var CX;
var CY;
var CZ;
var isClockSet = 0;

function newLevel()
{
	print("\n[Timer-PE]\nBy Chalk(amato17)");
}


function setNumber(loc, num)
{
    var LX;
    var MX;
	var RX;
	
	switch(loc)
	{
		case 1:
			LX = -8;
			MX = -7;
			RX = -6;
			break;
		case 2:
			LX = -4;
			MX = -3;
			RX = -2;
			break;
		case 3:
			LX = 2;
			MX = 3;
			RX = 4;
			break;
		case 4:
			LX = 6;
			MX = 7;
			RX = 8;
			break;
	}
	switch(num)
	{
		case 0: // -----------------------------------------------1-------------------------
			setTile(CX + LX, CY + 0, CZ, 42); // 1층 왼
			setTile(CX + LX, CY + 1, CZ, 42); // 2층 왼
			setTile(CX + LX, CY + 2, CZ, 42); // 3층 왼
			setTile(CX + LX, CY + 3, CZ, 42); // 4층 왼
			setTile(CX + LX, CY + 4, CZ, 42); // 5층 왼
			
			setTile(CX + MX, CY + 0, CZ, 42); // 1층 중
			setTile(CX + MX, CY + 2, CZ, 0); // 3층 중
			setTile(CX + MX, CY + 4, CZ, 42); // 5층 중
			
			setTile(CX + RX, CY + 0, CZ, 42); // 1층 우
			setTile(CX + RX, CY + 1, CZ, 42); // 2층 우
			setTile(CX + RX, CY + 2, CZ, 42); // 3층 우
			setTile(CX + RX, CY + 3, CZ, 42); // 4층 우
			setTile(CX + RX, CY + 4, CZ, 42); // 5층 우
			break
		case 1:
			setTile(CX + LX, CY + 0, CZ, 0); // 1층 왼
			setTile(CX + LX, CY + 1, CZ, 0); // 2층 왼
			setTile(CX + LX, CY + 2, CZ, 0); // 3층 왼
			setTile(CX + LX, CY + 3, CZ, 0); // 4층 왼
			setTile(CX + LX, CY + 4, CZ, 0); // 5층 왼
			
			setTile(CX + MX, CY + 0, CZ, 0); // 1층 중
			setTile(CX + MX, CY + 2, CZ, 0); // 3층 중
			setTile(CX + MX, CY + 4, CZ, 0); // 5층 중
			
			setTile(CX + RX, CY + 0, CZ, 42); // 1층 우
			setTile(CX + RX, CY + 1, CZ, 42); // 2층 우
			setTile(CX + RX, CY + 2, CZ, 42); // 3층 우
			setTile(CX + RX, CY + 3, CZ, 42); // 4층 우
			setTile(CX + RX, CY + 4, CZ, 42); // 5층 우
			break;
		case 2:
			setTile(CX + LX, CY + 0, CZ, 42); // 1층 왼
			setTile(CX + LX, CY + 1, CZ, 42); // 2층 왼
			setTile(CX + LX, CY + 2, CZ, 42); // 3층 왼
			setTile(CX + LX, CY + 3, CZ, 0); // 4층 왼
			setTile(CX + LX, CY + 4, CZ, 42); // 5층 왼
			
			setTile(CX + MX, CY + 0, CZ, 42); // 1층 중
			setTile(CX + MX, CY + 2, CZ, 42); // 3층 중
			setTile(CX + MX, CY + 4, CZ, 42); // 5층 중
				
			setTile(CX + RX, CY + 0, CZ, 42); // 1층 우
			setTile(CX + RX, CY + 1, CZ, 0); // 2층 우
			setTile(CX + RX, CY + 2, CZ, 42); // 3층 우
			setTile(CX + RX, CY + 3, CZ, 42); // 4층 우
			setTile(CX + RX, CY + 4, CZ, 42); // 5층 우
			break;

		case 3:
			setTile(CX + LX, CY + 0, CZ, 42); // 1층 왼
			setTile(CX + LX, CY + 1, CZ, 0); // 2층 왼
			setTile(CX + LX, CY + 2, CZ, 42); // 3층 왼
			setTile(CX + LX, CY + 3, CZ, 0); // 4층 왼
			setTile(CX + LX, CY + 4, CZ, 42); // 5층 왼
			
			setTile(CX + MX, CY + 0, CZ, 42); // 1층 중
			setTile(CX + MX, CY + 2, CZ, 42); // 3층 중
			setTile(CX + MX, CY + 4, CZ, 42); // 5층 중
			
			setTile(CX + RX, CY + 0, CZ, 42); // 1층 우
			setTile(CX + RX, CY + 1, CZ, 42); // 2층 우
			setTile(CX + RX, CY + 2, CZ, 42); // 3층 우
			setTile(CX + RX, CY + 3, CZ, 42); // 4층 우
			setTile(CX + RX, CY + 4, CZ, 42); // 5층 우
			break;
		case 4:
			setTile(CX + LX, CY + 0, CZ, 0); // 1층 왼
			setTile(CX + LX, CY + 1, CZ, 0); // 2층 왼
			setTile(CX + LX, CY + 2, CZ, 42); // 3층 왼
			setTile(CX + LX, CY + 3, CZ, 42); // 4층 왼
			setTile(CX + LX, CY + 4, CZ, 42); // 5층 왼
			
			setTile(CX + MX, CY + 0, CZ, 0); // 1층 중
			setTile(CX + MX, CY + 2, CZ, 42); // 3층 중
			setTile(CX + MX, CY + 4, CZ, 0); // 5층 중
			
			setTile(CX + RX, CY + 0, CZ, 42); // 1층 우
			setTile(CX + RX, CY + 1, CZ, 42); // 2층 우
			setTile(CX + RX, CY + 2, CZ, 42); // 3층 우
			setTile(CX + RX, CY + 3, CZ, 42); // 4층 우
			setTile(CX + RX, CY + 4, CZ, 42); // 5층 우
			break;
		case 5:
			setTile(CX + LX, CY + 0, CZ, 42); // 1층 왼
			setTile(CX + LX, CY + 1, CZ, 0); // 2층 왼
			setTile(CX + LX, CY + 2, CZ, 42); // 3층 왼
			setTile(CX + LX, CY + 3, CZ, 42); // 4층 왼
			setTile(CX + LX, CY + 4, CZ, 42); // 5층 왼
			
			setTile(CX + MX, CY + 0, CZ, 42); // 1층 중
			setTile(CX + MX, CY + 2, CZ, 42); // 3층 중
			setTile(CX + MX, CY + 4, CZ, 42); // 5층 중
			
			setTile(CX + RX, CY + 0, CZ, 42); // 1층 우
			setTile(CX + RX, CY + 1, CZ, 42); // 2층 우
			setTile(CX + RX, CY + 2, CZ, 42); // 3층 우
			setTile(CX + RX, CY + 3, CZ, 0); // 4층 우
			setTile(CX + RX, CY + 4, CZ, 42); // 5층 우
			break;
		case 6:
			setTile(CX + LX, CY + 0, CZ, 42); // 1층 왼
			setTile(CX + LX, CY + 1, CZ, 42); // 2층 왼
			setTile(CX + LX, CY + 2, CZ, 42); // 3층 왼
			setTile(CX + LX, CY + 3, CZ, 42); // 4층 왼
			setTile(CX + LX, CY + 4, CZ, 42); // 5층 왼
			
			setTile(CX + MX, CY + 0, CZ, 42); // 1층 중
			setTile(CX + MX, CY + 2, CZ, 42); // 3층 중
			setTile(CX + MX, CY + 4, CZ, 42); // 5층 중
			
			setTile(CX + RX, CY + 0, CZ, 42); // 1층 우
			setTile(CX + RX, CY + 1, CZ, 42); // 2층 우
			setTile(CX + RX, CY + 2, CZ, 42); // 3층 우
			setTile(CX + RX, CY + 3, CZ, 0); // 4층 우
			setTile(CX + RX, CY + 4, CZ, 42); // 5층 우
			break;
		case 7:
			setTile(CX + LX, CY + 0, CZ, 0); // 1층 왼
			setTile(CX + LX, CY + 1, CZ, 0); // 2층 왼
			setTile(CX + LX, CY + 2, CZ, 42); // 3층 왼
			setTile(CX + LX, CY + 3, CZ, 42); // 4층 왼
			setTile(CX + LX, CY + 4, CZ, 42); // 5층 왼
			
			setTile(CX + MX, CY + 0, CZ, 0); // 1층 중
			setTile(CX + MX, CY + 2, CZ, 0); // 3층 중
			setTile(CX + MX, CY + 4, CZ, 42); // 5층 중
			
			setTile(CX + RX, CY + 0, CZ, 42); // 1층 우
			setTile(CX + RX, CY + 1, CZ, 42); // 2층 우
			setTile(CX + RX, CY + 2, CZ, 42); // 3층 우
			setTile(CX + RX, CY + 3, CZ, 42); // 4층 우
			setTile(CX + RX, CY + 4, CZ, 42); // 5층 우
			break;
		case 8:
			setTile(CX + LX, CY + 0, CZ, 42); // 1층 왼
			setTile(CX + LX, CY + 1, CZ, 42); // 2층 왼
			setTile(CX + LX, CY + 2, CZ, 42); // 3층 왼
			setTile(CX + LX, CY + 3, CZ, 42); // 4층 왼
			setTile(CX + LX, CY + 4, CZ, 42); // 5층 왼
				
			setTile(CX + MX, CY + 0, CZ, 42); // 1층 중
			setTile(CX + MX, CY + 2, CZ, 42); // 3층 중
			setTile(CX + MX, CY + 4, CZ, 42); // 5층 중
				
			setTile(CX + RX, CY + 0, CZ, 42); // 1층 우
			setTile(CX + RX, CY + 1, CZ, 42); // 2층 우
			setTile(CX + RX, CY + 2, CZ, 42); // 3층 우
			setTile(CX + RX, CY + 3, CZ, 42); // 4층 우
			setTile(CX + RX, CY + 4, CZ, 42); // 5층 우
			break;
		case 9:
			setTile(CX + LX, CY + 0, CZ, 42); // 1층 왼
			setTile(CX + LX, CY + 1, CZ, 0); // 2층 왼
			setTile(CX + LX, CY + 2, CZ, 42); // 3층 왼
			setTile(CX + LX, CY + 3, CZ, 42); // 4층 왼
			setTile(CX + LX, CY + 4, CZ, 42); // 5층 왼
			
			setTile(CX + MX, CY + 0, CZ, 42); // 1층 중
			setTile(CX + MX, CY + 2, CZ, 42); // 3층 중
			setTile(CX + MX, CY + 4, CZ, 42); // 5층 중
			
			setTile(CX + RX, CY + 0, CZ, 42); // 1층 우
			setTile(CX + RX, CY + 1, CZ, 42); // 2층 우
			setTile(CX + RX, CY + 2, CZ, 42); // 3층 우
			setTile(CX + RX, CY + 3, CZ, 42); // 4층 우
			setTile(CX + RX, CY + 4, CZ, 42); // 5층 우
			break;
			
		}
	}


function modTick()
{
	tick++;
	if(tick==15)
	{
		tick = 0;
		playTime += 1;
		
		if(playTime % 60 == 0)
		{
			print("[TimerPE] " + playTime / 60 + "분 플레이하셨습니다");
		}

	
		if(isClockSet == 2)
		{
		
			var one;
			var two;
			var thr;
			var fou;
			cn = new Date();
			ch = cn.getHours().toString();
			if(ch<10)
			{
				one = 0;
				two = ch;
			}
			else
			{
				one = ch.charAt(0);
				two = ch.charAt(1);
			}
			
			cm = cn.getMinutes().toString();
			if(cm<10)
			{
				thr = 0;
				fou = cm;
			}
			else
			{
				thr = cm.charAt(0);
				fou = cm.charAt(1);
			}
			
			setNumber(1, parseInt(one));
			setNumber(2, parseInt(two));
			setNumber(3, parseInt(thr));
			setNumber(4, parseInt(fou));
		
			if(getTile(CX, CY + 1, CZ) == 42 && getTile(CX, CY + 3, CZ) == 42)
			{
				setTile(CX, CY + 1, CZ, 41);
				setTile(CX, CY + 3, CZ, 41);
			} 
			else
			{
				setTile(CX, CY + 1, CZ, 42);
				setTile(CX, CY + 3, CZ, 42);
			}
		}
	}
}

function useItem(UX, UY, UZ, iID, bID)
{
	if(iID==347)
	{
		now = new Date();
		
		hh = now.getHours();
		if(hh < 10) hh = "0" + hh;
		
		mm = now.getMinutes();
		if(mm < 10) mm = "0" + mm;
		
		ss = now.getSeconds();
		if(ss < 10) ss = "0" + ss;
		
		print("[TimerPE] " + hh + ":" + mm + ":" + ss);	
	}
	else if(iID==348)
	{
		if(isClockSet == 0)
		{
			CX = UX;
			CY = UY + 1;
			CZ = UZ;
			print("[TimerPE] X : " + CX + ", Y : " + CY + ", Z : " + CZ );
			isClockSet = 1;
			print("[TimerPE] 위치가 설정되었습니다. 다시 한번 같은 블럭을 클릭해주세요.");
		}	
		else if(isClockSet == 1)
		{	
			if( UX == CX && UZ == CZ )
			{
				isClockSet = 2;
				setTile(UX, UY, UZ, 43);
				setTile(CX, CY + 1, CZ, 42);
				setTile(CX, CY + 3, CZ, 42);
				print("[TimerPE] 시계가 시작되였습니다.");
			}
			else
			{
				print("[TimerPE] 위치 설정이 취소되었습니다. 다시 위치를 설정하세요.");
				isClockSet = 0;
			}
		}
		else if( isClockSet == 2 && bID == 43)
		{
			print( "[TimerPE] 시계가 멈췄습니다" );
			isClockSet = 1;
		}
	}
}
