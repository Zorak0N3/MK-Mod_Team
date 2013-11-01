var sound = null;

var Snd_Minecraft = "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/5/50/Minecraft.ogg";
var Snd_Clark = "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/a/aa/Clark.ogg";
var Snd_Sweden = "http://hydra-media.cursecdn.com/minecraft.gamepedia.com/0/00/Sweden.ogg";

function newLevel(){
	sound = new android.media.MediaPlayer();
}

function leaveGame(){
	if(sound != null){
		sound.release();
		sound = null;
	}
}

function modTick(){
	var time = Level.getTime();
	
	while(time > 14400){
		time -= 14400;
	}
	
	if(sound.isPlaying()) return;
	
	if(time >= 7200) playSound(Snd_Minecraft);
}

function playSound(path){
	try{
		if(sound.isPlaying()) sound.pause();
		
		sound.reset();
		sound.setDataSource(path);
		sound.prepare();
		sound.start();
	}catch(err){
		print("에러 발생!\n"+err);
	}
}