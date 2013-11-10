var craftingWindow = null;

var dynamicData = [298, 299, 300, 301, 306, 307, 308, 309, 310, 311, 312, 313, 314, 315, 316, 317, 268, 283, 272, 267, 276, 259, 359, 398, 290, 291, 292, 294, 293, 269, 273, 256, 284, 277, 270, 274, 257, 285, 278, 271, 275, 258, 286, 279];
var recipes = [];

var selectslot = -1;
var invItem = [];
var textCount = null;
var pickuped = false;
var pickupItem = [];
var craftingtablePos = [];

var sdcardPath = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();

function dip2px(ctx, dips){
	return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

function newLevel(){
	var file = java.io.File(sdcardPath+"/games/com.mojang/minecraftResource/");
	if(file.exists() == false) clientMessage("Error: File does not exist.");
	
	var fis = new java.io.FileInputStream(sdcardPath+"/games/com.mojang/minecraftResource/versions");
	var bufferReader = new java.io.BufferedReader(new java.io.InputStreamReader(fis));
	var version = bufferReader.readLine();
	if(version != "1.0") clientMessage("Warning: Version Error");
	clientMessage("PC CraftingTable / Version : "+version);
	
	getRecipes();
}

function leaveGame(){
	invItem = [];
	selectslot = -1;
	textCount = null;
	pickuped = false;
	pickupItem = [];
	
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
		drawTable();
		
		craftingtablePos = [x + 0.5, y + 1, z + 0.5];
	}
}

function checkCrafting(ctx){
	setSlot(ctx, 45, 0, 0, 0);
	for(var i in recipes){
		if(recipes[i][0][0] == invItem[0][2] && recipes[i][1][0] == invItem[1][2] && recipes[i][2][0] == invItem[2][2] &&
		recipes[i][0][1] == invItem[3][2] && recipes[i][1][1] == invItem[4][2] && recipes[i][2][1] == invItem[5][2] &&
		recipes[i][0][2] == invItem[6][2] && recipes[i][1][2] == invItem[7][2] && recipes[i][2][2] == invItem[8][2]){
			var check = 0;
			for(var c = 64; c > 0; c--){
				for(var s = 0; s < 9; s++){
					if(invItem[s][4] >= c || invItem[s][2] == 0) check++;
				}
				if(check == 9){
					setSlot(ctx, 45, recipes[i][3][0], recipes[i][3][1], recipes[i][3][2] * c);
					break;
				}
				check = 0;
			}
			break;
		}
	}
}

function drawTable(){
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({
		run: function() {
			try{
				var params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT);
				var mlayout = new android.widget.RelativeLayout(ctx);
				mlayout.setLayoutParams(params);
				
				var imageParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
				imageParams.addRule(android.widget.RelativeLayout.CENTER_IN_PARENT);
				
				var image = new android.widget.ImageView(ctx);
				image.setLayoutParams(imageParams);
				image.setImageBitmap(getImage(ctx, "gui/crafting_table.png", 512, 256, false));
				mlayout.addView(image);
				
				var items = drawInvItems(ctx);
				mlayout.addView(items);
				
				var tables = drawTableItems(ctx);
				mlayout.addView(tables);
				
				var btns = drawSelectItems(ctx);
				mlayout.addView(btns);
				
				addExitButton(ctx, mlayout);
				
				craftingWindow = new android.widget.PopupWindow(mlayout, ctx.getWindowManager().getDefaultDisplay().getWidth(), ctx.getWindowManager().getDefaultDisplay().getHeight(), true);
				craftingWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER, 0, 0);
			}catch(err){
				print("Error:\n"+err);
			}
		}
	}));
}

function addExitButton(ctx, layout){
	var exitParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
	exitParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_RIGHT);
	exitParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
	
	var exit = new android.widget.Button(ctx);
	exit.setLayoutParams(exitParams);
	exit.setText("Back");
	exit.setOnClickListener(new android.view.View.OnClickListener() {
		onClick: function(v){
			craftingWindow.dismiss();
			craftingWindow = null;
			
			for(var slot = 0; slot < 9; slot++){
				if(invItem[slot][2] != 0){
					Level.dropItem(craftingtablePos[0], craftingtablePos[1], craftingtablePos[2], 0, invItem[slot][2], invItem[slot][4], invItem[slot][3]);
				}
			}
			if(pickupItem.length != 0){
				Level.dropItem(craftingtablePos[0], craftingtablePos[1], craftingtablePos[2], 0, pickupItem[0], pickupItem[2], pickupItem[1]);
			}
			
			invItem = [];
			selectslot = -1;
			textCount = null;
			pickuped = false;
			pickupItem = [];
		}
	});
	layout.addView(exit);
}

