var selection1 = [0, 0, 0];
var selection2 = [0, 0, 0];
var select_first = false;
var select_second = false;
var clipboard = new Array();

var addToInventory = [false, 0, 0, 0];

var openWindow = null;
var mainWindow = null;
var optionWindow = null;
var setWindow = null;
var replaceWindow = null;
var xyzWindow = null;

var option_mode = 0;
var option_xyz = false;

var T_X = null;
var T_Y = null;
var T_Z = null;

function dip2px(ctx, dips){
 return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}

function newLevel(){
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({
		run: function() {
			try{
				var layout = new android.widget.LinearLayout(ctx);
				
				var B_we = new android.widget.Button(ctx);
				B_we.setText("WE GUI");
				B_we.setOnClickListener(new android.view.View.OnClickListener() {
					onClick: function(v){
						menu_Main();
					}
				});
				layout.addView(B_we);
				
				openWindow = new android.widget.PopupWindow(layout, dip2px(ctx, 85), dip2px(ctx, 35));
				openWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.BOTTOM | android.view.Gravity.RIGHT, 0, 0);
			}catch(err){
				print("에러 발생!\n"+err);
			}
		}
	}));
}

function leaveGame(){
	option_xyz = false;
	option_mode = 0;
	T_X = null;
	T_Y = null;
	T_Z = null;
	
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({
		run: function() {
			if(openWindow != null){
				openWindow.dismiss();
				openWindow = null;
			}
			if(mainWindow != null){
				mainWindow.dismiss();
				mainWindow = null;
			}
			if(optionWindow != null){
				optionWindow.dismiss();
				optionWindow = null;
			}
			if(setWindow != null){
				setWindow.dismiss();
				setWindow = null;
			}
			if(replaceWindow != null){
				replaceWindow.dismiss();
				replaceWindow = null;
			}
			if(xyzWindow != null){
				xyzWindow.dismiss();
				xyzWindow = null;
			}
		}
	}));
}

function modTick(){
	if(option_xyz){
		var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
		ctx.runOnUiThread(new java.lang.Runnable({
			run: function() {
				T_X.setText("X: "+Math.round(getPlayerX()*100)/100);
				T_Y.setText("Y: "+((Math.round(getPlayerY()*100)/100) - 1)+" (feet pos, "+Math.round(getPlayerY()*100)/100+" eyes pos)");
				T_Z.setText("Z: "+Math.round(getPlayerZ()*100)/100);
			}
		}));
	}
	if(addToInventory[0]){
		addToInventory[0] = false;
		addItemInventory(addToInventory[1], addToInventory[2], addToInventory[3]);
	}
}

function show_XYZ(show){
	if(show){
		var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
		try{
			var layout = new android.widget.LinearLayout(ctx);
			layout.setOrientation(1);
			
			T_X = new android.widget.TextView(ctx);
			T_X.setTextSize(20);
			T_X.setTextColor(android.graphics.Color.BLACK);
			layout.addView(T_X);
			
			T_Y = new android.widget.TextView(ctx);
			T_Y.setTextSize(20);
			T_Y.setTextColor(android.graphics.Color.BLACK);
			layout.addView(T_Y);
			
			T_Z = new android.widget.TextView(ctx);
			T_Z.setTextSize(20);
			T_Z.setTextColor(android.graphics.Color.BLACK);
			layout.addView(T_Z);
			
			xyzWindow = new android.widget.PopupWindow(layout, ctx.getWindowManager().getDefaultDisplay().getWidth(), dip2px(ctx, 100));
			xyzWindow.setTouchable(false);
			xyzWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.LEFT, 0, 0);
		}catch(err){
			print("에러 발생!\n"+err);
		}
	}else if(xyzWindow != null){
		xyzWindow.dismiss();
		xyzWindow = null;
	}
}

