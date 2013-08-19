var scriptStart = false; // ��ũ��Ʈ ���� ����
var tetrisStart = false; // ��Ʈ���� ���� ����
 
var TICK = 0; // ���� ƽ
 
var tetrisTimer = false; // Ÿ�̸� �۵�����
var tetrisTimerTime = -1; // Ÿ�̸� ���� �ð�
var blockLiving = false; // ���� ��� �ִ���
var blockCurrent = null;
 
// �� ����
var blockType1 = new Array(4);
var blockType2 = new Array(4);
var blockType3 = new Array(4);
var blockType4 = new Array(4);
var blockType5 = new Array(4);
var blockType6 = new Array(4);
var blockType7 = new Array(4);
 
// -------------------------------------------------- //
// �̺�Ʈ
// -------------------------------------------------- //
 
function newLevel() // ���� ����
{
	var hint = parseInt(Math.random() * 5);
	
	if(hint == 1) print("��Ʈ���� : Ȱ�� �����մϴ�.");
	else if(hint == 2) print("��Ʈ���� : ��Ʈ���� ��带 ��̱���!");
	else if(hint == 3) print("��Ʈ���� : ��Ʈ������ �����ϼ̴ٸ� �׽��ϴ�.");
	else if(hint == 4) print("��Ʈ���� : ����� ���ϴ�.");
	else print("��Ʈ���� ��忡 ���� ���� ȯ���մϴ�.");
}
 
function leaveGame() // ���� ����
{
	if(scriptStart)
	{
		print("��Ʈ���� ����!");
		scriptStart = false;
		tetrisTimer = false;
		tetrisTimerTime = -1;
	}
}
 
function modTick() // ƽ
{
	if(!scriptStart) return;
	if(!tetrisStart) return;
	
	TICK++;
	
	var hand = getCarriedItem();
	
	if(hand == 16)
	{
		blockLeft()
	}
	else if(hand == 15)
	{
		blockRight()
	}
	else if(hand == 14)
	{
		blockDown();
	}
	
	if(tetrisTimerTime >= 0)
	{
		numbers(parseInt(tetrisTimerTime / 20), 135, 80, 120);
		tetrisTimerTime--;
		
		if(tetrisTimerTime == 0)
		{
			tetrisTimerTime = -1;
			tetrisTimer = false;
			print("�ð��� ��� �Ҹ�Ǿ����ϴ�!");
			
			gameOver();
		}
	}
	
	if(!blockLiving)
	{
		blockLiving = true;
		blockCurrent = blockCreate(124, 120);
	}
}
 
function useItem(x, y, z, itemId, blockId, side) // ������ ���
{
	if(blockId == 41 && scriptStart) // ��Ʈ���� ����
	{
		print("��Ʈ���� ����!!!");
		tetrisStart = true;
		tetrisTimerTime = 1500 * 20;
	}
	if(blockId == 42 && tetrisStart) // ��Ʈ���� ����
	{
		print("��Ʈ������ �����߽��ϴ�!");
		tetrisStart = false;
	}
	
	if(itemId == 261) // ��ũ��Ʈ ����
	{
		if(!scriptStart)
		{
			print("��Ʈ���� ����! ���� ���� �����ϼ���!");
			scriptStart = true;
			setPosition(getPlayerEnt(), 128, 80, 128);
			
			tetrisBase(15, 122, 80, 120);
			
			blockType1[0] = [0,0,0,0];
			blockType1[1] = [0,1,1,0];
			blockType1[2] = [0,1,1,0];
			blockType1[3] = [0,0,0,0];
			
			blockType2[0] = [0,0,0,0];
			blockType2[1] = [1,1,1,1];
			blockType2[2] = [0,0,0,0];
			blockType2[3] = [0,0,0,0];
			
			blockType3[0] = [0,0,0,0];
			blockType3[1] = [0,0,1,1];
			blockType3[2] = [0,1,1,0];
			blockType3[3] = [0,0,0,0];
			
			blockType4[0] = [0,0,0,0];
			blockType4[1] = [0,1,1,0];
			blockType4[2] = [0,0,1,1];
			blockType4[3] = [0,0,0,0];
			
			blockType5[0] = [0,0,0,0];
			blockType5[1] = [0,1,1,1];
			blockType5[2] = [0,1,0,0];
			blockType5[3] = [0,0,0,0];
			
			blockType6[0] = [0,0,0,0];
			blockType6[1] = [0,1,1,1];
			blockType6[2] = [0,0,0,1];
			blockType6[3] = [0,0,0,0];
			
			blockType7[0] = [0,0,0,0];
			blockType7[1] = [0,1,1,1];
			blockType7[2] = [0,0,1,0];
			blockType7[3] = [0,0,0,0];
		}
		else
		{
			print("��Ʈ���� ��带 �����ϼ̽��ϴ�.");
			scriptStart = false;
			numbers(0, 135, 80, 120);
			strings("TIMER", 135, 86, 120);
		}
	}
	
	if(scriptStart) preventDefault();
}
 
