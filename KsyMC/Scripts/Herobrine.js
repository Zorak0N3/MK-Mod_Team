var block_HB = [];
var HB = null;
var spawnCount = 0;

var TimerEnd = false;
var Timer_time = 0;
var Timer_tag = "";

function useItem(x, y, z, item, block, side){
	if(checkHB_Block(x, y - 3, z)){
		preventDefault();
		
		if(block_HB.length != 0 && block_HB[0] == x && block_HB[1] == y - 3 && block_HB[2] == z) return;
		
		clientMessage("You don't know what you did....");
		setHB_block(x, y - 3, z);
	}
}

function attackHook(attacker, victim){
	if(spawnCount > 4 && victim.getYaw(victim) == HB.getYaw(HB)) setVelY(attacker, 1);
}

function modTick(){
	// 타이머
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
	
	// 삭제
	if(getTile(block_HB[0], block_HB[1], block_HB[2]) != 41 || getTile(block_HB[0], block_HB[1] + 1, block_HB[2]) != 41 || getTile(block_HB[0], block_HB[1] + 2, block_HB[2]) != 87 || getTile(block_HB[0], block_HB[1] + 3, block_HB[2]) != 87 || getTile(block_HB[0], block_HB[1] + 4, block_HB[2]) != 51){
		block_HB = [];
	}
	
	// 히로빈 소환
	if(getRandom(0, 500) == 100 && HB == null){
		spawnCount++;
		
		switch(spawnCount){
			case 1:
				clientMessage("HI!");
				break;
			case 2:
				clientMessage("!nileppeZ deL ot netsiL");
				break;
			case 6:
				clientMessage("?mA I erehW");
				HB_attackFire();
				break;
			default:
				clientMessage("!lleh ot emoclew");
				break;
		}
		
		HB = bl_spawnMob(getPlayerX() - 2, getPlayerY(), getPlayerZ(), 32, "mob/char.png");
		startTimer(getRandom(3, 7), "HB_remove");
	}
	
	// 타이머 종료 처리
	if(TimerEnd){
		switch(getTimerTag()){
			case "HB_remove":
				removeHB();
				break;
		}
	}
}

function newLevel(){
	print("\nHerobrine 1.0 Beta By 제조일자");
}

function leaveGame(){
	block_HB = [];
	HB = null;
	spawnCount = 0;
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
	explode(floorX, floorY + 5, floorZ, 0.01);
}

function HB_attackFire(){
	setTile(getPlayerX() + 2, getPlayerY() - 1 , getPlayerZ(), 51);
	setTile(getPlayerX(), getPlayerY() - 1, getPlayerZ() + 5, 51);
	setTile(getPlayerX(), getPlayerY() - 1, getPlayerZ(), 51);
	setTile(getPlayerX() + 5, getPlayerY() - 1, getPlayerZ() + 1, 51);
	setTile(getPlayerX() + 1, getPlayerY() - 1, getPlayerZ(), 51);
	explode(getPlayerX(), getPlayerY(), getPlayerZ(), 0.01);
}

/*
  타이머 함수
  
  startTimer(시간, 식별 태그)
  getTimerTime() 현재 작동중인 타이머의 시간을 불러옵니다.
  getTimerTag 현재 작동중인 타이머의 태그를 불러옵니다
*/

function startTimer(sec, tag){
	Timer_time = sec * 20;
	Timer_tag = tag;
}

function getTimerTime(){
	return Timer_time;
}

function getTimerTag(){
	return Timer_tag;
}

/* 타이머 함수 END */

function getRandom(start, end){
	return parseInt(Math.random() * (end - start)) + start;
}

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