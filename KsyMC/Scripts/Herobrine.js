var g_Player_dream = false;
var g_bedPos = [];

var g_spawnCount = 0;
var g_HB_block = [];
var g_HB = null;
var g_HB_health = 0;
var g_HB_spawn = true;

var g_Timer_end = false;
var g_Timer_time = -1;
var g_Timer_tag = "";

var DEBUG = false;

function useItem(x, y, z, item, block, side){
	if(HB_checkBlock(x, y - 3, z)){ // 히로빈 블록을 터치했을경우
		preventDefault();
		
		if(g_HB_block.length != 0 && g_HB_block[0] == x && g_HB_block[1] == y - 3 && g_HB_block[2] == z) // 중복 체크
			return;
		
		clientMessage("You don't know what you did....");
		HB_setblock(x, y - 3, z); // 바닥 부분을 저장
	}
	
	if(g_HB == null && block == 26/* && g_spawnCount > 10 && getRandom(0, 100) == 70*/){ // 침대
		g_HB_spawn = false;
		startTimer(4.9, "Check_bed");
	}
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
	
	if(g_Timer_end){ // 타이머 종료 핸들러
		if(DEBUG) clientMessage("<DEBUG> 타이머 (" + getTimerTag() + ") 종료");
		timerEndHandler(getTimerTag());
	}
	
	if(g_bedPos.length == 3 && getTile(g_bedPos[0], g_bedPos[1], g_bedPos[2]) != 26){ // 침대 삭제
		g_bedPos = [];
	}
	
	if(g_HB_block.length == 0) // 히로빈 블럭 활성화 체크
		return;
	
	if(getTile(g_HB_block[0], g_HB_block[1], g_HB_block[2]) != 41 ||
	getTile(g_HB_block[0], g_HB_block[1] + 1, g_HB_block[2]) != 41 ||
	getTile(g_HB_block[0], g_HB_block[1] + 2, g_HB_block[2]) != 87 ||
	getTile(g_HB_block[0], g_HB_block[1] + 3, g_HB_block[2]) != 87 ||
	getTile(g_HB_block[0], g_HB_block[1] + 4, g_HB_block[2]) != 51){ // 히로빈 블록 삭제
		g_HB_block = [];
	}
	
	if(g_HB == null && getRandom(0, 1000) == 700 && g_HB_spawn){ // 히로빈 소환
		HB_spawn();
	}
	
	if(g_HB != null && g_HB_health <= getWeaponDamage(getCarriedItem())){ // 히로빈 보호
		HB_remove();
		
		if(DEBUG) clientMessage("<DEBUG> 히로빈 보호하기 위해 삭제됨");
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
	g_HB_spawn = true;
	g_Player_dream = false;
	g_bedPos = [];
}

function timerEndHandler(tag){
	switch(tag){
		case "HB_remove":
			HB_remove();
			
			if(DEBUG) clientMessage("<DEBUG> 히로빈 자동적으로 삭제됨.");
			break;
		case "Check_bed":
			if(getTile(getPlayerX(), getPlayerY(), getPlayerZ()) == 26){
				startTimer(0.1, "Start_dream");
				g_bedPos = [Math.floor(getPlayerX()), Math.floor(getPlayerY()), Math.floor(getPlayerZ())];
			}else{
				g_HB_spawn = true;
			}
			break;
		case "Start_dream":
			var pos = HB_buildDream();
			
			g_Player_dream = true;
			setPosition(getPlayerEnt(), pos[0], pos[1], pos[2]);
			startTimer(20, "End_dream");
			
			if(DEBUG) clientMessage("<DEBUG> 히로빈 악몽 시작.");
			break;
		case "End_dream":
			HB_deleteDream();
			
			g_Player_dream = false;
			g_HB_spawn = true;
			setPosition(getPlayerEnt(), g_bedPos[0], g_bedPos[1] + 2, g_bedPos[2]);
			
			if(DEBUG) clientMessage("<DEBUG> 히로빈 악몽 끝.");
			break;
	}
}

function HB_attackedByPlayer(player){
	if(DEBUG) clientMessage("<DEBUG> 플레이어가 아이템 " + getCarriedItem() + "으로 히로빈 공격. (체력 :" + g_HB_health + ")");
	
	g_HB_health -= getWeaponDamage(getCarriedItem());
}

function HB_spawn(){
	if(!g_HB_spawn) return false;
	
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
	
	var x = getRandom(Math.floor(getPlayerX()) - 3, Math.floor(getPlayerX()) + 3);
	var y = Math.floor(getPlayerY());
	var z = getRandom(Math.floor(getPlayerZ()) - 3, Math.floor(getPlayerZ()) + 3);
	var pos = getFloor(x, y, z, true);
	
	g_HB = bl_spawnMob(pos[0], pos[1] + 1, pos[2], 36, "mob/char.png");
	g_HB_health = 20;
	startTimer(10, "HB_remove");
	
	if(DEBUG) clientMessage("<DEBUG> 히로빈 " + g_spawnCount + "번째 소환 (X " + pos[0] + ", Y " + (pos[1] + 1) + ", Z " + pos[2] + ").");
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

function HB_buildDream(){
	var count = 0;
	
	count += W_set(48, [0, 100, 0], [20, 108, 7]);
	count += W_set(0, [1, 101, 1], [19, 107, 6]);
	count += W_set(89, [1, 108, 3], [19, 108, 4]);
	
	if(DEBUG) clientMessage("<DEBUG> 악몽 " + count + "개 블록 생성됨.");
	
	return [1.5, 103, 4.5];
}

function HB_deleteDream(){
	var count = 0;
	
	count += W_set(0, [0, 100, 0], [20, 108, 7]);
	
	if(DEBUG) clientMessage("<DEBUG> 악몽 " + count + "개 블록 삭제됨.");
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
  
  startTimer(시간, 식별 태그) 타이머를 시작합니다.
  getTimerTime() 현재 작동중인 타이머의 시간을 불러옵니다.
  getTimerTag 현재 작동중인 타이머의 태그를 불러옵니다.
*/

function startTimer(sec, tag){
	g_Timer_end = false;
	g_Timer_time = sec * 20;
	g_Timer_tag = tag;
	
	if(DEBUG) clientMessage("<DEBUG> 타이머 설정됨 (" + g_Timer_time / 20 + "초, 태그 : " + g_Timer_tag + ")");
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

function getWeaponDamage(weapon){
	switch(weapon){
		case 268:
			return 5;
		case 283:
			return 5;
		case 272:
			return 6;
		case 267:
			return 7;
		case 276:
			return 8;
		case 261:
			return 10;
		default:
			return 1;
	}
}

function getRandom(num1, num2){
	var start = Math.max(num1, num2);
	var end = Math.min(num1, num2);
	
	end -= start;
	return parseInt(Math.random() * end) + start;
}

function getFloor(x, y, z, fromRoof){
	if(fromRoof){
		var pos = getRoof(x, y, z, false);
		
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

function getRoof(x, y, z, fromFloor){
	if(fromFloor){
		var pos = getFloor(x, y, z, false);
		
		x = pos[0];
		y = pos[1] + 1;
		z = pos[2];
	}
	
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

function W_set(block, selection1, selection2){
	var startX = Math.min(selection1[0], selection2[0]);
	var endX = Math.max(selection1[0], selection2[0]);
	var startY = Math.min(selection1[1], selection2[1]);
	var endY = Math.max(selection1[1], selection2[1]);
	var startZ = Math.min(selection1[2], selection2[2]);
	var endZ = Math.max(selection1[2], selection2[2]);
	
	var count = 0;
	
	for(var x = startX; x <= endX; x++){
		for(var y = startY; y <= endY; y++){
			for(var z = startZ; z <= endZ; z++){
				setTile(x, y, z, block);
				count++;
			}
		}
	}
	
	return count;
}

/* 유틸 함수 END */