function menu_Main(){
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	try{
		var layout = new android.widget.LinearLayout(ctx);
		layout.setOrientation(1);
		
		var T_title = new android.widget.TextView(ctx);
		T_title.setGravity(android.view.Gravity.CENTER);
		T_title.setText("WorldEdit GUI V1.5\nBy KsyMC");
		T_title.setTextSize(20);
		layout.addView(T_title);
		
		var tlayout = new android.widget.LinearLayout(ctx);
		var params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
		
		var B_set = new android.widget.Button(ctx);
		B_set.setText("Set");
		B_set.setOnClickListener(new android.view.View.OnClickListener() {
			onClick: function(v){
				menu_Set();
			}
		});
		tlayout.addView(B_set);
		
		var B_replace = new android.widget.Button(ctx);
		B_replace.setLayoutParams(params);
		B_replace.setText("Replace");
		B_replace.setOnClickListener(new android.view.View.OnClickListener() {
			onClick: function(v){
				menu_Replace();
			}
		});
		tlayout.addView(B_replace);
		layout.addView(tlayout);
		
		var B_get = new android.widget.Button(ctx);
		B_get.setText("Get tool");
		B_get.setOnClickListener(new android.view.View.OnClickListener() {
			onClick: function(v){
				clientMessage("월드에딧 선택 도구를 지급하였습니다.");
				addToInventory = [true, 267, 1, 0];
			}
		});
		layout.addView(B_get);
		
		var B_setting = new android.widget.Button(ctx);
		B_setting.setText("Option");
		B_setting.setOnClickListener(new android.view.View.OnClickListener() {
			onClick: function(v){
				menu_Setting();
			}
		});
		layout.addView(B_setting);
		
		var B_exit = new android.widget.Button(ctx);
		B_exit.setText("Exit");
		B_exit.setOnClickListener(new android.view.View.OnClickListener() {
			onClick: function(v){
				mainWindow.dismiss();
				mainWindow = null;
			}
		});
		layout.addView(B_exit);
		
		mainWindow = new android.widget.PopupWindow(layout, ctx.getWindowManager().getDefaultDisplay().getWidth()/4, ctx.getWindowManager().getDefaultDisplay().getHeight(), true);
		mainWindow.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.GRAY));
		mainWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.RIGHT, 0, 0);
	}catch(err){
		print("에러 발생!\n"+err);
	}
}

