var selection1 = [0, 0, 0];
var selection2 = [0, 0, 0];

var select_first = false;
var select_second = false;

var set = false;
var replace = false;

var saveItemId = 0;

function procCmd(cmd){
	arg = cmd.toLowerCase().split(" ");
	
	switch(arg)
	{
		case "/set":
			if(!arg[1].length){
				clientMessage("사용법 : //set [아이템 ID]");
			}
			
			var block = new Number(arg[1]);
			
			if(!select_first || !select_second){
				clientMessage("선택된 영역이 없습니다.");
			}
			
			clientMessage(W_set(block) + "개의 블록이 수정되었습니다.");
			break;
		case "/replace":
			if(!arg[1].length || !arg[2].length){
				clientMessage("사용법 : //replace [교체할 ID] [교체될 ID]");
			}
			
			var block1 = new Number(arg[1]);
			var block2 = new Number(arg[2]);
			
			if(!select_first || !select_second){
				clientMessage("선택된 영역이 없습니다.");
			}
			
			clientMessage(W_replace(block1, block2) + "개의 블록이 수정되었습니다.");
			break;
	}
}

function useItem(x, y, z, item, block){
	if(item == 292){
		saveItemId = block;
		clientMessage("아이템 ID : "+block);
		preventDefault();
	}
	
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
			second = false;
			
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

function W_replace(block1, block2){
	var startX = Math.min(selection1[0], selection2[0]);
	var endX = Math.max(selection1[0], selection2[0]);
	var startY = Math.min(selection1[1], selection2[1]);
	var endY = Math.max(selection1[1], selection2[1]);
	var startZ = Math.min(selection1[2], selection2[2]);
	var endZ = Math.max(selection1[2], selection2[2]);
	
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