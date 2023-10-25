/** @param {NS} ns **/

export async function main(ns) {

    //https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.sleeve.md
    for (let i = 0; i < ns.sleeve.getNumSleeves(); i++) {
        ns.sleeve.setToCommitCrime(i, "Mug")
    }

    // while (ns.getPlayer().skills.agility < 100 ||
    //         ns.getPlayer().skills.charisma < 100 ||
    //         ns.getPlayer().skills.defense < 100 ||
    //         ns.getPlayer().skills.dexterity < 100 ||
    //         ns.getPlayer().skills.hacking < 100 ||
    //         ns.getPlayer().skills.strength < 100) {
    //     if (!ns.singularity.isBusy()) {
    //         ns.singularity.commitCrime("Heist")
    //     }
    //     await ns.sleep(1000)
    // }
    // ns.singularity.stopAction()

    ns.toast("Bladeburner started", "success", 6000)
    ns.exec("/scripts/bladeburner/bladeburner.js", "home", 1)

    for (let i = 0; i < ns.sleeve.getNumSleeves(); i++) {
        ns.sleeve.setToBladeburnerAction(i, "Field Analysis")
    }

    while (ns.exec("/scripts/hacktheplanet.js", "home", 1) == 0) {
		await ns.sleep(1000)
	}
    ns.toast("Hacking started", "success", 6000)

    while (true) {
        await ns.singularity.upgradeHomeRam()
        await ns.singularity.upgradeHomeCores()

        // join all available factions
        for (let f of ns.singularity.checkFactionInvitations()) {
            ns.singularity.joinFaction(f)
        }

        // if we have enough augs, install them and restart
        if (ns.singularity.getOwnedAugmentations(true).length - ns.singularity.getOwnedAugmentations(false).length >= 6) {
            // dump all our money
            ns.singularity.donateToFaction("Sector-12", ns.getServerMoneyAvailable("home"))
            ns.singularity.installAugmentations("/scripts/starter-combat.js")
        }

        await ns.sleep(10000)
    }
}