function menu_Set(){
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	try{
		var params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
		var layout = new android.widget.LinearLayout(ctx);
		layout.setOrientation(1);
		
		var T_title = new android.widget.TextView(ctx);
		T_title.setGravity(android.view.Gravity.CENTER);
		T_title.setText("- Set -");
		T_title.setTextSize(20);
		layout.addView(T_title);
		
		if(option_mode == 1){
			var x1tlayout = new android.widget.LinearLayout(ctx);
			
			var T_desc_1x = new android.widget.TextView(ctx);
			T_desc_1x.setText("X:");
			T_desc_1x.setTextSize(15);
			x1tlayout.addView(T_desc_1x);
			
			var E_x1 = new android.widget.EditText(ctx);
			E_x1.setLayoutParams(params);
			E_x1.setHint("X");
			E_x1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
			x1tlayout.addView(E_x1);
			
			layout.addView(x1tlayout);
			
			var y1tlayout = new android.widget.LinearLayout(ctx);
			
			var T_desc_1y = new android.widget.TextView(ctx);
			T_desc_1y.setText("Y:");
			T_desc_1y.setTextSize(15);
			y1tlayout.addView(T_desc_1y);
			
			var E_y1 = new android.widget.EditText(ctx);
			E_y1.setLayoutParams(params);
			E_y1.setHint("Y");
			E_y1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
			y1tlayout.addView(E_y1);
			
			layout.addView(y1tlayout);
			
			var z1tlayout = new android.widget.LinearLayout(ctx);
			
			var T_desc_1z = new android.widget.TextView(ctx);
			T_desc_1z.setText("Z:");
			T_desc_1z.setTextSize(15);
			z1tlayout.addView(T_desc_1z);
			
			var E_z1 = new android.widget.EditText(ctx);
			E_z1.setLayoutParams(params);
			E_z1.setHint("Z");
			E_z1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
			z1tlayout.addView(E_z1);
			
			layout.addView(z1tlayout);
			
			////
			
			var x2tlayout = new android.widget.LinearLayout(ctx);
			
			var T_desc_2x = new android.widget.TextView(ctx);
			T_desc_2x.setText("Width (X):");
			T_desc_2x.setTextSize(15);
			x2tlayout.addView(T_desc_2x);
			
			var E_x2 = new android.widget.EditText(ctx);
			E_x2.setLayoutParams(params);
			E_x2.setHint("X");
			E_x2.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
			x2tlayout.addView(E_x2);
			
			layout.addView(x2tlayout);
			
			var y2tlayout = new android.widget.LinearLayout(ctx);
			
			var T_desc_2y = new android.widget.TextView(ctx);
			T_desc_2y.setText("Height (Y):");
			T_desc_2y.setTextSize(15);
			y2tlayout.addView(T_desc_2y);
			
			var E_y2 = new android.widget.EditText(ctx);
			E_y2.setLayoutParams(params);
			E_y2.setHint("Y");
			E_y2.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
			y2tlayout.addView(E_y2);
			
			layout.addView(y2tlayout);
			
			var z2tlayout = new android.widget.LinearLayout(ctx);
			
			var T_desc_3z = new android.widget.TextView(ctx);
			T_desc_3z.setText("Length (Z):");
			T_desc_3z.setTextSize(15);
			z2tlayout.addView(T_desc_3z);
			
			var E_z2 = new android.widget.EditText(ctx);
			E_z2.setLayoutParams(params);
			E_z2.setHint("Z");
			E_z2.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
			z2tlayout.addView(E_z2);
			
			layout.addView(z2tlayout);
		}
		
		var T_desc_id = new android.widget.TextView(ctx);
		T_desc_id.setText("Block id / damage:");
		T_desc_id.setTextSize(15);
		layout.addView(T_desc_id);
		
		var tlayout = new android.widget.LinearLayout(ctx);
		
		var E_id = new android.widget.EditText(ctx);
		E_id.setHint("Block ID");
		E_id.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
		tlayout.addView(E_id);
		
		var E_damage = new android.widget.EditText(ctx);
		E_damage.setHint("Damage");
		E_damage.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
		tlayout.addView(E_damage);
		
		layout.addView(tlayout);
		
		var B_set = new android.widget.Button(ctx);
		B_set.setText("Set!");
		B_set.setOnClickListener(new android.view.View.OnClickListener() {
			onClick: function(v){
				if((option_mode == 0 && (!select_first || !select_second)) || (option_mode == 1 && (E_x1.getText().toString() == "" || E_y1.getText().toString() == "" || E_z1.getText().toString() == "" || E_x2.getText().toString() == "" || E_y2.getText().toString() == "" || E_z2.getText().toString() == ""))){
					clientMessage("먼저 지역을 선택하거나 좌표를 입력해 주세요.");
				}else if(E_id.getText().toString() == "" || E_damage.getText().toString() == ""){
					clientMessage("블럭의 아이디 또는 데미지를 입력해 주세요.");
				}else{
					if(option_mode == 1){
						selection1 = [parseInt(E_x1.getText()), parseInt(E_y1.getText()), parseInt(E_z1.getText())];
						selection2 = [parseInt(E_x2.getText()), parseInt(E_y2.getText()), parseInt(E_z2.getText())];
					}
					clientMessage(W_set(parseInt(E_id.getText()), parseInt(E_damage.getText())) + "개의 블럭이 수정되었습니다.");
				}
			}
		});
		layout.addView(B_set);
		
		var B_exit = new android.widget.Button(ctx);
		B_exit.setText("Back");
		B_exit.setOnClickListener(new android.view.View.OnClickListener() {
			onClick: function(v){
				setWindow.dismiss();
				setWindow = null;
			}
		});
		layout.addView(B_exit);
		
		var mlayout = new android.widget.RelativeLayout(ctx);
		var scrollview = new android.widget.ScrollView(ctx);
		var svParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT);
		
		scrollview.setLayoutParams(svParams);
		scrollview.addView(layout);
		mlayout.addView(scrollview);
		
		setWindow = new android.widget.PopupWindow(mlayout, ctx.getWindowManager().getDefaultDisplay().getWidth()/4, ctx.getWindowManager().getDefaultDisplay().getHeight(), true);
		setWindow.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.GRAY));
		setWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.RIGHT, 0, 0);
	}catch(err){
		print("에러 발생!\n"+err);
	}
}

