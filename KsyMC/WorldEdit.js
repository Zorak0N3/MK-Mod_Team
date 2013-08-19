var selection1 = [0, 0, 0];
var selection2 = [0, 0, 0];
 
var first = false;
var second = false;
 
var set = false;
var replace = false;
 
var saveItemId = 0;
 
function useItem(x, y, z, item, block)
{
	if(item == 292)
	{
		saveItemId = block;
		print("아이템 ID : "+block);
		preventDefault();
	}
	
	if(item == 267)
	{
		if(!first)
		{
			first = true;
			selection1[0] = Math.round(x);
			selection1[1] = Math.round(y);
			selection1[2] = Math.round(z);
			print("첫번째 선택");
		}
		else if(!second)
		{
			second = true;
			selection2[0] = Math.round(x);
			selection2[1] = Math.round(y);
			selection2[2] = Math.round(z);
			print("두번째 선택");
		}
		else
		{
			first = false;
			second = false;
			print("초기화 완료");
		}
	}
	
	if(first && second)
	{
		if(item == 16) // set
		{
			if(set)
			{
				W_set(block);
				
				set = false;
			}
			else
			{
				clientMessage("Set : 선택한 지역을 "+block+"블럭으로 변경 하시겠습니까?");
				set = true;
			}
			preventDefault();
		}
		
		if(item == 15) // replace
		{
			if(replace)
			{
				W_replace(saveItemId, block);
				
				replace = false;
			}
			else
			{
				clientMessage("Replace : 선택한 지역에서 "+saveItemId+"블럭을 "+block+"블럭으로 변경 하시겠습니까?");
				replace = true;
			}
			preventDefault();
		}
	}
}
 
function W_set(block)
{
	var startX = _mathMin(selection1[0], selection2[0]);
	var endX = _mathMax(selection1[0], selection2[0]);
	var startY = _mathMin(selection1[1], selection2[1]);
	var endY = _mathMax(selection1[1], selection2[1]);
	var startZ = _mathMin(selection1[2], selection2[2]);
	var endZ = _mathMax(selection1[2], selection2[2]);
	
	for(var x = startX; x <= endX; x++)
	{
		for(var y = startY; y <= endY; y++)
		{
			for(var z = startZ; z <= endZ; z++)
			{
				setTile(x, y, z, block);
			}
		}
	}
}
 
function W_replace(block1, block2)
{
	var startX = _mathMin(selection1[0], selection2[0]);
	var endX = _mathMax(selection1[0], selection2[0]);
	var startY = _mathMin(selection1[1], selection2[1]);
	var endY = _mathMax(selection1[1], selection2[1]);
	var startZ = _mathMin(selection1[2], selection2[2]);
	var endZ = _mathMax(selection1[2], selection2[2]);
	
	for(var x = startX; x <= endX; x++)
	{
		for(var y = startY; y <= endY; y++)
		{
			for(var z = startZ; z <= endZ; z++)
			{
				var targetId = getTile(x, y, z);
				if(targetId == block1)
				{
					setTile(x, y, z, block2);
				}
			}
		}
	}
}
 
function _mathMin(first, second) {
	return first < second? first : second;
}
 
function _mathMax(first, second) {
	return first > second? first : second;
}