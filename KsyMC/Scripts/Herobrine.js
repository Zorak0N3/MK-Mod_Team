var block_HB = [];
var HB = null;
var TimerEnd = false;
var Timer_time = 0;
var Timer_tag = "";

function useItem(x, y, z, item, block, side){
	if(checkHB_Block(x, y - 3, z)){
		if(block_HB.length != 0 && block_HB[0] == x && block_HB[1] == y - 3 && block_HB[2] == z) return;
		
		clientMessage("You don't know what you did....");
		setHB_block(x, y - 3, z);
		preventDefault();
	}
}

function modTick(){
	if(Timer_time != -1){
		Timer_time--;
		
		if(Timer_time == 0){
			TimerEnd = true;
		}else if(Timer_time == -1){
			TimerEnd = false;
			Timer_tag = "";
		}
	}
	
	if(block_HB.length == 0) return;
	
	if(getTile(block_HB[0], block_HB[1], block_HB[2]) != 41 || getTile(block_HB[0], block_HB[1] + 1, block_HB[2]) != 41 || getTile(block_HB[0], block_HB[1] + 2, block_HB[2]) != 87 || getTile(block_HB[0], block_HB[1] + 3, block_HB[2]) != 87){
		block_HB = [];
	}
	
	if(getTile(block_HB[0], block_HB[1] + 4, block_HB[2]) != 51){
		setTile(block_HB[0], block_HB[1] + 4, block_HB[2], 51);
	}
	
	if(parseInt(Math.random() * 1000) == 50 && HB == null){
		HB = bl_spawnMob(getPlayerX() - 2, getPlayerY(), getPlayerZ(), 32, "mob/char.png");
		clientMessage("HI!");
		
		startTimer(5*20, "Herobrine remove");
	}
	
	if(TimerEnd){
		switch(getTimerTag()){
			case "Herobrine remove":
				removeHB();
				break;
		}
	}
}

function newLevel(){
	
}

function leaveGame(){
	block_HB = [];
	HB = null;
}

function removeHB(){
	setPosition(HB, 0, -100, 0);
	HB = null;
}

function checkHB_Block(floorX, floorY, floorZ){
	if(getTile(floorX, floorY, floorZ) == 41 && getTile(floorX, floorY + 1, floorZ) == 41 && getTile(floorX, floorY + 2, floorZ) == 87 && getTile(floorX, floorY + 3, floorZ) == 87){
		return true;
	}
	return false;
}

function setHB_block(floorX, floorY, floorZ){
	block_HB = [floorX, floorY, floorZ];
	setTile(floorX, floorY + 4, floorZ, 51);
}

/*
  타이머 기능 함수
  
  startTimer(시간, 식별 태그)
  getTimerTime() 현재 작동중인 타이머의 시간을 불러옵니다.
  getTimerTag 현재 작동중인 타이머의 태그를 불러옵니다
*/

function startTimer(time, tag){
	Timer_time = time;
	Timer_tag = tag;
}

function getTimerTime(){
	return Timer_time;
}

function getTimerTag(){
	return Timer_tag;
}

/* 타이머 기능 함수 END */

function getSide(x, y, z, side){
	var pos = new Array(2);
	
	switch(side){
		case 0:
			pos = [x, y - 1, z]; // 아래쪽
			break;
		case 1:
			pos = [x, y + 1, z]; // 위쪽
			break;
		case 2:
			pos = [x, y, z - 1]; // 남쪽
			break;
		case 3:
			pos = [x, y, z + 1]; // 북쪽
			break;
		case 4:
			pos = [x - 1, y, z]; // 동쪽
			break;
		case 5:
			pos = [x + 1, y, z]; // 서쪽
			break;
	}
	
	return pos;
}