var g_Player_dream = false; // 꿈꾸고 있는중인지
var g_bedPos = []; // 침대의 위치

var g_spawnCount = 0; // 히로빈 스폰 횟수
var g_HB_block = []; // 히로빈 블록 위치
var g_HB = null; // 히로빈 엔티티
var g_HB_health = 0; // 히로빈 체력
var g_HB_spawn = true; // 히로빈 스폰가능여부

var g_Timer_end = false;
var g_Timer_time = -1;
var g_Timer_tag = "";

var g_dataLoaded = false; // 데이터가 불러와졌는지
var DEBUG = false; // 디버그 모드인지
var VERSION = "Herobrine 1.5";

function saveData(){ // 데이터 저장하기
	if(g_dataLoaded){
		var spawnCount = NumToBlock(g_spawnCount);
		for(var sc = 0; sc < spawnCount.length; sc++){
			setTile(sc, 0, 0, spawnCount[sc]);
		}
		setTile(spawnCount.length, 0, 0, 41);
		
		setTile(0, 1, 0, 57); // 버전 저장
		
		
		if(g_HB_block.length != 0){
			var blockX = NumToBlock(g_HB_block[0]);
			var blockY = NumToBlock(g_HB_block[1]);
			var blockZ = NumToBlock(g_HB_block[2]);
			
			for(var bx = 0; bx < blockX.length; bx++){
				setTile(bx, 0, 1, blockX[bx]);
			}
			
			for(var by = 0; by < blockY.length; by++){
				setTile(by, 0, 2, blockY[by]);
			}
			
			for(var bz = 0; bz < blockZ.length; bz++){
				setTile(bz, 0, 3, blockZ[bz]);
			}
			setTile(blockX.length, 0, 1, 41);
			setTile(blockY.length, 0, 2, 41);
			setTile(blockZ.length, 0, 3, 41);
		}else{
			setTile(0, 0, 1, 41);
			setTile(0, 0, 2, 41);
			setTile(0, 0, 3, 41);
		}
	}
}

function loadData(){ // 데이터 불러오기
	if(!g_dataLoaded){
		if(getTile(0, 1, 0) == 57){ // 스크립트를 한번 이상 사용 체크
			var spawnCount = [];
			
			for(var sc = 0; getTile(sc, 0, 0) != 41; sc++){
				spawnCount[sc] = getTile(sc, 0, 0);
			}
			g_spawnCount = BlockToNum(spawnCount);
			
			
			var blockX = [], blockY = [], blockZ = [];
			
			for(var bx = 0; getTile(bx, 0, 1) != 41; bx++){
				blockX[bx] = getTile(bx, 0, 1);
			}
			
			for(var by = 0; getTile(by, 0, 2) != 41; by++){
				blockY[by] = getTile(by, 0, 2);
			}
			
			for(var bz = 0; getTile(bz, 0, 3) != 41; bz++){
				blockZ[bz] = getTile(bz, 0, 3);
			}
			g_HB_block = [BlockToNum(blockX), BlockToNum(blockY), BlockToNum(blockZ)];
			
			if(DEBUG) clientMessage("<DEBUG> Data has been loaded.");
			if(DEBUG) clientMessage("<DEBUG> [Data] SpawnCount = " + g_spawnCount + "");
			if(DEBUG) clientMessage("<DEBUG> [Data] HB_block = " + g_HB_block + "");
		}
		g_dataLoaded = true;
	}
}

function newLevel(hasLevel){ // 게임이 시작됬을때
	print("\n" + VERSION + " By KsyMC");
	
	g_HB_block = [];
	g_HB = null;
	g_spawnCount = 0;
	g_HB_health = 0;
	g_HB_spawn = true;
	g_Player_dream = false;
	g_bedPos = [];
	g_dataLoaded = false;
}

function leaveGame(){ // 게임이 종료됬을때
	if(g_HB != null) HB_remove();
	
	stopTimer();
}

function useItem(x, y, z, item, block, side){ // 아이템으로 터치했을때
	if(HB_checkBlock(x, y - 3, z)){ // 히로빈 블록을 터치했을경우
		preventDefault();
		
		if(g_HB_block.length != 0 && g_HB_block[0] == x && g_HB_block[1] == y - 3 && g_HB_block[2] == z) // 중복 체크
			return;
		
		clientMessage("You don't know what you did....");
		HB_setblock(x, y - 3, z); // 바닥 부분을 저장
	}
	
	if(block == 26){// 침대
		g_bedPos = [Math.floor(getPlayerX()), Math.floor(getPlayerY()), Math.floor(getPlayerZ())];
		
		if(g_HB == null && g_spawnCount > 10 && getRandom(0, 100) < 50){
			g_HB_spawn = false;
			startTimer(4.9, "Check_bed");
			
			if(DEBUG) clientMessage("<DEBUG> 악몽 진입중. 침대에 누워있어야 합니다.");
		}else if(g_HB == null && g_spawnCount > 10){
			if(DEBUG) clientMessage("<DEBUG> 악몽 진입 실패");
		}else{
			if(DEBUG) clientMessage("<DEBUG> 기타 문제 발생으로 악몽에 진입할 수 없습니다.");
		}
	}
}