function menu_Replace(){
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	try{
		var params = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.WRAP_CONTENT);
		var layout = new android.widget.LinearLayout(ctx);
		layout.setOrientation(1);
		
		var T_title = new android.widget.TextView(ctx);
		T_title.setGravity(android.view.Gravity.CENTER);
		T_title.setText("- Replace -");
		T_title.setTextSize(20);
		layout.addView(T_title);
		
		if(option_mode == 1){
			var x1tlayout = new android.widget.LinearLayout(ctx);
			
			var T_desc_1x = new android.widget.TextView(ctx);
			T_desc_1x.setText("X:");
			T_desc_1x.setTextSize(15);
			x1tlayout.addView(T_desc_1x);
			
			var E_x1 = new android.widget.EditText(ctx);
			E_x1.setLayoutParams(params);
			E_x1.setHint("X");
			E_x1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
			x1tlayout.addView(E_x1);
			
			layout.addView(x1tlayout);
			
			var y1tlayout = new android.widget.LinearLayout(ctx);
			
			var T_desc_1y = new android.widget.TextView(ctx);
			T_desc_1y.setText("Y:");
			T_desc_1y.setTextSize(15);
			y1tlayout.addView(T_desc_1y);
			
			var E_y1 = new android.widget.EditText(ctx);
			E_y1.setLayoutParams(params);
			E_y1.setHint("Y");
			E_y1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
			y1tlayout.addView(E_y1);
			
			layout.addView(y1tlayout);
			
			var z1tlayout = new android.widget.LinearLayout(ctx);
			
			var T_desc_1z = new android.widget.TextView(ctx);
			T_desc_1z.setText("Z:");
			T_desc_1z.setTextSize(15);
			z1tlayout.addView(T_desc_1z);
			
			var E_z1 = new android.widget.EditText(ctx);
			E_z1.setLayoutParams(params);
			E_z1.setHint("Z");
			E_z1.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
			z1tlayout.addView(E_z1);
			
			layout.addView(z1tlayout);
			
			////
			
			var x2tlayout = new android.widget.LinearLayout(ctx);
			
			var T_desc_2x = new android.widget.TextView(ctx);
			T_desc_2x.setText("Width (X):");
			T_desc_2x.setTextSize(15);
			x2tlayout.addView(T_desc_2x);
			
			var E_x2 = new android.widget.EditText(ctx);
			E_x2.setLayoutParams(params);
			E_x2.setHint("X");
			E_x2.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
			x2tlayout.addView(E_x2);
			
			layout.addView(x2tlayout);
			
			var y2tlayout = new android.widget.LinearLayout(ctx);
			
			var T_desc_2y = new android.widget.TextView(ctx);
			T_desc_2y.setText("Height (Y):");
			T_desc_2y.setTextSize(15);
			y2tlayout.addView(T_desc_2y);
			
			var E_y2 = new android.widget.EditText(ctx);
			E_y2.setLayoutParams(params);
			E_y2.setHint("Y");
			E_y2.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
			y2tlayout.addView(E_y2);
			
			layout.addView(y2tlayout);
			
			var z2tlayout = new android.widget.LinearLayout(ctx);
			
			var T_desc_3z = new android.widget.TextView(ctx);
			T_desc_3z.setText("Length (Z):");
			T_desc_3z.setTextSize(15);
			z2tlayout.addView(T_desc_3z);
			
			var E_z2 = new android.widget.EditText(ctx);
			E_z2.setLayoutParams(params);
			E_z2.setHint("Z");
			E_z2.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
			z2tlayout.addView(E_z2);
			
			layout.addView(z2tlayout);
		}
		
		var T_desc_id = new android.widget.TextView(ctx);
		T_desc_id.setText("Block id / damage:");
		T_desc_id.setTextSize(15);
		layout.addView(T_desc_id);
		
		var tlayout = new android.widget.LinearLayout(ctx);
		
		var E_id = new android.widget.EditText(ctx);
		E_id.setHint("Block ID");
		E_id.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
		tlayout.addView(E_id);
		
		var E_damage = new android.widget.EditText(ctx);
		E_damage.setLayoutParams(params);
		E_damage.setHint("Damage");
		E_damage.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
		tlayout.addView(E_damage);
		
		layout.addView(tlayout);
		
		var T_desc_replace = new android.widget.TextView(ctx);
		T_desc_replace.setText("Replace with:");
		T_desc_replace.setTextSize(15);
		layout.addView(T_desc_replace);
		
		var rtlayout = new android.widget.LinearLayout(ctx);
		
		var E_replaceId = new android.widget.EditText(ctx);
		E_replaceId.setHint("Block ID");
		E_replaceId.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
		rtlayout.addView(E_replaceId);
		
		var E_replaceDamage = new android.widget.EditText(ctx);
		E_replaceDamage.setLayoutParams(params);
		E_replaceDamage.setHint("Damage");
		E_replaceDamage.setInputType(android.text.InputType.TYPE_CLASS_NUMBER);
		rtlayout.addView(E_replaceDamage);
		
		layout.addView(rtlayout);
		
		var B_set = new android.widget.Button(ctx);
		B_set.setText("Replace!");
		B_set.setOnClickListener(new android.view.View.OnClickListener() {
			onClick: function(v){
				if((option_mode == 0 && (!select_first || !select_second)) || (option_mode == 1 && (E_x1.getText().toString() == "" || E_y1.getText().toString() == "" || E_z1.getText().toString() == "" || E_x2.getText().toString() == "" || E_y2.getText().toString() == "" || E_z2.getText().toString() == ""))){
					clientMessage("먼저 지역을 선택하거나 좌표를 입력해 주세요.");
				}else if(E_id.getText().toString() == "" || E_damage.getText().toString() == "" || E_replaceId.getText().toString() == "" || E_replaceDamage.getText().toString() == ""){
					clientMessage("블럭의 아이디 또는 데미지를 입력해 주세요.");
				}else{
					if(option_mode == 1){
						selection1 = [parseInt(E_x1.getText()), parseInt(E_y1.getText()), parseInt(E_z1.getText())];
						selection2 = [parseInt(E_x2.getText()), parseInt(E_y2.getText()), parseInt(E_z2.getText())];
					}
					clientMessage(W_replace(parseInt(E_id.getText()), parseInt(E_damage.getText()), parseInt(E_replaceId.getText()), parseInt(E_replaceDamage.getText())) + "개의 블럭이 수정되었습니다.");
				}
			}
		});
		layout.addView(B_set);
		
		var B_exit = new android.widget.Button(ctx);
		B_exit.setText("Back");
		B_exit.setOnClickListener(new android.view.View.OnClickListener() {
			onClick: function(v){
				replaceWindow.dismiss();
				replaceWindow = null;
			}
		});
		layout.addView(B_exit);
		
		var mlayout = new android.widget.RelativeLayout(ctx);
		var scrollview = new android.widget.ScrollView(ctx);
		var svParams = new android.widget.RelativeLayout.LayoutParams(android.widget.RelativeLayout.LayoutParams.MATCH_PARENT, android.widget.RelativeLayout.LayoutParams.MATCH_PARENT);
		
		scrollview.setLayoutParams(svParams);
		scrollview.addView(layout);
		mlayout.addView(scrollview);
		
		replaceWindow = new android.widget.PopupWindow(mlayout, ctx.getWindowManager().getDefaultDisplay().getWidth()/4, ctx.getWindowManager().getDefaultDisplay().getHeight(), true);
		replaceWindow.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.GRAY));
		replaceWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.RIGHT, 0, 0);
	}catch(err){
		print("에러 발생!\n"+err);
	}
}

