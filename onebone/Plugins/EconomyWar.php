<?php

/*
__PocketMine Plugin__
name=EconomyWar
version=1.0.0
author=onebone
apiversion=9
class=EconomyWar
*/
/*
===== Read me ======
Editing the plugin is allowed but can't be shared by everyone except onebone. This software can be shared just in MCPE KOREA. If sharing this plugin in other community or somewhere, I won't care about your disadvantage.
All CopyRight reserved at naver café MCPE KOREA  resisdent onebone.
If you find an error, please send e-mail at 'jyc0410@naver.com' and log.

이 플러그인을 수정하는 것은 허용하나, 공유하는 것은 MCPE KOREA 회원 '원본' 외엔 금지 합니다. 이 플러그인은 오직 MCPE KOREA에서만 공유될 수 있으며, 다른 커뮤니티나 타 사이트에서 공유 적발 시 발생 하는 불이익은 책임지지 읺습니다.
해당 자료의 모든 저직권은 네이버 카페 MCPE KOREA의 회원인 '원본'에게 있습니다
오류 발견 시 이메일 'jyc0410@naver.com'으로 오류 화면 및 로그를 보내주십시오.


=====CHANGE LOG======
1.0.0
First Release

*/

class EconomyWar implements Plugin{
	private $api;
	public function __construct(ServerAPI $api, $server = false){
		$this->api = $api;
   $this->emptyid = 999999;
   $this->team = array();
//   $this->ban = array();
   $this->money = array();
	}
	public function init(){
   @mkdir("./plugins/EconomyWar");
   @mkdir("./plugins/EconomyWar/players");
   $this->api->addHandler("player.connect", array($this, "handle"));
   $this->api->addHandler("player.drop", array($this, "handle"));
   $this->api->addHandler("player.interact", array($this, "handle"));
   $this->api->event("server.close", array($this, "handle"));
   $wcmd = array(
     "missile",
     "flight",
   );
   $cmd = array(

   );
   foreach($wcmd as $w){
     $this->api->ban->cmdWhitelist($w);
   }
   foreach($cmd as $c => $h){
     $this->api->console->register($c, $h, array($this, "commandHandler"));
   }
	}
 public function __destruct(){}
 public function handle(&$data, $event){
    switch($event){
      case "player.connect":
  /*    if(in_array($data->ip, $this->ban)){
        $data->close("killed player");
        break;
      }*/
      $team = "default";
      if(strpos("united_", $data->username) == 0){
        $team = "united";
      }elseif(strpos("german_", $data->username) == 0){
        $team = "german";
      }else{
        $data->close("invalid team");
        break;
      }
  /*    $this->player[$data->ip] = new Config("./plugins/EconomyWar/players/".$data->ip.".yml", CONFIG_YAML, array(
        "team" => $team,
        "username" => $data->username,
      ));*/
      if($this->team[$data->ip] instanceof United and $team == "german" or $this->team[$data->ip] instanceof German and $team == "united"){
        $data->close("changed team");
        break;      
      }
      $team == "united" ? $this->team[$data->ip] = new United($data->username) : $this->team[$data->ip] = new German($data->username);
      break;
      case "player.interact":
      if($data["targetentity"] instanceof Player and $data["entity"] instanceof Player){
        if($this->team[$data["targetentity"]->ip] instanceof German and $this->team[$data["entity"]->ip] instanceof United or $this->team[$data["targetentity"]->ip] instanceof United and $this->team[$data["entity"]->ip] instanceof German){
         return true;
        }
        return false;
      }
      break;
      case "player.death":
      if($data["player"] instanceof Player and $data["cause"] instanceof Player){
   //     $this->ban[] = $data["player"]->ip;
        $data["player"]->close();
        $this->money[$this->team[$data["cause"]->ip]->getTeam()] += 5;
        $this->money[$this->team[$data["player"]->ip]->getTeam()] -= 5;
      }
      break;
    }
 }
 public function commandHandler($cmd, $param, $issuer, $NotInUse){
  $output = "[EconomyWar] ";
  switch($cmd){
   case "missile":
   $sub = array_shift($param);
   switch($sub){
    case "buy":
    $power = array_shift($param);
    $error = array_shift($param);
    if(trim($power) == "" or trim($error) == ""){
     $output .= "Usage : /missile buy <power> <error>";
      break 2;
    }
    foreach($this->confirm as $data){
     if($issuer->username == $data){
      $output .= "Please confirm before one.";
      break 3;
     }
    }
    $this->confirm[] = array(
     $power,
     $error,
     $issuer->username   
    );
    $output .= "Confirm buying? Price : ".$power * ((1000 - $error * 10))."\$.";
    break;
    case "confirm":
    foreach($this->confirm as $key => $data){
     if($issuer->username == $data[2]){
      $price = $power * (1000 - ($error * 10));
      if($this->money[$this->team[$issuer->ip]] < $price){
        $output .= "Your team does not have money for buy.";
        break;
      } 
      $this->missile[] = new Missile($this->team[$issuer->ip] instanceof United ? "United" : "German", $data[1], $data[0]);
      unset($this->confirm[$key]);
      $output .= "Has been confirmed. Bought missile for ".$power * (1000 - ($error * 10))."\$.";
      $this->money[$this->team[$issuer->ip]] -= $price;
     }
    }
    break;
   }
   break;
  }
  return $output;
 }
}
// Arms for the war