function attackHook(player, victim){ // 공격했을때
	if(g_HB != null && Entity.getYaw(victim) == Entity.getYaw(g_HB)){ // 히로빈이 맞다면
		HB_attackedByPlayer(player);
	}
}

function procCmd(cmd){ // 명령어
	var arg = cmd.split(" ");
	
	switch(arg[0]){
		case "herobrine":
			if(arg[1] == "debug"){
				if(!DEBUG) DEBUG = true;
				else DEBUG = false;
				
				clientMessage("<Herobrine> Debug");
			}else{
				clientMessage("<Herobrine> Version :" + VERSION);
				clientMessage("<Herobrine> Made by KsyMC");
			}
			break;
	}
}

function modTick(){ // 실시간 체크 함수
	/////////////////////////////
	// 월드 안에서 있을때 //
	if(getYaw() == 0) return;
	else loadData();
	
	if(g_Timer_time != -1){ // 타이머
		g_Timer_time--;
		
		if(g_Timer_time == 0)
			g_Timer_end = true;
		
		if(g_Timer_time == -1){
			g_Timer_end = false;
			g_Timer_tag = "";
		}
	}
	
	if(g_Timer_end){ // 타이머 핸들러
		if(DEBUG) clientMessage("<DEBUG> Timer end. (" + getTimerTag() + ")");
		timerEndHandler(getTimerTag());
	}
	
	if(g_bedPos.length == 3 && getTile(g_bedPos[0], g_bedPos[1], g_bedPos[2]) != 26){ // 침대 체크
		g_bedPos = [];
	}
	
	saveData();
	
	//////////////////////////////////////////////
	// 히로빈 블럭이 활성화되어 있을때 //
	if(g_HB_block.length == 0) return;
	
	if(getTile(g_HB_block[0], g_HB_block[1], g_HB_block[2]) != 41 || getTile(g_HB_block[0], g_HB_block[1] + 1, g_HB_block[2]) != 41 || getTile(g_HB_block[0], g_HB_block[1] + 2, g_HB_block[2]) != 87 || getTile(g_HB_block[0], g_HB_block[1] + 3, g_HB_block[2]) != 87 || getTile(g_HB_block[0], g_HB_block[1] + 4, g_HB_block[2]) != 51){ // 구조물 체크
		g_HB_block = [];
	}
	
	if(g_HB == null && getRandom(0, 1000) == getRandom(0, 1000) && g_HB_spawn){ // 소환
		HB_spawn();
	}
	
	//////////////////////////////////////
	// 히로빈이 스폰 되어 있을때 //
	if(g_HB == null) return;
	
	if(Entity.getYaw(g_HB) == 0){
		HB_remove();
		
		if(DEBUG) clientMessage("<DEBUG> Herobrine is dead!");
	}
	
	if(g_HB_health <= getWeaponDamage(getCarriedItem())){ // 보호
		HB_remove();
		
		if(DEBUG) clientMessage("<DEBUG> Protect Herobrine");
	}
}

function timerEndHandler(tag){ // 타이머 종료 핸들러
	switch(tag){
		case "HB_remove":
			HB_remove();
			
			if(DEBUG) clientMessage("<DEBUG> Herobrine has been deleted automatically.");
			break;
		case "HB_remove_checkDead":
			HB_remove();
			if(getYaw() != 0) clientMessage("Argh! I'll come back!");
			
			if(DEBUG) clientMessage("<DEBUG> Herobrine has been deleted automatically.");
			break;
		case "Check_bed":
			if(getTile(getPlayerX(), getPlayerY(), getPlayerZ()) == 26){
				startTimer(0.1, "Start_dream");
			}else{
				g_HB_spawn = true;
			}
			break;
		case "Start_dream":
			var data = HB_buildDream();
			
			g_Player_dream = true;
			setPosition(getPlayerEnt(), data[0], data[1], data[2]);
			startTimer(data[3], "End_dream");
			
			if(DEBUG) clientMessage("<DEBUG> The dream started.");
			break;
		case "End_dream":
			HB_deleteDream();
			
			g_Player_dream = false;
			g_HB_spawn = true;
			setPosition(getPlayerEnt(), g_bedPos[0], g_bedPos[1] + 2, g_bedPos[2]);
			
			if(DEBUG) clientMessage("<DEBUG> Awake from sleep");
			break;
	}
}

