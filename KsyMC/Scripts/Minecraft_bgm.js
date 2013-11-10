var mPlayer = null;
var nowplaying = null;
var jukebox = [];

var sdcardPath = android.os.Environment.getExternalStorageDirectory().getAbsolutePath();

var sounds =
["Minecraft.ogg",
 "Clark.ogg",
 "Sweden.ogg",
 "Subwoofer_lullaby.ogg",
 "Living_mice.ogg",
 "Haggstrom.ogg",
 "Danny.ogg",
 "Key.ogg",
 "Oxygene.ogg",
 "Dry_hands.ogg",
 "Wet_hands.ogg",
 "Mice_on_venus.ogg"];

var jukebox_sounds =
["13.ogg",
 "cat.ogg",
 "blocks.ogg",
 "chirp.ogg",
 "far.ogg",
 "mall.ogg",
 "mellohi.ogg",
 "stal.ogg",
 "strad.ogg",
 "ward.ogg",
 "11.ogg",
 "wait.ogg"];

var jukebox_name = ["13", "cat", "blocks", "chirp", "far", "mall", "mellohi", "stal", "strad", "ward", "11", "wait"];

function newLevel(){
	// 파일 체크
	var file = java.io.File(sdcardPath+"/games/com.mojang/minecraftResource/PC_BGM/");
	if(file.exists() == false){
		clientMessage("[에러] 리소스 폴더가 존재하지 않습니다.");
	}
	
	mPlayer = new android.media.MediaPlayer();
	
	ModPE.setItem(422, 15, 0, "13 disc");
	ModPE.setItem(423, 15, 1, "cat disc");
	ModPE.setItem(424, 15, 2, "blocks disc");
	ModPE.setItem(425, 15, 3, "chirp disc");
	ModPE.setItem(426, 15, 4, "far disc");
	ModPE.setItem(427, 15, 5, "mall disc");
	ModPE.setItem(428, 15, 6, "mellohi disc");
	ModPE.setItem(429, 15, 7, "stal disc");
	ModPE.setItem(430, 15, 8, "strad disc");
	ModPE.setItem(431, 15, 9, "ward disc");
	ModPE.setItem(432, 15, 10, "11 disc");
	ModPE.setItem(433, 15, 11, "wait disc");
}

function useItem(x, y, z, item, block, side, itemdata, blockdata){
	if(block == 87){
		if(jukebox[x+","+y+","+z] === undefined) jukebox[x+","+y+","+z] = false;
		
		if(jukebox[x+","+y+","+z] != false){
			if(mPlayer.isPlaying()) mPlayer.pause();
			Level.dropItem(x, y + 1, z, 0, jukebox[x+","+y+","+z], 1, 0);
			jukebox[x+","+y+","+z] = false;
		}else if(item >= 422 && item <= 433){
			playSound(jukebox_sounds[item - 422]);
			addItemInventory(item, -1, 0);
			jukebox[x+","+y+","+z] = item;
			
			showNowPlaying(jukebox_name[item - 422]);
		}
	}
}

function leaveGame(){
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({
		run: function() {
			if(nowplaying != null){
				nowplaying.dismiss();
				nowplaying = null;
			}
			if(mPlayer != null){
				mPlayer.release();
				mPlayer = null;
			}
		}
	}));
	
	jukebox = [];
}

function modTick(){
	if(nowplaying != null){
		var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
		ctx.runOnUiThread(new java.lang.Runnable({
			run: function() {
				nowplaying.dismiss();
				nowplaying = null;
			}
		}));
	}
	
	var time = Level.getTime();
	var random = parseInt(Math.random() * 100) + 1;
	time %= 14400;
	
	if(mPlayer == null || mPlayer.isPlaying() || random != 100) return;
	
	if(time >= 7200 && time <= 8280) playSound(sounds[0]);
	else if(time >= 4000 && time <= 5000) playSound(getRandomSound(0));
}

function showNowPlaying(title){
	var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
	ctx.runOnUiThread(new java.lang.Runnable({
		run: function() {
			try{
				var layout = new android.widget.LinearLayout(ctx);
				layout.setOrientation(1);
				
				var text = new android.widget.TextView(ctx);
				text.setGravity(android.view.Gravity.CENTER);
				text.setText("Now Playing: C418 - "+title);
				text.setTextSize(23);
				layout.addView(text);
				
				nowplaying = new android.widget.PopupWindow(layout, ctx.getWindowManager().getDefaultDisplay().getWidth(), dip2px(ctx, 50));
				nowplaying.setTouchable(false);
				nowplaying.showAtLocation(ctx.getWindow().getDecorView(), android.view.Gravity.CENTER | android.view.Gravity.BOTTOM, 0, 50);
				
				saveTick = 80;
			}catch(err){
				print("에러 발생!\n"+err);
			}
		}
	}));
}

function getRandomSound(type){
	if(type == 0) return sounds[parseInt(Math.random() * 12)];
	if(type == 1) return caves_sounds[parseInt(Math.random() * 14)];
	if(type == 2) return jukebox_sounds[parseInt(Math.random() * 12)];
}

function playSound(sndname){
	var path = sdcardPath + "/games/com.mojang/minecraftResource/PC_BGM/" + sndname;
	try{
		if(mPlayer.isPlaying()) mPlayer.pause();
		
		mPlayer.reset();
		mPlayer.setDataSource(path);
		mPlayer.prepare();
		mPlayer.start();
	}catch(err){
		print("에러 발생!\n"+err);
	}
}

function dip2px(ctx, dips){
 return Math.ceil(dips * ctx.getResources().getDisplayMetrics().density);
}