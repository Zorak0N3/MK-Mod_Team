var selection1 = [0, 0, 0];
var selection2 = [0, 0, 0];

var select_first = false;
var select_second = false;

var clipboard = new Array();

function procCmd(cmd){
	arg = cmd.toLowerCase().split(" ");
	
	switch(arg[0])
	{
		case "/set":
			if(arg[1] === undefined){
				clientMessage("사용법 : //set [아이템 ID]");
				break;
			}
			
			var block = new Number(arg[1]);
			
			if(!select_first || !select_second){
				clientMessage("선택된 영역이 없습니다.");
				break;
			}
			
			clientMessage(W_set(block) + "개의 블록이 수정되었습니다.");
			break;
		case "/replace":
			if(arg[1] === undefined || arg[2] === undefined){
				clientMessage("사용법 : //replace [교체할 ID] [교체될 ID]");
				break;
			}
			
			var block1 = new Number(arg[1]);
			var block2 = new Number(arg[2]);
			
			if(!select_first || !select_second){
				clientMessage("선택된 영역이 없습니다.");
				break;
			}
			
			clientMessage(W_replace(block1, block2) + "개의 블록이 수정되었습니다.");
			break;
		case "/copy":
			if(!select_first || !select_second){
				clientMessage("선택된 영역이 없습니다.");
				break;
			}
			
			clientMessage(W_copy() + "개의 블록이 복사되었습니다.");
			break;
		case "/paste":
			if(clipboard.length == 0){
				clientMessage("저장된 영역이 없습니다.");
				break;
			}
			
			clientMessage(W_paste(getPlayerX(), getPlayerY(), getPlayerZ()) + "개의 블록이 수정되었습니다.");
			break;
		case "/undo":
			
			break;
	}
}

function useItem(x, y, z, item, block){
	if(item == 267){
		if(!select_first){
			select_first = true;
			selection1[0] = Math.round(x);
			selection1[1] = Math.round(y);
			selection1[2] = Math.round(z);
			
			clientMessage("첫번째 선택 완료.\n(X : " + selection1[0] + " Y : " + selection1[1] + " Z : " + selection1[2] + ")");
		}else if(!select_second){
			select_second = true;
			selection2[0] = Math.round(x);
			selection2[1] = Math.round(y);
			selection2[2] = Math.round(z);
			
			clientMessage("두번째 선택 완료.\n(X : " + selection1[0] + " Y : " + selection1[1] + " Z : " + selection1[2] + ")");
		}else{
			select_first = false;
			select_second = false;
			
			clientMessage("선택 지점이 초기화 되었습니다.\n다시 선택해 주세요.");
		}
	}
}

function W_set(block){
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

function W_copy(){
	var startX = Math.min(selection1[0], selection2[0]);
	var endX = Math.max(selection1[0], selection2[0]);
	var startY = Math.min(selection1[1], selection2[1]);
	var endY = Math.max(selection1[1], selection2[1]);
	var startZ = Math.min(selection1[2], selection2[2]);
	var endZ = Math.max(selection1[2], selection2[2]);
	
	clipboard[0] = [startX - getPlayerX() - 0.5, startY - getPlayerY() - 1, startZ - getPlayerZ() - 0.5];
	clipboard[1] = new Array();
	
	var count = 0;
	
	for(var x = startX; x <= endX; x++){
		clipboard[1][x - startX] = new Array();
		for(var y = startY; y <= endY; y++){
			clipboard[1][x - startX][y - startY] = new Array();
			for(var z = startZ; z <= endZ; z++){
				clipboard[1][x - startX][y - startY][z - startZ] = getTile(x, y, z);
				count++;
			}
		}
	}
	
	return count;
}

function W_paste(playerX, playerY, playerZ){
	clipboard[0][0] += playerX - 0.5;
	clipboard[0][1] += playerY;
	clipboard[0][2] += playerZ - 0.5;
	
	var count = 0;
	
	for(var x in clipboard[1]){
		for(var y in clipboard[1][x]){
			for(var z in clipboard[1][y]){
				setTile(x + Math.round(clipboard[0][0]), y + Math.round(clipboard[0][1]), z + Math.round(clipboard[0][2]), clipboard[1][x][y][z]);
				count++;
			}
		}
	}
	
	return count;
}

function W_replace(block1, block2){
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
				var block = getTile(x, y, z);
				
				if(block == block1){
					setTile(x, y, z, block2);
					count++;
				}
			}
		}
	}
	
	return count;
}
