/** @param {NS} ns **/
export async function main(ns) {
	// $ run timetoskill.js --type [hack] --target 6000
	const data = ns.flags([
        ['type', 'hack'],
		['target', '6000']
  	])

	ns.tprint("Wait 60 seconds, gathering data...")
    let player = await ns.getPlayer()
    let before = 0
    let after = 0

    if (data['type'] == "hack") {
	    before = player.exp.hacking
        ns.tprint("Player hacking speed multiplier: " + player.mults.hacking)
    }
	await ns.sleep(60000)

    player = await ns.getPlayer()
    if (data['type'] == "hack") {
	    after = player.exp.hacking
    }
    

    let delta = (after - before)
    let target = ns.formulas.skills.calculateExp(data['target'], player.mults.hacking)
    ns.tprint("Running at approximately " + delta + " / minute for " + data['type'])
	let timeminutes = (target-after) / (after - before)
	ns.tprint("It will take " + timeminutes + " minutes to meet the target for " + data['type'])
}