// -------------------------------------------------- //
// ��Ʈ����
// -------------------------------------------------- //
 
function tetrisBase(height, x, y, z) // �⺻ Ʋ ����
{
	var tetrisCode = new Array(height);
	
	tetrisCode[0] = [7,7,7,7,7,7,7,7,7,7];
	
	for(var i = 1; i < height; i++)
	{
		tetrisCode[i] = [7,0,0,0,0,0,0,0,0,7];
	}
	
	tetrisCode[height - 1] = [7,7,7,7,7,7,7,7,7,7];
	
	for(var i = 0; i < height; i++)
	{
		setTile(x     , y + i, z, tetrisCode[i][0]);
		setTile(x + 1, y + i, z, tetrisCode[i][1]);
		setTile(x + 2, y + i, z, tetrisCode[i][2]);
		setTile(x + 3, y + i, z, tetrisCode[i][3]);
		setTile(x + 4, y + i, z, tetrisCode[i][4]);
		setTile(x + 5, y + i, z, tetrisCode[i][5]);
		setTile(x + 6, y + i, z, tetrisCode[i][6]);
		setTile(x + 7, y + i, z, tetrisCode[i][7]);
		setTile(x + 8, y + i, z, tetrisCode[i][8]);
		setTile(x + 9, y + i, z, tetrisCode[i][9]);
	}
	
	setTile(122, 78, 120, 41);
	setTile(123, 78, 120, 42);
	
	setTile(127, 78, 128, 7);
	setTile(128, 78, 128, 7);
	setTile(129, 78, 128, 7);
	
	strings("TIMER", 135, 86, 120);
}
 
function blockCreate(x, z) // �� ����
{
	var rand = parseInt(Math.random() * 6);
	
	if(rand == 0) var block = blockType1;
	if(rand == 1) var block = blockType2;
	if(rand == 2) var block = blockType3;
	if(rand == 3) var block = blockType4;
	if(rand == 4) var block = blockType5;
	if(rand == 5) var block = blockType6;
	if(rand == 6) var block = blockType7;
	
	for(var i = 0; i < 4; i++)
	{
		setTile(x, 90 + i, z, block[i][0]);
		setTile(x, 90 + i, z, block[i][1]);
		setTile(x, 90 + i, z, block[i][2]);
		setTile(x, 90 + i, z, block[i][3]);
	}
	
	return;
}
 
function blockMove(type) // �� ������
{
	
	if(type == "left")
	{
		
	}
	else if(type == "right")
	{
		
	}
	else if(type == "down")
	{
		
	}
}
 
// -------------------------------------------------- //
// �� ���÷���
// -------------------------------------------------- //
 
function strings(string, x, y, z) // ���ڿ� ���÷��� ������ ǥ��
{
	var len = 0;
	for(var i = 0; i < string.length; i++)
	{
		createStringDisplay(string[i], x + len, y, z);
		len += 6;
	}
}
 
