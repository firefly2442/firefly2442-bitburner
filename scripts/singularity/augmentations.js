/** @param {NS} ns **/
export async function main(ns) {

    let factions = ["CyberSec", "Netburners", "Sector-12", "NiteSec", "The Black Hand", 
                "BitRunners", "Daedalus", "Illuminati", "MegaCorp"]

    while (true) {
        for (let faction of factions) {
            for (let aug of ns.singularity.getAugmentationsFromFaction(faction)) {
                //ns.tprint(faction+" - "+aug+" - "+ns.getAugmentationPrice(aug)+","+ns.getAugmentationRepReq(aug))

                // this one has "levels" and can be upgraded forever, we have to special case it
                // otherwise it gets removed from the ownedaugs.includes check
                if (aug == "NeuroFlux Governor") {
                    ns.singularity.purchaseAugmentation(faction, aug)
                }

                // TODO: consider installing augs in reverse order so the most expensive augs
                // are first, this would save money and likely increase speed

                if (ns.singularity.getAugmentationPrice(aug) < ns.getServerMoneyAvailable("home") &&
                    ns.singularity.getAugmentationRepReq(aug) < ns.singularity.getFactionRep(faction) &&
                    !ns.singularity.getOwnedAugmentations(true).includes(aug)) {
                    ns.singularity.purchaseAugmentation(faction, aug)
                    ns.toast("Purchased aug: " + aug, "success", 6000)
                }
            }
        }

        // look to upgrade RAM and Cores while we're at it
		await ns.singularity.upgradeHomeRam()
        await ns.singularity.upgradeHomeCores()

        // if we have enough augs, install them and restart
        if ((ns.singularity.getOwnedAugmentations(true).length - ns.singularity.getOwnedAugmentations(false).length) >= 6) {
            // dump all money to factions for rep
            let candonateto = []
            for (let faction of factions) {
                if (ns.singularity.donateToFaction(faction, 1)) {
                    // only donate in situations where we have augs to purchase from that faction
                    let purchasableaugs = ns.singularity.getAugmentationsFromFaction(faction).length
                    for (let aug of ns.singularity.getAugmentationsFromFaction(faction)) {
                        if (ns.singularity.getOwnedAugmentations(true).includes(aug)) {
                            purchasableaugs = purchasableaugs - 1
                        }
                    }
                    if (purchasableaugs != 0) {
                        candonateto.push(faction)
                    }
                }
            }
            for (let i = candonateto.length; i > 0; i--) {
                ns.toast("Donated to faction: " + candonateto[i-1], "success", 10000)
                ns.donateToFaction(candonateto[i-1], Math.floor(ns.getServerMoneyAvailable("home")/i))
            }
            // TODO: sell all stocks as they're lost on reset

            // no arguments, one thread requirement
            //ns.toast("Ready to install augs and reset", "success", 10000)
            ns.singularity.installAugmentations("/scripts/starter.js")
        }

        await ns.sleep(60000)
    }
}