function menu_Setting(){
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	try{
		var layout = new android.widget.LinearLayout(ctx);
		layout.setOrientation(1);
		
		var T_title = new android.widget.TextView(ctx);
		T_title.setGravity(android.view.Gravity.CENTER);
		T_title.setText("- Option -");
		T_title.setTextSize(20);
		layout.addView(T_title);
		
		var C_xyz = new android.widget.CheckBox(ctx);
		C_xyz.setText("View coords");
		C_xyz.setChecked(option_xyz);
		C_xyz.setOnCheckedChangeListener(new android.widget.CompoundButton.OnCheckedChangeListener() {
			onCheckedChanged: function(v, isChecked){
				option_xyz = isChecked;
				show_XYZ(isChecked);
			}
		});
		layout.addView(C_xyz);
		
		var T_desc = new android.widget.TextView(ctx);
		T_desc.setText("Mode:");
		T_desc.setTextSize(15);
		layout.addView(T_desc);
		
		var B_mode = new android.widget.Button(ctx);
		B_mode.setText(option_mode == 0 ? "Select" : "Coords");
		B_mode.setOnClickListener(new android.view.View.OnClickListener() {
			onClick: function(v){
				if(option_mode == 1){
					B_mode.setText("Select");
					clientMessage("선택 모드로 변경 되었습니다.");
					option_mode = 0;
				}else{
					B_mode.setText("Coords");
					clientMessage("좌표 입력 모드로 변경 되었습니다.");
					option_mode = 1;
				}
			}
		});
		layout.addView(B_mode);
		
		var B_exit = new android.widget.Button(ctx);
		B_exit.setText("Back");
		B_exit.setOnClickListener(new android.view.View.OnClickListener() {
			onClick: function(v){
				optionWindow.dismiss();
				optionWindow = null;
			}
		});
		layout.addView(B_exit);
		
		optionWindow = new android.widget.PopupWindow(layout, ctx.getWindowManager().getDefaultDisplay().getWidth()/4, ctx.getWindowManager().getDefaultDisplay().getHeight(), true);
		optionWindow.setBackgroundDrawable(new android.graphics.drawable.ColorDrawable(android.graphics.Color.GRAY));
		optionWindow.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.TOP | android.view.Gravity.RIGHT, 0, 0);
	}catch(err){
		print("에러 발생!\n"+err);
	}
}