function drawInvItems(ctx){
	var params = new android.widget.RelativeLayout.LayoutParams(dip2px(ctx, 216), dip2px(ctx, 216));
	var layout = new android.widget.RelativeLayout(ctx);
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
			imageParams.setMargins(dip2px(ctx, (3 + (x * 36))), dip2px(ctx, (3 + (y * 36))), 0, 0);
			
			var image = new android.widget.ImageView(ctx);
			image.setLayoutParams(imageParams);
			image.setImageBitmap(getItemBitmap(ctx, id, damage, (id <= 255 ? true : false)));
			image.setOnClickListener(new android.view.View.OnClickListener() {
				onClick: function(v){
					onClickItem(v);
				}
			});
			layout.addView(image);
			
			var textParams = new android.widget.RelativeLayout.LayoutParams(dip2px(ctx, 15), dip2px(ctx, 15));
			textParams.setMargins(dip2px(ctx, (18 + (x * 36))), dip2px(ctx, (20 + (y * 36))), 0, 0);
			
			var text = new android.widget.TextView(ctx);
			text.setTextColor(android.graphics.Color.BLACK);
			text.setGravity(android.view.Gravity.RIGHT);
			text.setLayoutParams(textParams);
			if(id != 0) text.setText(count.toString());
			text.setTextSize(dip2px(ctx, 8));
			layout.addView(text);
			
			invItem[slot] = [image, text, id, damage, count, (id == 0 ? -1 : realslot)];
			
			slot++;
		}
	}
	
	return layout;
}

function drawTableItems(ctx){
	var params = new android.widget.RelativeLayout.LayoutParams(dip2px(ctx, 232), dip2px(ctx, 108));
	var layout = new android.widget.RelativeLayout(ctx);
	params.setMargins((ctx.getWindowManager().getDefaultDisplay().getWidth() / 2) - dip2px(ctx, 236), (ctx.getWindowManager().getDefaultDisplay().getHeight() / 2) - dip2px(ctx, 54), 0, 0);
	layout.setLayoutParams(params);
	
	var slot = 0;
	for(var y = 0; y < 3; y++){
		for(var x = 0; x < 3; x++){
			var imageParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
			imageParams.setMargins(dip2px(ctx, (3 + (x * 36))), dip2px(ctx, (3 + (y * 36))), 0, 0);
			
			var image = new android.widget.ImageView(ctx);
			image.setLayoutParams(imageParams);
			image.setImageBitmap(getItemBitmap(ctx, 0, 0, true));
			image.setOnClickListener(new android.view.View.OnClickListener() {
				onClick: function(v){
					onClickItem(v);
				}
			});
			layout.addView(image);
			
			var textParams = new android.widget.RelativeLayout.LayoutParams(dip2px(ctx, 15), dip2px(ctx, 15));
			textParams.setMargins(dip2px(ctx, (18 + (x * 36))), dip2px(ctx, (20 + (y * 36))), 0, 0);
			
			var text = new android.widget.TextView(ctx);
			text.setTextColor(android.graphics.Color.BLACK);
			text.setGravity(android.view.Gravity.RIGHT);
			text.setLayoutParams(textParams);
			text.setTextSize(dip2px(ctx, 8));
			layout.addView(text);
			
			invItem[slot] = [image, text, 0, 0, 0, -1];
			
			slot++;
		}
	}
	
	var imageParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
	imageParams.setMargins(dip2px(ctx, 190), dip2px(ctx, 40), 0, 0);
	
	var image = new android.widget.ImageView(ctx);
	image.setLayoutParams(imageParams);
	image.setImageBitmap(getItemBitmap(ctx, 0, 0, true));
	image.setOnClickListener(new android.view.View.OnClickListener() {
		onClick: function(v){
			onClickCraftingItem(v);
		}
	});
	layout.addView(image);
	
	var textParams = new android.widget.RelativeLayout.LayoutParams(dip2px(ctx, 15), dip2px(ctx, 15));
	textParams.setMargins(dip2px(ctx, 210), dip2px(ctx, 60), 0, 0);
	
	var text = new android.widget.TextView(ctx);
	text.setTextColor(android.graphics.Color.BLACK);
	text.setGravity(android.view.Gravity.RIGHT);
	text.setLayoutParams(textParams);
	text.setTextSize(dip2px(ctx, 9));
	layout.addView(text);
	
	invItem[45] = [image, text, 0, 0, 0, -1];
	
	return layout;
}

