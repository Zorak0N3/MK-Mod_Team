var VERSION = "1.1";

var path = android.os.Environment.getExternalStorageDirectory().getAbsolutePath()+"/games/com.mojang/minecraftResource/PC_CraftingTable/";
var craftingWindow = null;
var tableBitmap = null;
var itemBitmap = [];

var textCount = null;
var recipes = [];
var invItem = [];
var craftingtablePos = [];
var holdingItem = [0, 0, 0];
var holdMode = true;

function dip2px(ctx, dips){
	return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

function newTextView(ctx, text, params, textColor, sort){
	try{
		var textView = new android.widget.TextView(ctx);
		textView.setTextColor(textColor);
		textView.setGravity(sort);
		textView.setLayoutParams(params);
		textView.setText(text.toString());
		
		return textView;
	}catch(err){
		clientMessage("텍스트 생성 실패\n"+err);
	}
}

function newImageView(ctx, bitmap, params, clickListener){
	try{
		var imageView = new android.widget.ImageView(ctx);
		imageView.setLayoutParams(params);
		imageView.setImageBitmap(bitmap);
		if(clickListener != false) imageView.setOnClickListener(clickListener);
		
		return imageView;
	}catch(err){
		clientMessage("이미지 생성 실패\n"+err);
	}
}

function newButton(ctx, text, params, textColor, clickListener){
	try{
		var button = new android.widget.Button(ctx);
		button.setLayoutParams(params);
		if(textColor != false) button.setTextColor(textColor);
		button.setText(text);
		button.setOnClickListener(clickListener);
		
		return button;
	}catch(err){
		clientMessage("버튼 생성 실패\n"+err);
	}
}

function getItemBitmap(id, damage){ // 아이템 이미지
	if(itemBitmap[id+"-"+damage] === undefined){
		if(itemBitmap[id+"-0"] === undefined) return itemBitmap["noimage"];
		else return itemBitmap[id+"-0"];
	}
	return itemBitmap[id+"-"+damage];
}

function newLevel(){
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	
	// 파일 체크
	var file = java.io.File(path);
	if(file.exists() == false){
		clientMessage("[에러] 리소스 폴더가 존재하지 않습니다.");
		return;
	}
	
	// 버전 체크
	var fis = new java.io.FileInputStream(path+"versions");
	var bufferReader = new java.io.BufferedReader(new java.io.InputStreamReader(fis));
	var version = bufferReader.readLine();
	if(version != VERSION){
		clientMessage("[경고] 새로운 버전의 파일을 받아주세요.");
		version = "에러";
	}
	clientMessage("PC CraftingTable / 버전 : "+version);
	
	// 테이블 불러오기
	var bitmap = android.graphics.BitmapFactory.decodeFile(path+"gui/crafting_table.png");
	tableBitmap = android.graphics.Bitmap.createScaledBitmap(bitmap, dip2px(ctx, (bitmap.getWidth() * 2)), dip2px(ctx, (bitmap.getHeight() * 2)), false);
	
	// 블록 불러오기
	var files = java.io.File(path+"res/").listFiles();
	for(var i = 0; i < files.length; i++){
		var name = files[i].getName();
		var block = android.graphics.BitmapFactory.decodeFile(files[i].getPath());
		itemBitmap[name.substring(0, name.length() - 4)] = android.graphics.Bitmap.createScaledBitmap(block, dip2px(ctx, 28), dip2px(ctx, 28), false);
	}
	
	// 레시피 불러오기
	try{
		var file = new java.io.FileInputStream(path+"xml/workbench.xml");
		var parserCreator = org.xmlpull.v1.XmlPullParserFactory.newInstance();
		parser = parserCreator.newPullParser();
		parser.setInput(file, "utf-8");
		
		var recipe = {};
		var parserEvent = parser.getEventType();
		var isRecipeTag = false, tagName = "";
		
		while (parserEvent != org.xmlpull.v1.XmlPullParser.END_DOCUMENT){
			if(parserEvent == org.xmlpull.v1.XmlPullParser.START_TAG){
				tagName = parser.getName();
				if(tagName == "recipe"){
					isRecipeTag = true;
					recipe = {slot:[], result:[]};
					for(var i = 0; i < 9; i++) recipe.slot[i] = [0, 0];
				}else if(tagName == "result"){
					recipe.result[1] = parseInt(parser.getAttributeValue(null, "damage")) || 0;
					recipe.result[2] = parseInt(parser.getAttributeValue(null, "count")) || 1;
				}else if(tagName != "recipes"){
					recipe.slot[tagName.substring(4, 5)][1] = parseInt(parser.getAttributeValue(null, "damage")) || 0;
				}
			}else if(parserEvent == org.xmlpull.v1.XmlPullParser.TEXT){
				if(isRecipeTag){
					if(tagName == "result"){
						recipe.result[0] = parseInt(parser.getText());
					}else if(tagName != "recipes" && tagName != "recipe" && tagName != ""){
						recipe.slot[tagName.substring(4, 5)][0] = parseInt(parser.getText());
					}
				}
			}else if(parserEvent == org.xmlpull.v1.XmlPullParser.END_TAG){
				tagName = "";
				if(parser.getName() == "recipe"){
					isRecipeTag = false;
					recipes[recipes.length] = recipe;
				}
			}
			parserEvent = parser.next();
		}
	}catch(err){
		print("Error:\n"+err);
	}
}

function leaveGame(){
	textCount = null;
	invItem = [];
	holdingItem = [0, 0, 0];
	holdMode = true;
	
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({
		run: function() {
			if(craftingWindow != null){
				craftingWindow.dismiss();
				craftingWindow = null;
			}
		}
	}));
}