function HB_spawn(){ // [히로빈] 소환
	if(!g_HB_spawn) return false;
	
	var pos = getFloor(getRandom(Math.floor(getPlayerX()) - 3, Math.floor(getPlayerX()) + 3), Math.floor(getPlayerY()), getRandom(Math.floor(getPlayerZ()) - 3, Math.floor(getPlayerZ()) + 3), true);
	if(getTile(pos[0], pos[1] + 1, pos[2]) != 0 || getTile(pos[0], pos[1] + 2, pos[2]) != 0){
		if(DEBUG) clientMessage("<DEBUG> Herobrine summons was canceled.");
		
		return false;
	}
	
	var time = 3, checkPlayerDead = false;
	
	if(g_spawnCount == 0){
		clientMessage("HI!");
	}else{
		switch(getRandom(0, 10)){
			case 0:
				if(HB_attackHouse()) break;
				
				clientMessage("!enirboreH ma I");
				break;
			case 1:
				clientMessage("?mA I erehW");
				break;
			case 2:
				HB_attackFire(5);
				time = 5;
				break;
			case 3:
				HB_attackAir();
				time = 4;
				checkPlayerDead = true;
				break;
			case 4:
				HB_attackFire(20);
				clientMessage("!nileppeZ deL ot netsiL");
				break;
			case 5:
				HB_attackZombie(20);
				time = 4;
				checkPlayerDead = true;
				break;
			case 6:
				HB_attackZombie(5);
				HB_attackFire(5);
				break;
		}
	}
	
	g_spawnCount++;
	
	g_HB = spawnPigZombie(pos[0], pos[1] + 1, pos[2], 276, "mob/char.png");
	g_HB_health = 20;
	
	if(checkPlayerDead) startTimer(time, "HB_remove_checkDead");
	else startTimer(time, "HB_remove");
	
	if(DEBUG) clientMessage("<DEBUG> Herobrine has been summoned.");
	if(DEBUG) clientMessage(" (Time " + time + ", Count " + g_spawnCount + ", X " + pos[0] + ", Y " + (pos[1] + 1) + ", Z " + pos[2] + ")");
	
	return true;
}

function HB_remove(){ // [히로빈] 삭제
	if(g_HB == null) return;
	
	stopTimer();
	setPosition(g_HB, 0, -100, 0);
	g_HB = null;
	g_HB_health = 0;
}

function HB_checkBlock(floorX, floorY, floorZ){ // [히로빈] 구조물이 맞나 체크
	if(getTile(floorX, floorY, floorZ) == 41 && getTile(floorX, floorY + 1, floorZ) == 41 && getTile(floorX, floorY + 2, floorZ) == 87 && getTile(floorX, floorY + 3, floorZ) == 87){
		return true;
	}
	return false;
}

function HB_setblock(floorX, floorY, floorZ){ // [히로빈] 구조물 설정
	g_HB_block = [floorX, floorY, floorZ];
	setTile(floorX, floorY + 4, floorZ, 51);
	explode(floorX, floorY + 5, floorZ, 0.01);
	
	if(DEBUG) clientMessage("<DEBUG> Set blocks position. (X " + floorX + ", Y " + floorY + ", Z " + floorZ + ")");
}

function HB_attackedByPlayer(player){ // [히로빈] 플레이어가 공격
	g_HB_health -= getWeaponDamage(getCarriedItem());
	
	if(DEBUG) clientMessage("<DEBUG> Attacked! (Item " + getCarriedItem() + ", Health " + g_HB_health + ")");
}

function HB_buildDream(){ // [히로빈] 악몽 건축물 생성
	var count = 0, pos = [];
	if(getRandom(0, 100) < 40){
		count += W_set(48, [0, 99, 0], [21, 109, 8]);
		count -= W_set(0, [1, 101, 1], [19, 107, 6]);
		W_set(89, [1, 108, 3], [19, 108, 4]);
		
		count++;
		setTile(19, 101, 4, 51);
		
		pos = [1.5, 103, 4.5, 10];
	}else if(getRandom(0, 100) < 40){
		count += W_set(7, [0, 100, 0], [5, 108, 5]);
		count -= W_set(0, [1, 101, 1], [4, 107, 4]);
		count += W_set(10, [1, 101, 1], [4, 105, 4]);
		
		setTile(3, 108, 3, 89);
		
		pos = [3.5, 107, 3.5, 1.5];
	}else{
		pos = [128, 300, 128, 2];
	}/*else if(getRandom(0, 100) < 10){
		
	}else if(getRandom(0, 100) < 10){
		
	}else if(getRandom(0, 100) < 10){
		
	}*/
	
	if(DEBUG) clientMessage("<DEBUG> [Dream] " + count + " blocks have been created.");
	
	return pos;
}

function HB_deleteDream(){ // [히로빈] 악몽 건축물 삭제
	var count = 0;
	
	count += W_set(0, [0, 95, 0], [35, 130, 35]);
	
	if(DEBUG) clientMessage("<DEBUG> [Dream] " + count + " blocks have been removed.");
}

