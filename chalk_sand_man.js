/*
 * 제작자 : 초크(amato17) - MCPE Korea
 * 버젼 : 1.4
 */
 
function useItem(x,y,z,itemId,blockId)
{
  if(itemId == 280)
  {
    print("미나어롷!");
    setTile(x ,y + 3,z ,12); //가운데
    setTile(x + 1,y + 3,z ,12); //오른쪽
    setTile(x + 2,y + 3,z ,12); //더오른쪽
    setTile(x - 1,y + 3,z ,12); //왼쪽
    setTile(x - 2,y + 3,z ,12); //더왼쪽
    setTile(x ,y + 3,z + 1,12); //아래쪽
    setTile(x ,y + 3,z + 2,12); //더아래쪽
    setTile(x ,y + 3,z - 1,12); //위쪽
    setTile(x ,y + 3,z - 2,12); //더위쪽
    setTile(x - 1,y + 3,z - 1 ,12); //왼쪽위
    setTile(x - 1,y + 3,z + 1 ,12); //왼쪽아래
    setTile(x + 1,y + 3,z - 1 ,12); //오른쪽위
    setTile(x + 1,y + 3,z + 1 ,12); //오른쪽아래
    setTile(x + 3,y + 3,z ,12);
    setTile(x - 3,y + 3,z ,12);
    setTile(x ,y + 3,z + 3,12);
    setTile(x ,y + 3,z - 3,12);
    setTile(x - 2,y + 3,z + 1,12);
    setTile(x - 2,y + 3,z - 1,12);
    setTile(x + 2,y + 3,z + 1,12);
    setTile(x + 2,y + 3,z - 1,12);
    setTile(x - 1,y + 3,z + 2,12);
    setTile(x - 1,y + 3,z - 2,12);
    setTile(x + 1,y + 3,z + 2,12);
    setTile(x + 1,y + 3,z - 2,12);
    setTile(x ,y + 4,z ,12); //가운데
    setTile(x + 1,y + 4,z ,12); //오른쪽
    setTile(x + 2,y + 4,z ,12); //더오른쪽
    setTile(x - 1,y + 4,z ,12); //왼쪽
    setTile(x - 2,y + 4,z ,12); //더왼쪽
    setTile(x ,y + 4,z + 1,12); //아래쪽
    setTile(x ,y + 4,z + 2,12); //더아래쪽
    setTile(x ,y + 4,z - 1,12); //위쪽
    setTile(x ,y + 4,z - 2,12); //더위쪽
    setTile(x - 1,y + 4,z - 1 ,12); //왼쪽위
    setTile(x - 1,y + 4,z + 1 ,12); //왼쪽아래
    setTile(x + 1,y + 4,z - 1 ,12); //오른쪽위
    setTile(x + 1,y + 4,z + 1 ,12); //오른쪽아래
    setTile(x ,y + 5,z ,12); //2층 가운데
    setTile(x + 1,y + 5,z ,12); //2층 오른쪽
    setTile(x - 1,y + 5,z ,12); //2층 왼쪽
    setTile(x ,y + 5,z + 1,12); //2층 아래쪽
    setTile(x ,y + 5,z - 1,12); //2층 위쪽
    setTile(x ,y + 6,z ,12); //3층
  }
}