function createStringDisplay(string, x, y, z) // ���ڿ� ���÷��� ǥ��
{
	var stringCode = new Array(5);
	
	if(string == "A")
	{
		stringCode[4] = [0,0,1,0,0];
		stringCode[3] = [0,1,0,1,0];
		stringCode[2] = [0,1,0,1,0];
		stringCode[1] = [1,1,1,1,1];
		stringCode[0] = [1,0,0,0,1];
	}
	
	if(string == "B")
	{		
		stringCode[4] = [1,1,1,0,0];
		stringCode[3] = [1,0,0,1,0];
		stringCode[2] = [1,1,1,1,1];
		stringCode[1] = [1,0,0,0,1];
		stringCode[0] = [1,1,1,1,0];
	}
	
	if(string == "C")
	{
		stringCode[4] = [0,1,1,1,1];
		stringCode[3] = [1,0,0,0,0];
		stringCode[2] = [1,0,0,0,0];
		stringCode[1] = [1,0,0,0,0];
		stringCode[0] = [0,1,1,1,1];
	}
	
	if(string == "D")
	{
		stringCode[4] = [1,1,1,1,0];
		stringCode[3] = [1,0,0,0,1];
		stringCode[2] = [1,0,0,0,1];
		stringCode[1] = [1,0,0,0,1];
		stringCode[0] = [1,1,1,1,0];
	}
	
	if(string == "E")
	{
		stringCode[4] = [1,1,1,1,1];
		stringCode[3] = [1,0,0,0,0];
		stringCode[2] = [1,1,1,1,1];
		stringCode[1] = [1,0,0,0,0];
		stringCode[0] = [1,1,1,1,1];
	}
	
	if(string == "F")
	{
		stringCode[4] = [1,1,1,1,1];
		stringCode[3] = [1,0,0,0,0];
		stringCode[2] = [1,1,1,1,1];
		stringCode[1] = [1,0,0,0,0];
		stringCode[0] = [1,0,0,0,0];
	}
	
	if(string == "G")
	{
		stringCode[4] = [0,1,1,1,1];
		stringCode[3] = [1,0,0,0,0];
		stringCode[2] = [1,0,0,1,1];
		stringCode[1] = [1,0,0,0,1];
		stringCode[0] = [0,1,1,1,1];
	}
	
	if(string == "H")
	{
		stringCode[4] = [1,0,0,0,1];
		stringCode[3] = [1,0,0,0,1];
		stringCode[2] = [1,1,1,1,1];
		stringCode[1] = [1,0,0,0,1];
		stringCode[0] = [1,0,0,0,1];
	}
	
	if(string == "I")
	{
		stringCode[4] = [0,1,1,1,0];
		stringCode[3] = [0,0,1,0,0];
		stringCode[2] = [0,0,1,0,0];
		stringCode[1] = [0,0,1,0,0];
		stringCode[0] = [0,1,1,1,0];
	}
	
	if(string == "J")
	{
		stringCode[4] = [0,0,0,0,1];
		stringCode[3] = [0,0,0,0,1];
		stringCode[2] = [0,0,0,0,1];
		stringCode[1] = [1,0,0,0,1];
		stringCode[0] = [0,1,1,1,1];
	}
	
	if(string == "K")
	{
		stringCode[4] = [1,0,0,1,0];
		stringCode[3] = [1,0,1,0,0];
		stringCode[2] = [1,1,0,0,0];
		stringCode[1] = [1,0,1,1,1];
		stringCode[0] = [1,0,0,0,1];
	}
	
	if(string == "L")
	{
		stringCode[4] = [1,0,0,0,0];
		stringCode[3] = [1,0,0,0,0];
		stringCode[2] = [1,0,0,0,0];
		stringCode[1] = [1,0,0,0,0];
		stringCode[0] = [1,1,1,1,1];
	}
	
	if(string == "M")
	{
		stringCode[4] = [1,0,0,0,1];
		stringCode[3] = [1,1,0,1,1];
		stringCode[2] = [1,0,1,0,1];
		stringCode[1] = [1,0,0,0,1];
		stringCode[0] = [1,0,0,0,1];
	}
	
	if(string == "N")
	{
		stringCode[4] = [1,0,0,0,1];
		stringCode[3] = [1,1,0,0,1];
		stringCode[2] = [1,0,1,0,1];
		stringCode[1] = [1,0,0,1,1];
		stringCode[0] = [1,0,0,0,1];
	}
	
	if(string == "O")
	{
		stringCode[4] = [0,1,1,1,0];
		stringCode[3] = [1,0,0,0,1];
		stringCode[2] = [1,0,0,0,1];
		stringCode[1] = [1,0,0,0,1];
		stringCode[0] = [0,1,1,1,0];
	}
	
	if(string == "P")
	{
		stringCode[4] = [1,1,1,1,0];
		stringCode[3] = [1,0,0,0,1];
		stringCode[2] = [1,1,1,1,1];
		stringCode[1] = [1,0,0,0,0];
		stringCode[0] = [1,0,0,0,0];
	}
	
	if(string == "Q")
	{
		stringCode[4] = [0,1,1,1,0];
		stringCode[3] = [1,0,0,0,1];
		stringCode[2] = [1,0,0,0,1];
		stringCode[1] = [1,0,0,1,0];
		stringCode[0] = [0,1,1,0,1];
	}
	
	if(string == "R")
	{
		stringCode[4] = [1,1,1,1,0];
		stringCode[3] = [1,0,0,0,1];
		stringCode[2] = [1,1,1,1,1];
		stringCode[1] = [1,0,0,1,0];
		stringCode[0] = [1,0,0,0,1];
	}
	
	if(string == "S")
	{
		stringCode[4] = [0,1,1,1,1];
		stringCode[3] = [1,0,0,0,0];
		stringCode[2] = [1,1,1,1,1];
		stringCode[1] = [0,0,0,0,1];
		stringCode[0] = [1,1,1,1,0];
	}
	
	if(string == "T")
	{
		stringCode[4] = [1,1,1,1,1];
		stringCode[3] = [0,0,1,0,0];
		stringCode[2] = [0,0,1,0,0];
		stringCode[1] = [0,0,1,0,0];
		stringCode[0] = [0,0,1,0,0];
	}
	
	if(string == "U")
	{
		stringCode[4] = [1,0,0,0,1];
		stringCode[3] = [1,0,0,0,1];
		stringCode[2] = [1,0,0,0,1];
		stringCode[1] = [1,0,0,0,1];
		stringCode[0] = [0,1,1,1,1];
	}
	
	if(string == "V")
	{
		stringCode[4] = [1,0,0,0,1];
		stringCode[3] = [1,0,0,0,1];
		stringCode[2] = [0,1,0,1,0];
		stringCode[1] = [0,1,0,1,0];
		stringCode[0] = [0,0,1,0,0];
	}
	
	if(string == "W")
	{
		stringCode[4] = [1,0,0,0,1];
		stringCode[3] = [1,0,0,0,1];
		stringCode[2] = [1,0,1,0,1];
		stringCode[1] = [1,0,1,0,1];
		stringCode[0] = [0,1,0,1,0];
	}
	
	if(string == "X")
	{
		stringCode[4] = [1,0,0,0,1];
		stringCode[3] = [0,1,0,1,0];
		stringCode[2] = [0,0,1,0,0];
		stringCode[1] = [0,1,0,1,0];
		stringCode[0] = [1,0,0,0,1];
	}
	
	if(string == "Y")
	{
		stringCode[4] = [1,0,0,0,1];
		stringCode[3] = [0,1,0,1,0];
		stringCode[2] = [0,0,1,0,0];
		stringCode[1] = [0,0,1,0,0];
		stringCode[0] = [0,0,1,0,0];
	}
	
	if(string == "Z")
	{
		stringCode[4] = [1,1,1,1,1];
		stringCode[3] = [0,0,0,1,0];
		stringCode[2] = [0,0,1,0,0];
		stringCode[1] = [0,1,0,0,0];
		stringCode[0] = [1,1,1,1,1];
	}
	
	if(string == " ")
	{
		stringCode[4] = [0,0,0,0,0];
		stringCode[3] = [0,0,0,0,0];
		stringCode[2] = [0,0,0,0,0];
		stringCode[1] = [0,0,0,0,0];
		stringCode[0] = [0,0,0,0,0];
	}
	
	if(string == ".")
	{
		stringCode[4] = [0,0,0,0,0];
		stringCode[3] = [0,0,0,0,0];
		stringCode[2] = [0,0,0,0,0];
		stringCode[1] = [0,0,0,0,0];
		stringCode[0] = [0,1,0,0,0];
	}
	
	if(string == "!")
	{
		stringCode[4] = [0,1,1,0,0];
		stringCode[3] = [0,1,1,0,0];
		stringCode[2] = [0,1,1,0,0];
		stringCode[1] = [0,0,0,0,0];
		stringCode[0] = [0,1,1,0,0];
	}
	
	for(var i = 0; i < 5; i++)
	{
		setTile(x     , y + i, z, stringCode[i][0]);
		setTile(x + 1, y + i, z, stringCode[i][1]);
		setTile(x + 2, y + i, z, stringCode[i][2]);
		setTile(x + 3, y + i, z, stringCode[i][3]);
		setTile(x + 4, y + i, z, stringCode[i][4]);
	}
}
 