function HB_attackFire(num){ // [히로빈] 불로 공격
	if(num === NaN) num = 5;
	
	for(var i = 0; i < num; i++){	
		var pos = getFloor(getRandom(Math.floor(getPlayerX()) - 5, Math.floor(getPlayerX()) + 5), Math.floor(getPlayerY()), getRandom(Math.floor(getPlayerZ()) - 5, Math.floor(getPlayerZ()) + 5), true);
		setTile(pos[0], pos[1] + 1, pos[2], 51);
	}
	
	explode(getPlayerX(), getPlayerY(), getPlayerZ(), 0.01);
}

function HB_attackAir(){ // [히로빈] 위로 올려 공격
	setVelY(getPlayerEnt(), 2);
}

function HB_attackZombie(num){ // [히로빈] 좀비 공격
	if(num === NaN) num = 10;
	
	for(var i = 0; i < num; i++){	
		var pos = getFloor(getRandom(Math.floor(getPlayerX()) - 10, Math.floor(getPlayerX()) + 10), Math.floor(getPlayerY()), getRandom(Math.floor(getPlayerZ()) - 10, Math.floor(getPlayerZ()) + 10), true);
		if(getTile(pos[0], pos[1] + 1, pos[2]) != 0 || getTile(pos[0], pos[1] + 2, pos[2]) != 0) continue;
		
		bl_spawnMob(pos[0], pos[1] + 1, pos[2], 32, "mobs/zombie.png");
	}
}

function HB_attackHouse(){
	if(g_bedPos.length != 0){
		for(var i = 0; i < 20; i++){
			var pos = [getRandom(g_bedPos[0] - 10, g_bedPos[0] + 10), g_bedPos[1], getRandom(g_bedPos[2] - 10, g_bedPos[2] + 10)];
			setTile(pos[0], pos[1], pos[2], 51);
		}
		return true;
	}
	return false;
}

function startTimer(sec, tag){ // 타이머 설정
	stopTimer();
	
	g_Timer_time = sec * 20;
	g_Timer_tag = tag;
	
	if(DEBUG) clientMessage("<DEBUG> Timer set (" + g_Timer_time / 20 + "sec, tag " + g_Timer_tag + ")");
}

function stopTimer(){ // 타이머 중지
	if(DEBUG) clientMessage("<DEBUG> Stop Timer " + (getTimerTag() == "" ? "" : ("(" + getTimerTag() + ")")));
	
	g_Timer_end = false;
	g_Timer_time = -1;
	g_Timer_tag = "";
}

function getTimerTime(){ // 현재 작동중인 타이머의 시간 구하기
	return g_Timer_time;
}

function getTimerTag(){ // 현재 작동중인 타이머의 태그 구하기
	return g_Timer_tag;
}

function getWeaponDamage(weapon){ // 무기 데미지 구하기
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

function getRandom(num1, num2){ // 랜덤 숫자 생성
	var start = Math.max(num1, num2);
	var end = Math.min(num1, num2);
	
	end -= start;
	return parseInt(Math.random() * end) + start;
}

function NumToBlock(num){ // 숫자를 적절한 블록으로 변환
	var block = [];
	if(block.length == 1) num = [num];
	else num = num.toString().split("");
	
	for(var i = 0; i < num.length; i++){
		if(num[i] == 0) block[i] = 17;
		else if(num[i] >= 1 && num[i] <= 5) block[i] = Number(num[i]);
		else if(num[i] == 6) block[i] = 7;
		else if(num[i] == 7) block[i] = 14;
		else if(num[i] == 8) block[i] = 15;
		else if(num[i] == 9) block[i] = 16;
	}
	
	return block;
}

function BlockToNum(block){ // 변환한 블록을 숫자로 변환
	if(block == 6 || block >= 18) return false;
	
	var num = [];
	if(block.length == 1) block = [block];
	
	for(var i = 0; i < block.length; i++){
		if(block[i] == 17) num[i] = 0;
		else if(block[i] >= 1 && block[i] <= 5) num[i] = block[i];
		else if(block[i] == 7) num[i] = 6;
		else if(block[i] == 14) num[i] = 7;
		else if(block[i] == 15) num[i] = 8;
		else if(block[i] == 16) num[i] = 9;
	}
	
	return Number(num.join(""));
}

function getFloor(x, y, z, fromRoof){ // 인자로 받은 위치에서 바닥을 구하기
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

function getRoof(x, y, z, fromFloor){ // 인자로 받은 위치에서 천장을 구하기
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

function W_set(block, selection1, selection2){ // 월드에딧
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
				var after = getTile(x, y, z);
				setTile(x, y, z, block);
				
				if(after != block) count++;
			}
		}
	}
	
	return count;
}