<?php
 
/*
__PocketMine Plugin__
name=AutoRestart
description=Auto restarts server
version=1.0.0
author=ns827@MCPEKOREA
class=AR
apiversion=8,9
*/

class AR implements Plugin{	


private $api;
private $minute = 1440;
    public function __construct(ServerAPI $api, $server = false){
        $this->api = $api;
    }
    public function __destruct(){

    }

 public function init(){
        $this->api->console->register("AutoRestart", "Just stop server automatically in every 24h!", array($this, "handleCommand"));

$this->api->schedule(1200, array($this, "minuteSchedule"), array(), true);
    }



public function minuteSchedule()
	{

$this->minute--;

		if($this->minute > 0 and $this->minute <= 5)
		{
			
			$this->api->chat->broadcast("[AutoRestart] ".($this->minute)."분 후에 서버가 중지됩니다..");
}

		if($this->minute == 0)
		{
			$this->api->chat->broadcast("[AutoRestart] 서버가 중지됩니다. 플러그인을 이용해주셔서 감사합니다!");
			$this->api->console->run("stop");
		}

}
	



}
