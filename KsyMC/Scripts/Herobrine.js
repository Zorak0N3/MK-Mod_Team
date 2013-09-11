var g_HB_block = [];
var g_HB = null;
var g_spawnCount = 0;
var g_HB_health = 0;

var g_Timer_end = false;
var g_Timer_time = 0;
var g_Timer_tag = "";

var DEBUG = false;

function useItem(x, y, z, item, block, side){
	if(HB_checkBlock(x, y - 3, z)){
		preventDefault();
		
		if(g_HB_block.length != 0 && g_HB_block[0] == x && g_HB_block[1] == y - 3 && g_HB_block[2] == z) // 중복 체크
			return;
		
		clientMessage("You don't know what you did....");
		HB_setblock(x, y - 3, z); // 바닥 부분을 저장
	}
	
	//if(block == 26) clientMessage("You don't know what you did....");
}

function attackHook(player, victim){
	if(g_HB != null && Entity.getYaw(victim) == Entity.getYaw(g_HB)){ // 히로빈이 맞다면
		HB_attackedByPlayer(player);
	}
}

function modTick(){
	// 타이머
	if(g_Timer_time != -1){
		g_Timer_time--;
		
		if(g_Timer_time == 0)
			g_Timer_end = true;
		
		if(g_Timer_time == -1){
			g_Timer_end = false;
			g_Timer_tag = "";
		}
	}
	
	if(g_HB_block.length == 0) return; // 히로빈 블럭이 활성화 되었을 때
	
	if(getTile(g_HB_block[0], g_HB_block[1], g_HB_block[2]) != 41 ||
	getTile(g_HB_block[0], g_HB_block[1] + 1, g_HB_block[2]) != 41 ||
	getTile(g_HB_block[0], g_HB_block[1] + 2, g_HB_block[2]) != 87 ||
	getTile(g_HB_block[0], g_HB_block[1] + 3, g_HB_block[2]) != 87 ||
	getTile(g_HB_block[0], g_HB_block[1] + 4, g_HB_block[2]) != 51){ // 삭제
		g_HB_block = [];
	}
	
	if(g_HB == null && getRandom(0, 500) == 100){ // 히로빈 소환
		g_spawnCount++;
		
		switch(g_spawnCount){
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
		HB_spawn();
	}
	
	if(g_HB != null && g_HB_health <= 10){ // 히로빈 보호
		HB_remove();
		
		if(DEBUG) clientMessage("<DEBUG> 히로빈 보호하기 위해 삭제됨");
	}
	
	if(g_Timer_end) // 타이머 종료 핸들러
		timerEndHandler(getTimerTag());
}

function procCmd(cmd){
	var arg = cmd.split(" ");
	
	switch(arg[0]){
		case "herobrine":
			if(arg[1] == "debug"){
				if(!DEBUG) DEBUG = true;
				else DEBUG = false;
				
				clientMessage("<Herobrine> 디버그 모드가 설정되었습니다");
			}else{
				clientMessage("<Herobrine> Version 1.5 Beta 3");
				clientMessage("<Herobrine> Made by KsyMC");
			}
			break;
	}
}

function newLevel(hasLevel){
	print("\nHerobrine 1.5 Beta 3 By 제조일자");
}

function leaveGame(){
	if(g_HB != null) HB_remove();
	
	g_HB_block = [];
	g_HB = null;
	g_spawnCount = 0;
	g_HB_health = 0;
}

function timerEndHandler(tag){
	switch(tag){
	case "HB_remove":
		HB_remove();
		
		if(DEBUG) clientMessage("<DEBUG> 히로빈 자동적으로 삭제됨.");
		break;
	}
}

function HB_attackedByPlayer(player){
	if(DEBUG) clientMessage("<DEBUG> 플레이어가 아이템 " + getCarriedItem() + "로 히로빈 공격. (체력 :" + g_HB_health + ")");
	
	switch(getCarriedItem()){
		case 268:
			g_HB_health -= 5;
			break;
		case 283:
			g_HB_health -= 5;
			break;
		case 272:
			g_HB_health -= 6;
			break;
		case 267:
			g_HB_health -= 7;
			break;
		case 276:
			g_HB_health -= 8;
			break;
		case 261:
			g_HB_health -= 10;
			break;
		default:
			g_HB_health -= 1;
			break;
	}
}

function HB_spawn(){
	var x = getRandom(Math.floor(getPlayerX()) - 3, Math.floor(getPlayerX()) + 3);
	var y = Math.floor(getPlayerY());
	var z = getRandom(Math.floor(getPlayerZ()) - 3, Math.floor(getPlayerZ()) + 3);
	var pos = getFloor(x, y, z, true);
		
	g_HB = bl_spawnMob(pos[0], pos[1] + 1, pos[2], 36, "mob/char.png");
	g_HB_health = 20;
	startTimer(10, "HB_remove");
	
	if(DEBUG) clientMessage("<DEBUG> 히로빈 소환 (X " + pos[0] + ", Y " + (pos[1] + 1) + ", Z " + pos[2] + ").");
}

function HB_remove(){
	if(g_HB == null) return;
	
	setPosition(g_HB, 0, -100, 0);
	g_HB = null;
	g_HB_health = 0;
}

function HB_checkBlock(floorX, floorY, floorZ){
	if(getTile(floorX, floorY, floorZ) == 41 && getTile(floorX, floorY + 1, floorZ) == 41 && getTile(floorX, floorY + 2, floorZ) == 87 && getTile(floorX, floorY + 3, floorZ) == 87){
		return true;
	}
	return false;
}

function HB_setblock(floorX, floorY, floorZ){
	g_HB_block = [floorX, floorY, floorZ];
	setTile(floorX, floorY + 4, floorZ, 51);
	explode(floorX, floorY + 5, floorZ, 0.01);
}

function HB_attackFire(){
	var i = 0;
	while(i < 10){
		var x = getRandom(Math.floor(getPlayerX()) - 3, Math.floor(getPlayerX()) + 3);
		var y = Math.floor(getPlayerY());
		var z = getRandom(Math.floor(getPlayerZ()) - 3, Math.floor(getPlayerZ()) + 3);
		
		var pos = getFloor(x, y, z, true);
		setTile(pos[0], pos[1] + 1, pos[2], 51);
		
		i++;
	}
	
	explode(getPlayerX(), getPlayerY(), getPlayerZ(), 0.01);
}

/*
  타이머 함수
  
  startTimer(시간, 식별 태그)
  getTimerTime() 현재 작동중인 타이머의 시간을 불러옵니다.
  getTimerTag 현재 작동중인 타이머의 태그를 불러옵니다
*/

function startTimer(sec, tag){
	g_Timer_time = sec * 20;
	g_Timer_tag = tag;
}

function getTimerTime(){
	return g_Timer_time;
}

function getTimerTag(){
	return g_Timer_tag;
}

/* 타이머 함수 END */


/*
  유틸 함수
*/

function getRandom(num1, num2){
	var start = Math.max(num1, num2);
	var end = Math.min(num1, num2);
	
	end -= start;
	return parseInt(Math.random() * end) + start;
}

function getFloor(x, y, z, fromRoof){
	if(fromRoof){
		var pos = getRoof(x, y, z);
		
		x = pos[0];
		y = pos[1] - 1;
		z = pos[2];
	}
	
	for(var i = y; i >= 0; i--){
		
		if(getTile(x, i, z) != 0 && getTile(x, i, z) != 78 && getTile(x, i, z) != 83 && getTile(x, i, z) != 50 && getTile(x, i, z) != 51){
			return [x, i, z];
		}
		
		if(i == 0){
			return [x, i, z];
		}
	}
	return false;
}

function getRoof(x, y, z){
	for(var i = y; i <= 127; i++){
		
		if(getTile(x, i, z) != 0 && getTile(x, i, z) != 78 && getTile(x, i, z) != 83 && getTile(x, i, z) != 50 && getTile(x, i, z) != 51){	
			return [x, i, z];
		}
		
		if(i == 127){
			return [x, i, z];
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

/* 유틸 함수 END */