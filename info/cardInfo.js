
function info(params) {
	params = params.toLowerCase();
	if (main[params] == undefined) return "no card found.";
	var card = main[params];
	return card.name + ": mana cost: " + card.mana + ", arrows: " + card.arrows + ", description: " + card.description;
}

var main = {
	"desert ghost" : new Card("Desert Ghost" ,1, 3, "Step Out: Lose 1 mana and and make an extra step."),
	"river master" : new Card("River Master" ,0 , 1, "Step In: Deal damage for all the mana you have. Your mana becomes 0."),
	"shields man" : new Card("Shields Man", 2, 2, "Persist: Reduce every damage done to you by 2."),
	"sapling" : new Card("Sapling", 1, 3, "Step In: Heal 2 hp."),
	"shape shifter" : new Card("Shape Shifter", 1, 2, "Step Out: Copy the last attack of the opponent. If they hit themselves so would you."),
	"spear fighter" : new Card("Spear fighter", 3, 3, "Persist: Reduce every damage done to you by 1. Every time the opponent steps deal 1 damage."),
	"black wasp" : new Card("Black Wasp", 2, 3, "Step In: Deal 1 damage for every time 0 damage was dealt in this game."),
	"grail of fury" : new Card("Grail Of Fury", 5, 2, "Step In: The hp of both players halfs (rounding up)."),
	"meditate" : new Card("Meditate", 1, 3, "Step In: Gain 1 mana."),
	"smoke demon" : new Card("Smoke Demon", 4, 1, "Step In: Deal 3 damage. Both players roll the dice."),
	"soldier" : new Card("Soldier", 1, 3, "Step In: Deal 1 damage."),
	"satans flower" : new Card("Satans Flower", 8, 2, "Step In: Eats the enemy card and places a Satans Seed in its place."),
	"satans seed" : new Card("Satans Seed", 1, 3, "Step In: Deal 1 damage to yourself."),
	"leaf wizard" : new Card("Leaf Wizard", 2, 2, "Step In: Disable the enemy card until it steps again."),
	"dancing cactus" : new Card("Dancing Cactus", 3, 1, "Persist: Every time the opponent attacks deal 1 damage. Step Out: Make an extra step for each attack."),
	"forest guardian" : new Card("Forest Guardian", 6, 1, "Step Out: Heal up to 10 hp. Deal damage for the amount you healed."),
	"bone crasher" : new Card("Bone Crasher", 4, 2, "Step In: Deal damage for the amount of hp you are missing."),
	"lone wonderer" : new Card("Lone Wonderer", 5, 2, "Step In: The mana of both players halfs (rounding up). Step Out: The mana of both players doubles."),
	"boxer" : new Card("Boxer", 2, 3, "Step Out: Deal 2 damage to yourself and 3 damage to the opponent. Take 2 step with the opponents dice."),
	"blood soldier" : new Card("Blood Soldier", 1, 3, "Step In: Deal 1 damage to yourself and 2 to the opponent."),
	"body snatcher" : new Card("Body Snatcher", 3, 3, "Step In: Swap this card with the enemy one."),
	"bamboo forest" : new Card("Bamboo Forest", 5, 1, "Step In: Increace your max hp by 2. Step Out: heal 2 hp."),
	"oasis" : new Card("Oasis", 2, 2, "Step In: Decreace the mana cost of every neighboring card by 1."),
	"hammer warrior" : new Card("Hammer Warrior", 4, 2, "Step In: Deal 2 damage. Persist: Reduce every damage done to you by 2."),
	"gatherer" : new Card("Gatherer", 3, 1, "Persist: Gain 1 mana for every damage and heal."),
	"telepathy" : new Card("Telepathy", 1, 3, "Step In: Swap your mana with the opponents."),
	"sourcephy" : new Card("Sourcephy", 4, 2, "Step In: Lose 2 mana. Step Out: Deal 8 damage."),
	"custommods" : new Card("Custommods", 5, 1, "Persist: Reverse the target of each damage heal and mana change."),
	"axe warrior" : new Card("Axe Warrior", 5, 3, "Step In: Deal 5 damage."),
	
};

main.dg = main["desert ghost"];
main.rm = main["river master"];
main.sm = main["shields man"];
main.s = main["sapling"];
main.ssh = main["shape shifter"];
main.sf = main["spear fighter"];
main.bw = main["black wasp"];
main.m = main["meditate"];
main.sd = main["smoke demon"];
main.so = main["soldier"];
main.sf = main["satans flower"];
main.ss = main["satans seed"];
main.lw = main["leaf wizard"];
main.dc = main["dancing cactus"];
main.fg = main["forest guardian"];
main.bc = main["bone crasher"];
main.lwo = main["lone wonderer"];
main.b = main["boxer"];
main.bs = main["blood soldier"];
main.bsn = main["body snatcher"];
main.bf = main["bamboo forest"];
main.o = main["oasis"];
main.hw = main["hammer warrior"];
main.g = main["gatherer"];
main.t = main["telepathy"];
main.sp = main["sourcephy"];
main.c = main["custommods"];
main.aw = main["axe warrior"];


function Card (name, mana, arrows, description) {
	this.name = name;
	this.mana = mana;
	this.arrows = arrows;
	this.description = description;
}
exports.info = info;