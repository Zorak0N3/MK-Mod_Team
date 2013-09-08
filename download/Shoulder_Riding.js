var lastent = null;

function attackHook(attacker, victim)
{
  if(getCarriedItem() == 280)
	{
		if(lastent == null) lastent = attacker;
		
		rideAnimal(victim, lastent);
		lastent = victim;
		
		preventDefault();
	}
}