function useItem(x, y, z, item, block, side, itemdata, blockdata){
	if(block == 58 && Level.getGameMode() == 0){
		preventDefault();
		drawCraftingTable();
		craftingtablePos = [x + 0.5, y + 1, z + 0.5];
	}
}

function drawCraftingTable(){ // UI 불러오기
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({
		run: function() {
			try{
				var mlayout = new android.widget.RelativeLayout(ctx);
				mlayout.setLayoutParams(new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT));
				
				var imageParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
				imageParams.addRule(android.widget.RelativeLayout.CENTER_IN_PARENT);
				
				var image = newImageView(ctx, tableBitmap, imageParams, false);
				mlayout.addView(image);
				
				drawInvItems(ctx, mlayout); // 인벤토리 구현
				drawTableItems(ctx, mlayout); // 조합슬롯부분 구현
				drawSelectItems(ctx, mlayout); // 도구 구현
				addExitButton(ctx, mlayout); // 백 버튼
				
				craftingWindow = new android.widget.PopupWindow(mlayout, ctx.getWindowManager().getDefaultDisplay().getWidth(), ctx.getWindowManager().getDefaultDisplay().getHeight(), true);
				craftingWindow.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.argb(170, 0, 0, 0)));
				craftingWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);
			}catch(err){
				print("Error:\n"+err);
			}
		}
	}));
}

function drawInvItems(ctx, mlayout){ // 인벤토리 슬롯들
	var layout = new android.widget.RelativeLayout(ctx);
	var params = new android.widget.RelativeLayout.LayoutParams(dip2px(ctx, 216), dip2px(ctx, 216));
	params.setMargins((ctx.getWindowManager().getDefaultDisplay().getWidth() / 2) + dip2px(ctx, 20), (ctx.getWindowManager().getDefaultDisplay().getHeight() / 2) - dip2px(ctx, 108), 0, 0);
	layout.setLayoutParams(params);
	
	var slot = 9;
	for(var y = 0; y < 6; y++){
		for(var x = 0; x < 6; x++){
			var id = Player.getInventorySlot(slot);
			var damage = Player.getInventorySlotData(slot);
			var count = Player.getInventorySlotCount(slot);
			var realslot = slot;
			
			var imageParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
			var textParams = new android.widget.RelativeLayout.LayoutParams(dip2px(ctx, 15), dip2px(ctx, 15));
			imageParams.setMargins(dip2px(ctx, (3 + (x * 36))), dip2px(ctx, (3 + (y * 36))), 0, 0);
			textParams.setMargins(dip2px(ctx, (18 + (x * 36))), dip2px(ctx, (20 + (y * 36))), 0, 0);
			
			var image = newImageView(ctx, getItemBitmap(id, damage), imageParams, new android.view.View.OnClickListener() {onClick: function(v){ onClickItem(v); }});
			var text = newTextView(ctx, (count > 1 ? count.toString() : ""), textParams, android.graphics.Color.BLACK, android.view.Gravity.RIGHT);
			
			invItem[slot] = [image, text, id, damage, count];
			layout.addView(image);
			layout.addView(text);
			
			slot++;
		}
	}
	mlayout.addView(layout);
}

