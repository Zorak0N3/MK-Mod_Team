check = 1;
function modTick()
{
    if (check == 0)
    {
        return;
    }
    var a = getPlayerX();
    var b = getPlayerY();
    var c = getPlayerZ();

    if (b + 1)
    {
        explode(a, b - 2, c, 0.5);
    }
}