function useItem(x, y, z, item, block){
	if(item == 267){
		if(!select_first){
			select_first = true;
			selection1[0] = Math.round(x);
			selection1[1] = Math.round(y);
			selection1[2] = Math.round(z);
			
			clientMessage("첫번째 선택 완료 (X : " + selection1[0] + " Y : " + selection1[1] + " Z : " + selection1[2] + ")");
		}else if(!select_second){
			select_second = true;
			selection2[0] = Math.round(x);
			selection2[1] = Math.round(y);
			selection2[2] = Math.round(z);
			
			clientMessage("두번째 선택 완료 (X : " + selection2[0] + " Y : " + selection2[1] + " Z : " + selection2[2] + ")");
		}else{
			select_first = false;
			select_second = false;
			
			clientMessage("선택 지점이 초기화 되었습니다. 다시 선택해 주세요.");
		}
	}
}

function W_set(block, damage){
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
				setTile(x, y, z, block, damage);
				count++;
			}
		}
	}
	
	return count;
}

function W_replace(block1, damage1, block2, damage2){
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
				var id = getTile(x, y, z);
				var damage = Level.getData(x, y, z);
				if(id == block1 && damage == damage1){
					setTile(x, y, z, block2, damage2);
					count++;
				}
			}
		}
	}
	
	return count;
}