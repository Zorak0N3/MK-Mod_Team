//절대로 수정하고 재배포하지 마세요
//만약 수정하고 재배포한게 발견되면
//그뒤로 스크립트 안올릴거임
var value = 0;
var value2 = 0;
var value3 = 0;
var value4 = 0;
var a = 0;
var b =
function newLevel()
{
   print("곱등이 계산기 1.0.0 By 곱등연가");
   print("무단수정이나 배포를 금합니다.");
}

function procCmd(cmd)
{
    var Data = cmd.split(" ");
    if (Data[0] == "빼기")
        {
   a = Data[1]
   b = Data[2]
   value = a - b;
             
   print ("답은 " + value + "입니다.");

   }
    if (Data[0] == "더하기")
        {
   a = parseInt(Data[1])
   b = parseInt(Data[2])
   value2 = a += b
             
   print ("답은 " + value2 + "입니다.");

   }

    if (Data[0] == "곱하기")
        {
   a = Data[1]
   b = Data[2]
   value3 = a * b
             
   print ("답은 " + value3 + "입니다.");
    }

    if (Data[0] == "나누기")
        {
   a = Data[1]
   b = Data[2]
   value4 = a / b
             
   print ("답은 " + value4 + "입니다.");

   }
}