function drawTableItems(ctx, mlayout){ // 조합 슬롯들
	var layout = new android.widget.RelativeLayout(ctx);
	var params = new android.widget.RelativeLayout.LayoutParams(dip2px(ctx, 232), dip2px(ctx, 108));
	params.setMargins((ctx.getWindowManager().getDefaultDisplay().getWidth() / 2) - dip2px(ctx, 236), (ctx.getWindowManager().getDefaultDisplay().getHeight() / 2) - dip2px(ctx, 54), 0, 0);
	layout.setLayoutParams(params);
	
	var slot = 0;
	for(var y = 0; y < 3; y++){
		for(var x = 0; x < 3; x++){
			var imageParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
			var textParams = new android.widget.RelativeLayout.LayoutParams(dip2px(ctx, 15), dip2px(ctx, 15));
			imageParams.setMargins(dip2px(ctx, (3 + (x * 36))), dip2px(ctx, (3 + (y * 36))), 0, 0);
			textParams.setMargins(dip2px(ctx, (18 + (x * 36))), dip2px(ctx, (20 + (y * 36))), 0, 0);
			
			var image = newImageView(ctx, getItemBitmap(0, 0), imageParams, new android.view.View.OnClickListener() {onClick: function(v){ onClickItem(v); }});
			var text = newTextView(ctx, "", textParams, android.graphics.Color.BLACK, android.view.Gravity.RIGHT);
			
			invItem[slot] = [image, text, 0, 0, 0];
			layout.addView(image);
			layout.addView(text);
			
			slot++;
		}
	}
	
	var imageParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
	var textParams = new android.widget.RelativeLayout.LayoutParams(dip2px(ctx, 15), dip2px(ctx, 15));
	imageParams.setMargins(dip2px(ctx, 190), dip2px(ctx, 40), 0, 0);
	textParams.setMargins(dip2px(ctx, 210), dip2px(ctx, 60), 0, 0);
	
	var image = newImageView(ctx, getItemBitmap(0, 0), imageParams, new android.view.View.OnClickListener() {onClick: function(v){ onClickCraftingItem(v); }});
	var text = newTextView(ctx, "", textParams, android.graphics.Color.BLACK, android.view.Gravity.RIGHT);
	
	invItem[45] = [image, text, 0, 0, 0];
	layout.addView(image);
	layout.addView(text);
	
	mlayout.addView(layout);
}

function drawSelectItems(ctx, mlayout){ // 도구
	var layout = new android.widget.RelativeLayout(ctx);
	var params = new android.widget.RelativeLayout.LayoutParams(dip2px(ctx, 74), dip2px(ctx, 144));
	params.setMargins((ctx.getWindowManager().getDefaultDisplay().getWidth() / 2) - dip2px(ctx, 67), (ctx.getWindowManager().getDefaultDisplay().getHeight() / 2) - dip2px(ctx, 72), 0, 0);
	layout.setLayoutParams(params);
	
	var pickupParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, dip2px(ctx, 35));
	var textParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, dip2px(ctx, 35));
	pickupParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
	textParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
	
	var pickup = newButton(ctx, "Hold", pickupParams, false, new android.view.View.OnClickListener() {
		onClick: function(v){
			holdMode = !holdMode;
			if(holdMode) v.setText("Hold");
			else v.setText("Drop");
		}
	});
	
	textCount = new android.widget.EditText(ctx);
	textCount.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
	textCount.setGravity(android.view.Gravity.CENTER);
	textCount.setLayoutParams(textParams);
	textCount.setText("1");
	
	layout.addView(pickup);
	layout.addView(textCount);
	
	mlayout.addView(layout);
}

function addExitButton(ctx, layout){ // 나가는 버튼 추가
	var exitParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
	exitParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
	exitParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
	
	var exit = newButton(ctx, "Back", exitParams, android.graphics.Color.BLACK, new android.view.View.OnClickListener() {
		onClick: function(v){
			for(var slot = 0; slot < 9; slot++){
				if(invItem[slot][2] != 0){
					Level.dropItem(craftingtablePos[0], craftingtablePos[1], craftingtablePos[2], 0, invItem[slot][2], invItem[slot][4], invItem[slot][3]);
				}
			}
			if(holdingItem[0] != 0){
				Level.dropItem(craftingtablePos[0], craftingtablePos[1], craftingtablePos[2], 0, holdingItem[0], holdingItem[2], holdingItem[1]);
			}
			
			leaveGame();
		}
	});
	layout.addView(exit);
}

