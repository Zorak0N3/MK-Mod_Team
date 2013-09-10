var block_HB = [];
var HB = null;
var spawnCount = 0;
var attackCount = 0;

var TimerEnd = false;
var Timer_time = 0;
var Timer_tag = "";

var DEBUG = false;

function useItem(x, y, z, item, block, side){
	if(checkHB_Block(x, y - 3, z)){
		preventDefault();
		
		if(block_HB.length != 0 && block_HB[0] == x && block_HB[1] == y - 3 && block_HB[2] == z) return;
		
		clientMessage("You don't know what you did....");
		setHB_block(x, y - 3, z);
	}
}

function attackHook(player, victim){
	if(HB != null && Entity.getYaw(victim) == Entity.getYaw(HB)){
		attackCount++;
		
		if(DEBUG) clientMessage("<DEBUG> 히로빈에게 공격 (아이템 " + getCarriedItem() + ") : " + attackCount);
		
		if(getCarriedItem() == 268 && attackCount != 4) return; // 나무
		else if(getCarriedItem() == 272 && attackCount != 3) return; // 돌
		else if(getCarriedItem() == 267 && attackCount != 3) return; // 철
		else if(getCarriedItem() == 283 && attackCount != 1) return; // 금
		else if(getCarriedItem() == 276 && attackCount != 1) return; // 다이아
		else if(attackCount < 8) return;
		
		removeHB();
		attackCount = 0;
		
		if(DEBUG) clientMessage("<DEBUG> 히로빈 삭제됨 (이유 : 히로빈 보호)");
	}
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
		
		var spawnPos = [getRandom(Math.floor(getPlayerX()) - 3, Math.floor(getPlayerX()) + 3), Math.floor(getPlayerY()), getRandom(Math.floor(getPlayerZ()) - 3, Math.floor(getPlayerZ()) + 3)];
		
		HB = bl_spawnMob(spawnPos[0], spawnPos[1], spawnPos[2], 36, "mob/char.png");
		startTimer(getRandom(5, 9), "HB_remove");
		
		if(DEBUG) clientMessage("<DEBUG> 히로빈 소환(X " + spawnPos[0] + ", Y " + spawnPos[1] + ", Z " + spawnPos[2] + ").");
	}
	
	// 타이머 종료 처리
	if(TimerEnd){
		switch(getTimerTag()){
			case "HB_remove":
				removeHB();
				
				if(DEBUG) clientMessage("<DEBUG> 히로빈 삭제됨 (이유 : 타이머)");
				break;
		}
	}
}

function procCmd(cmd){
	var arg = cmd.split(" ");
	
	switch(arg[0]){
		case "herobrine":
			if(arg[1] == "debug"){
				if(!DEBUG) DEBUG = true;
				else DEBUG = false;
				
				clientMessage("<Herobrine> 디버그 모드가 설정되었습니다");
			}
			break;
	}
}

function newLevel(){
	print("\nHerobrine 1.0 Beta By 제조일자");
}

function leaveGame(){
	if(HB != null) removeHB();
	
	block_HB = [];
	HB = null;
	spawnCount = 0;
	attackCount = 0;
}

function removeHB(){
	if(HB == null) return;
	
	setPosition(HB, 0, -100, 0);
	HB = null;
	attackCount = 0;
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
	var pos1 = getFloor(getPlayerX(), getPlayerY(), getPlayerZ());
	var pos2 = getFloor(getPlayerX() + 2, getPlayerY(), getPlayerZ());
	var pos3 = getFloor(getPlayerX(), getPlayerY(), getPlayerZ() + 5);
	var pos4 = getFloor(getPlayerX() + 1, getPlayerY(), getPlayerZ() + 2);
	
	setTile(pos1[0], pos1[1] + 1, pos1[2], 51);
	setTile(pos2[0], pos2[1] + 1, pos2[2], 51);
	setTile(pos3[0], pos3[1] + 1, pos3[2], 51);
	setTile(pos4[0], pos4[1] + 1, pos4[2], 51);
	
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

function getFloor(x, y, z){
	for(var i = y; y >= 0; i--){
		if((getTile(x, i, z) != 0 && getTile(x, i, z) != 78 && getTile(x, i, z) != 83) || (getTile(x, i + 1, z) == 78 || getTile(x, i + 1, z) == 83)){
			return new Array(x, i, z);
		}
	}
	return false;
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