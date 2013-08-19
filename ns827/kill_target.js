//SCRIPT BY ns827@Mod Team
var hi = 0;
var hi2 = 0;
var target = "none";
function attackHook(attacker, victim)
{
	hi = getCarriedItem();
	if(hi = 37 || hi == 38) {
	preventDefault();
	target = victim;
	print("타깃을 지정하였습니다.");
}
}

function useItem(x,y,z,itemId,blockId)
{

	if(blockId == 13){
						hi2 = getCarriedItem();
		if(hi2 == 37 || hi2 == 38){
						preventDefault();
							setPosition(target,128,250,64);
							print("타겟을 낙사시켰습니다.");
						}
			}
	


}