function checkCrafting(ctx){ // 조합
	setSlot(ctx, 45, 0, 0, 0);
	
	for(var id in recipes){
		var check = 0;
		for(var slot = 0; slot < 9; slot++) if(recipes[id].slot[slot][0] == invItem[slot][2] && recipes[id].slot[slot][1] == invItem[slot][3]) check++;
		
		if(check == 9){
			setSlot(ctx, 45, recipes[id].result[0], recipes[id].result[1], recipes[id].result[2]);
			break;
		}
	}
}

function onClickItem(item){ // 아이템 클릭시
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	var slot = 0;
	for(; slot < 45; slot++) if(invItem[slot][0] == item) break;
	
	if(holdMode){ // Hold Mode
		if(invItem[slot][2] == 0 || holdingItem[2] == 64 || textCount.getText() == 0 || (holdingItem[0] != 0 && (holdingItem[0] != invItem[slot][2] || holdingItem[1] != invItem[slot][3]))) return;
		
		var leftcount = (invItem[slot][4] - textCount.getText());
		if(leftcount < 0) leftcount = 0;
		
		holdingItem = [invItem[slot][2], invItem[slot][3], (holdingItem[2] + (invItem[slot][4] - leftcount))];
		
		if(holdingItem[2] > 64){
			leftcount += (holdingItem[2] - 64);
			holdingItem[2] = 64;
		}
		
		if(slot >= 9) removeItemInventory(invItem[slot][2], invItem[slot][3], (invItem[slot][4] - leftcount));
		
		if(leftcount == 0) setSlot(ctx, slot, 0, 0, 0);
		else setSlot(ctx, slot, invItem[slot][2], invItem[slot][3], leftcount);
		
		if(slot < 9) checkCrafting(ctx);
	}else{ // Drop Mode
		if(holdingItem[0] == 0 || invItem[slot][4] == 64 || textCount.getText() == 0 || (invItem[slot][2] != 0 && (invItem[slot][2] != holdingItem[0] || invItem[slot][3] != holdingItem[1]))) return;
		
		var leftcount = (holdingItem[2] - textCount.getText());
		if(leftcount < 0) leftcount = 0;
		
		setSlot(ctx, slot, holdingItem[0], holdingItem[1], (invItem[slot][4] + (holdingItem[2] - leftcount)));
		
		if(invItem[slot][4] > 64){
			leftcount += (invItem[slot][4] - 64);
			invItem[slot][4] = 64;
		}
		
		if(slot >= 9) addItemInventory(invItem[slot][2], (holdingItem[2] - leftcount), invItem[slot][3]);
		
		if(leftcount == 0) holdingItem = [0, 0, 0];
		else holdingItem = [holdingItem[0], holdingItem[1], leftcount, holdingItem[3]];
		
		if(slot < 9) checkCrafting(ctx);
	}
}

function onClickCraftingItem(item){ // 조합된 아이템 클릭시
	if(invItem[45][2] == 0 || (holdingItem[0] != 0 && (holdingItem[0] != invItem[45][2] || holdingItem[1] != invItem[45][3]))) return;
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	
	for(var slot = 0; slot < 9; slot++){
		if(invItem[slot][4] != 1) setSlot(ctx, slot, invItem[slot][2], invItem[slot][3], (invItem[slot][4] - 1));
		else setSlot(ctx, slot, 0, 0, 0);
	}
	holdingItem = [invItem[45][2], invItem[45][3], (invItem[45][4] + holdingItem[2])];
	
	setSlot(ctx, 45, 0, 0, 0);
	checkCrafting(ctx);
}

function setSlot(ctx, slot, id, damage, count){
	invItem[slot][0].setImageBitmap(getItemBitmap(id, damage));
	invItem[slot][1].setText(id == 0 ? "" : (count <= 1 ? "" : count.toString()));
	invItem[slot] = [invItem[slot][0], invItem[slot][1], id, damage, count];
}

function removeItemInventory(id, damage, count){
	for(var i = 9; i <= 44; i++){
		if(Player.getInventorySlot(i) == id && Player.getInventorySlotData(i) == damage){
			var c = (Player.getInventorySlotCount(i) - count);
			Player.clearInventorySlot(i);
			
			if(c > 0){
				addItemInventory(id, c, damage);
				return;
			}else if(c < 0){
				count = parseInt(c);
			}else return;
		}
	}
}