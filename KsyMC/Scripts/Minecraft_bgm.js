var mPlayer = null;
var nowplaying = null;
var jukebox = [];
var saveTick = -1;

var sounds = ["http://hydra-media.cursecdn.com/minecraft.gamepedia.com/5/50/Minecraft.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/a/aa/Clark.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/0/00/Sweden.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/c/c7/Subwoofer_lullaby.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/2/20/Living_mice.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/c/c7/Haggstrom.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/2/2e/Danny.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/9/90/Key.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/9/97/Oxygene.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/9/9a/Dry_hands.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/c/ca/Wet_hands.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/9/99/Mice_on_venus.ogg"];

var caves_sounds = ["http://hydra-media.cursecdn.com/minecraft.gamepedia.com/d/d3/Cave1.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/6/6d/Cave2.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/c/c7/Cave3.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/d/da/Cave4.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/3/3d/Cave5.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/4/42/Cave6.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/9/92/Cave7.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/f/f4/Cave8.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/f/ff/Cave9.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/0/08/Cave10.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/3/32/Cave11.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/d/d7/Cave12.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/6/6f/Cave13.ogg"];

var jukebox_sounds = ["http://hydra-media.cursecdn.com/minecraft.gamepedia.com/8/85/13.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/5/5c/Cat.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/7/71/Blocks.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/a/a9/Chirp.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/8/8d/Far.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/b/b8/Mall.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/9/9f/Mellohi.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/e/e7/Stal.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/b/b1/Strad.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/0/04/Ward.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/f/f9/11.ogg",
 "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/4/48/Where_are_we_now.ogg"];

var jukebox_name = ["13", "cat", "blocks", "chirp", "far", "mall", "mellohi", "stal", "strad", "ward", "11", "wait"];

function newLevel(){
	mPlayer = new android.media.MediaPlayer();
	
	ModPE.setItem(422, 15, 0, "13 Disc");
	ModPE.setItem(423, 15, 1, "cat Disc");
	ModPE.setItem(424, 15, 2, "blocks Disc");
	ModPE.setItem(425, 15, 3, "chirp Disc");
	ModPE.setItem(426, 15, 4, "far Disc");
	ModPE.setItem(427, 15, 5, "mall Disc");
	ModPE.setItem(428, 15, 6, "mellohi Disc");
	ModPE.setItem(429, 15, 7, "stal Disc");
	ModPE.setItem(430, 15, 8, "strad Disc");
	ModPE.setItem(431, 15, 9, "ward Disc");
	ModPE.setItem(432, 15, 10, "11 Disc");
	ModPE.setItem(433, 15, 11, "wait Disc");
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
}

function modTick(){
	if(nowplaying != null){
		saveTick--;
		if(saveTick == 0){
			var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();
			ctx.runOnUiThread(new java.lang.Runnable({
				run: function() {
					nowplaying.dismiss();
					nowplaying = null;
				}
			}));
		}
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

function playSound(path){
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