function drawSelectItems(ctx){
	var params = new android.widget.RelativeLayout.LayoutParams(dip2px(ctx, 74), dip2px(ctx, 144));
	var layout = new android.widget.RelativeLayout(ctx);
	params.setMargins((ctx.getWindowManager().getDefaultDisplay().getWidth() / 2) - dip2px(ctx, 67), (ctx.getWindowManager().getDefaultDisplay().getHeight() / 2) - dip2px(ctx, 72), 0, 0);
	layout.setLayoutParams(params);
	
	var pickupParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, dip2px(ctx, 35));
	pickupParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_TOP);
	
	var pickup = new android.widget.Button(ctx);
	pickup.setLayoutParams(pickupParams);
	pickup.setTextSize(dip2px(ctx, 11));
	pickup.setText("Pickup");
	pickup.setOnClickListener(new android.view.View.OnClickListener() {
		onClick: function(v){
			onPickupItem(v);
		}
	});
	layout.addView(pickup);
	
	var textParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, dip2px(ctx, 35));
	textParams.addRule(android.widget.RelativeLayout.ALIGN_PARENT_BOTTOM);
	
	var text = new android.widget.EditText(ctx);
	text.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
	text.setGravity(android.view.Gravity.CENTER);
	text.setLayoutParams(textParams);
	text.setTextSize(dip2px(ctx, 11));
	text.setText("1");
	layout.addView(text);
	
	textCount = text;	
	
	return layout;
}

function onClickItem(item){
	for(var slot in invItem){
		invItem[slot][0].setBackgroundColor(android.graphics.Color.TRANSPARENT);
		if(invItem[slot][0] == item) selectslot = slot;
	}
	item.setBackgroundColor(android.graphics.Color.rgb(100, 100, 100));
}

function onPickupItem(btn){
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	if(selectslot == -1) return;
	
	if(pickuped == false){
		if(invItem[selectslot][2] == 0 || textCount.getText() == 0) return;
		
		var count = (invItem[selectslot][4] - textCount.getText());
		if(count < 0) count = 0;
		
		textCount.setEnabled(false);
		pickupItem = [invItem[selectslot][2], invItem[selectslot][3], (invItem[selectslot][4] - count), invItem[selectslot][5]];
		var c = Player.getInventorySlotCount(pickupItem[3]) - invItem[selectslot][4];
		setSlot(ctx, selectslot, (count == 0 ? 0 : invItem[selectslot][2]), (count == 0 ? 0 : invItem[selectslot][3]), count, (count == 0 ? -1 : invItem[selectslot][5]));
		btn.setText("Drop!");
		pickuped = true;
		
		if(selectslot >= 9) {
			Player.clearInventorySlot(pickupItem[3]);
			if((count + c) != 0) addItemInventory(pickupItem[0], count + c, pickupItem[1]);
		}
		
		if(selectslot < 9) checkCrafting(ctx);
	}else{
		if(invItem[selectslot][2] != 0 && pickupItem[0] != invItem[selectslot][2]) return;
		if((invItem[selectslot][4] + pickupItem[2]) > 64) return;
		
		textCount.setEnabled(true);
		setSlot(ctx, selectslot, pickupItem[0], pickupItem[1], (invItem[selectslot][4] + pickupItem[2]), pickupItem[3]);
		if(selectslot >= 9) addItemInventory(pickupItem[0], pickupItem[2], pickupItem[1]);
		pickupItem = [];
		btn.setText("Pickup");
		pickuped = false;
		
		if(selectslot < 9) checkCrafting(ctx);
	}
}

