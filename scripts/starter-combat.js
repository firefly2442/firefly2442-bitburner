/** @param {NS} ns **/

export async function main(ns) {

    //https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.sleeve.md

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

    while (ns.exec("/scripts/hacktheplanet.js", "home", 1) == 0) {
		await ns.sleep(1000)
	}
    ns.toast("Hacking started", "success", 6000)

    for (let i = 0; i < ns.sleeve.getNumSleeves(); i++) {
        ns.sleeve.setToIdle(i)
    }

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

        if (ns.bladeburner.getCityChaos(ns.bladeburner.getCity()) > 3) {
            for (let i = 0; i < ns.sleeve.getNumSleeves(); i++) {
                ns.sleeve.setToBladeburnerAction(i, "Diplomacy")
            }
            // diplomacy takes 60 seconds
            await ns.sleep(60100)
            for (let i = 0; i < ns.sleeve.getNumSleeves(); i++) {
                ns.sleeve.setToIdle(i)
            }
        }

        // iterate through contracts
        let ops = ['Tracking', 'Bounty Hunter', 'Retirement']
        for (let i = 0; i < ns.sleeve.getNumSleeves(); i++) {
            let op = null
            if (i < 3) {
                op = ops[i]
            }
            if (op != null) {
                if (ns.bladeburner.getActionEstimatedSuccessChance("contracts", op)[0] >= 0.99 && ns.bladeburner.getActionEstimatedSuccessChance("contracts", op)[1] >= 0.99 && ns.bladeburner.getActionCountRemaining("contracts", op) > 0 && ns.bladeburner.getCityChaos(ns.bladeburner.getCity()) < 3) {
                    if (ns.sleeve.getTask(i) == null) {
                        let res = ns.sleeve.setToBladeburnerAction(i, "Take on contracts", op)
                        if (res) {
                            continue
                        } else {
                            ns.sleeve.setToCommitCrime(i, "Mug")
                        }
                    }
                }
            } else {
                ns.sleeve.setToCommitCrime(i, "Mug")
            }
        }
        // wait 2 min.
        await ns.sleep(120000)
    }
}