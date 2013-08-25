// JIGSAW SCRIPT

var LetTheGameBegin = false;
var tick = 15;

function newLevel()
{
	print("넌 이 스크립트를 적용한 순간 나갈 수 없을거다");
	print("그리고 이 게임에서 승리하지 못한다면 넌 죽어버리고 말게다");
	print("게임은 간단해");
	print("지금부터 나오는 단어를 그대로 입력하는거야");
	print("어때 이 제안을 받아들이겠나");
	print("좋아 그렇다면 게임을 시작하지");
	LetTheGameBegin = true;
}

function modTick
{
	if( tick > 0 )
	{
		tick--;
	}
	else
	{
		tick = 15;
		
		if( LetTheGameBegin )
		{
			print("빠빡빢빣빤빥빦빧빨빩빪빫빬빭빮빯\n빠빡빢빣빤빥빦빧빨빩빪빫빬빭빮빯\n빠빡빢빣빤빥빦빧빨빩빪빫빬빭빮빯\n빠빡빢빣빤빥빦빧빨빩빪빫빬빭빮빯\n빠빡빢빣빤빥빦빧빨빩빪빫빬빭빮빯\n빠빡빢빣빤빥빦빧빨빩빪빫빬빭빮빯\n빠빡빢빣빤빥빦빧빨빩빪빫빬빭빮빯\n빠빡빢빣빤빥빦빧빨빩빪빫빬빭빮빯\n빠빡빢빣빤빥빦빧빨빩빪빫빬빭빮빯\n빠빡빢빣빤빥빦빧빨빩빪빫빬빭빮빯\n빠빡빢빣빤빥빦빧빨빩빪빫빬빭빮빯\n빠빡빢빣빤빥빦빧빨빩빪빫빬빭빮빯\n빠빡빢빣빤빥빦빧빨빩빪빫빬빭빮빯\n빠빡빢빣빤빥빦빧빨빩빪빫빬빭빮빯\n빠빡빢빣빤빥빦빧빨빩빪빫빬빭빮빯\n빠빡빢빣빤빥빦빧빨빩빪빫빬빭빮빯");
		}
	}
}

function procCmd( answer )
{
	if( answer == "빠빡빢빣빤빥빦빧빨빩빪빫빬빭빮빯" )
	{
		LetTheGameBegin = false;
	}
	else
	{
		setPosition( getPlayerEnt() , 0 , 0 , 0 );
	}

}