class Flight{
  private $team, $ammo, $fuel;
  public function __construct($team, $ammo = 0, $fuel = 1000){
    $this->team = $team;
    $this->ammo = (int) $ammo;
    $this->fuel = (int)$fuel;
    $this->server = ServerAPI::request();
    $this->isStopped = true;
    $this->broke = false;
  }
  public function init(){
    $this->api->schedule(20 * 60 * 5, array($this, "update"), array(), true);
  }
  public function update(){
    if($this->isStopped == false and $this->broke == false){
      --$this->fuel;
      if($this->fuel <= 0){
        $this->broke = true;
      }
      return true;
    }
    return false;
  }
  public function fallAttack($level, $x, $y, $z, $id){
    if($this->broke == true){
      return false;
    }
    if($this->ammo <= 0){ 
      return false;
    }
    if(!$level instanceof Level){
      $level = $this->server->api->level->get($level);
    }
    $y -= 2;
    $this->server->api->entity->add($level, ENTITY_OBJECT, OBJECT_ARROW, array("x" => $x, "y" => $y, "z" => $z));
    --$this->ammo;
    return true;
  }
  public function addAmmo($amount){
    return $this->ammo += $amount;
  }
}

class Missile{
  public function __construct($team, $error, $power){
    $this->error = (int)$error;
    $this->power = (int)$power;
    $this->team = $team;
  /*  $this->data = array(
      "x" => $enemyForce["x"],
      "y" => $enemyForce["y"],
      "z" => $enemyForce["z"],
      "level" => $enemyForce["level"],
    );*/
    $this->server = ServerAPI::request();
  }
 /* public function blast($x = $this->data["x"], $y = $this->data["y"], $z = $this->data["z"], $level = $this->server->api->level->get($this->data["level"])){
    if($this->server->api->level->get($level) == false){
      $level = $this->server->api->level->get($this->server->api->getProperty("level-name"));
    }
    $this->explosion($x, $y, $z, $level);
  }*/
  public function explosion($x, $y, $z, $level){
    $error = rand(0, $this->error);
    $x += $error;
    $z += $error;
    $power = $this->power;
    $x -= $power / 2;
    $y -= $power / 2;
    $z -= $power / 2;
  //  for($a = 0; $a < $power; $a++){
      for($b = $x; $b < $x + $power; $b++){
        for($c = $y; $c < $y + $power; $c++){
          for($d = $z; $d < $z + $power; $d++){
            $level->setBlock(new Position($x, $y, $z), BlockAPI::getItem(AIR));
          }
        }
      }
 //   }
  }
}


// Teams

class German{
  public function __construct($username){
    $this->username = $username;
    $this->server = ServerAPI::request();
  }
  public function getTeam(){
    return "german";
  }
}

class United{
  public function __construct($username){
    $this->username = $username;
    $this->server = ServerAPI::request();
  }
  public function getTeam(){
    return "united";
  }
}