function numbers(num, x, y, z) // ���� ���÷��� ������ ǥ��
{
	var units = num.toString().split("");
	num = new Array(3);
	
	if(units.length == 1)
	{
		num[0] = 0;
		num[1] = 0;
		num[2] = 0;
		num[3] = units[0];
	}
	
	if(units.length == 2)
	{
		num[0] = 0;
		num[1] = 0;
		num[2] = units[0];
		num[3] = units[1];
	}
	
	if(units.length == 3)
	{
		num[0] = 0;
		num[1] = units[0];
		num[2] = units[1];
		num[3] = units[2];
	}
	
	if(units.length == 4) num = units;
	
	createNumberDisplay(num[0], x, y, z);
	createNumberDisplay(num[1], x + 4, y, z);
	createNumberDisplay(num[2], x + 8, y, z);
	createNumberDisplay(num[3], x + 12, y, z);
}
 
function createNumberDisplay(num, x, y, z) // ���� ���÷��� ǥ��
{
	var numberCode = new Array(5);
		
	if(num == 0)
	{
		numberCode[4] = [1,1,1];
		numberCode[3] = [1,0,1];
		numberCode[2] = [1,0,1];
		numberCode[1] = [1,0,1];
		numberCode[0] = [1,1,1];
	}
	
	if(num == 1)
	{		
		numberCode[4] = [1,1,0];
		numberCode[3] = [0,1,0];
		numberCode[2] = [0,1,0];
		numberCode[1] = [0,1,0];
		numberCode[0] = [1,1,1];
	}
	
	if(num == 2)
	{
		numberCode[4] = [1,1,1];
		numberCode[3] = [0,0,1];
		numberCode[2] = [1,1,1];
		numberCode[1] = [1,0,0];
		numberCode[0] = [1,1,1];
	}
	
	if(num == 3)
	{
		numberCode[4] = [1,1,1];
		numberCode[3] = [0,0,1];
		numberCode[2] = [1,1,1];
		numberCode[1] = [0,0,1];
		numberCode[0] = [1,1,1];
	}
	
	if(num == 4)
	{
		numberCode[4] = [1,0,1];
		numberCode[3] = [1,0,1];
		numberCode[2] = [1,1,1];
		numberCode[1] = [0,0,1];
		numberCode[0] = [0,0,1];
	}
	
	if(num == 5)
	{
		numberCode[4] = [1,1,1];
		numberCode[3] = [1,0,0];
		numberCode[2] = [1,1,1];
		numberCode[1] = [0,0,1];
		numberCode[0] = [1,1,1];
	}
	
	if(num == 6)
	{
		numberCode[4] = [1,1,1];
		numberCode[3] = [1,0,0];
		numberCode[2] = [1,1,1];
		numberCode[1] = [1,0,1];
		numberCode[0] = [1,1,1];
	}
	
	if(num == 7)
	{
		numberCode[4] = [1,1,1];
		numberCode[3] = [0,0,1];
		numberCode[2] = [0,0,1];
		numberCode[1] = [0,0,1];
		numberCode[0] = [0,0,1];
	}
	
	if(num == 8)
	{
		numberCode[4] = [1,1,1];
		numberCode[3] = [1,0,1];
		numberCode[2] = [1,1,1];
		numberCode[1] = [1,0,1];
		numberCode[0] = [1,1,1];
	}
	
	if(num == 9)
	{
		numberCode[4] = [1,1,1];
		numberCode[3] = [1,0,1];
		numberCode[2] = [1,1,1];
		numberCode[1] = [0,0,1];
		numberCode[0] = [1,1,1];
	}
	
	for(var i = 0; i < 5; i++)
	{
		setTile(x     , y + i, z, numberCode[i][0]);
		setTile(x + 1, y + i, z, numberCode[i][1]);
		setTile(x + 2, y + i, z, numberCode[i][2]);
	}
}