function onClickCraftingItem(item){
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	if(invItem[45][2] == 0) return;
	
	for(var slot = 9; slot <= 44; slot++){
		if(invItem[slot][2] == 0 || (invItem[slot][2] == invItem[45][2] && invItem[slot][3] == invItem[45][3] && (invItem[slot][4] + invItem[45][4]) <= 64)){
			addItemInventory(invItem[45][2], invItem[45][4], invItem[45][3]);
			setSlot(ctx, slot, invItem[45][2], invItem[45][3], (invItem[slot][4] + invItem[45][4]), slot);
			setSlot(ctx, 45, 0, 0, 0, -1);
			for(var i = 0; i < 9; i++) setSlot(ctx, i, 0, 0, 0, -1);
			return;
		}
	}
	Level.dropItem(craftingtablePos[0], craftingtablePos[1], craftingtablePos[2], 0, invItem[45][2], invItem[45][3], invItem[45][4]);
}

function setSlot(ctx, slot, id, damage, count, realslot){
	ctx.runOnUiThread(new java.lang.Runnable({
		run: function() {
			try{
				invItem[slot][0].setImageBitmap(getItemBitmap(ctx, id, damage, (id <= 255 ? true : false)));
				invItem[slot][1].setText(id == 0 ? "" : count.toString());
				invItem[slot] = [invItem[slot][0], invItem[slot][1], id, damage, count, realslot];
			}catch(err){
				print("Error:\n"+err);
			}
		}
	}));
}

function getItemBitmap(ctx, id, damage, isblock){
	for(var i in dynamicData){
		if(dynamicData[i] == id){
			damage = 0;
			break;
		}
	}
	
	var file = java.io.File(sdcardPath+"/games/com.mojang/minecraftResource/"+(isblock == true ? "blocks/" : "items/")+id+"-"+damage+".png");
	if(file.exists() == false) return false;
	
	var bitmap = android.graphics.BitmapFactory.decodeFile(file.getPath());
	return android.graphics.Bitmap.createScaledBitmap(bitmap, dip2px(ctx, 28), dip2px(ctx, 28), false);
}

function getImage(ctx, filename, width, height, filter){
	var bitmap = android.graphics.BitmapFactory.decodeFile(sdcardPath+"/games/com.mojang/minecraftResource/"+filename);
	return android.graphics.Bitmap.createScaledBitmap(bitmap, (width == false ? bitmap.getWidth() : dip2px(ctx, width)), (height == false ? bitmap.getHeight() : dip2px(ctx, height)), filter);
}

function getRecipes(){
	try{
		var file = new java.io.FileInputStream(sdcardPath+"/games/com.mojang/minecraftResource/xml/workbench.xml");
		
		var parserCreator = org.xmlpull.v1.XmlPullParserFactory.newInstance();
		parser = parserCreator.newPullParser();
		parser.setInput(file, "utf-8");
		
		var items = [];
		var parserEvent = parser.getEventType();
		var isRecipeTag = false, tagName = "";
		while (parserEvent != org.xmlpull.v1.XmlPullParser.END_DOCUMENT){
			if(parserEvent == org.xmlpull.v1.XmlPullParser.START_TAG){
				tagName = parser.getName();
				if(tagName == "recipe"){
					isRecipeTag = true;
					
					for(var y = 0; y < 4; y++){
						items[y] = [];
						for(var x = 0; x < 3; x++){
							items[y][x] = 0;
						}
					}
				}
				if(tagName == "result"){
					items[3][1] = parseInt(parser.getAttributeValue(null, "damage")) || 0;
					items[3][2] = parseInt(parser.getAttributeValue(null, "count")) || 1;
				}
			}else if(parserEvent == org.xmlpull.v1.XmlPullParser.TEXT){
				if(isRecipeTag){
					var value = parseInt(parser.getText());
					if(tagName == "item11") items[0][0] = value;
					else if(tagName == "item12") items[0][1] = value;
					else if(tagName == "item13") items[0][2] = value;
					else if(tagName == "item21") items[1][0] = value;
					else if(tagName == "item22") items[1][1] = value;
					else if(tagName == "item23") items[1][2] = value;
					else if(tagName == "item31") items[2][0] = value;
					else if(tagName == "item32") items[2][1] = value;
					else if(tagName == "item33") items[2][2] = value;
					else if(tagName == "result") items[3][0] = value;
				}
			}else if(parserEvent == org.xmlpull.v1.XmlPullParser.END_TAG){
				tagName = parser.getName();
				if(tagName == "recipe"){
					isRecipeTag = false;
					recipes[recipes.length] = items;
					items = [];
				}
				tagName = "";
			}
			parserEvent = parser.next();
		}
	}catch(err){
		print("Error:\n"+err);
	}
}