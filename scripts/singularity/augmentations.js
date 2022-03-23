/** @param {NS} ns **/
export async function main(ns) {

    while (true) {
        for (let faction of ["CyberSec", "Netburners", "Sector-12", "NiteSec", "The Black Hand", 
                            "BitRunners", "Daedalus", "Illuminati", "MegaCorp"]) {
            for (let aug of ns.getAugmentationsFromFaction(faction)) {
                if (ns.getAugmentationPrice(aug) < ns.getServerMoneyAvailable("home") &&
                    ns.getAugmentationRepReq(aug) < ns.getFactionRep(faction) &&
                    !ns.getOwnedAugmentations(true).includes(aug)) {
                    ns.purchaseAugmentation(faction, aug)
                    ns.toast("Purchased aug: " + aug, "success", 6000)
                }
            }
        }

        // look to upgrade RAM and Cores while we're at it
		await ns.upgradeHomeRam()
        await ns.upgradeHomeCores()

        // if we have enough augs, install them and restart
        if ((ns.getOwnedAugmentations(true).length - ns.getOwnedAugmentations(false).length) >= 5) {
            // dump all money to faction for rep
            ns.donateToFaction("MegaCorp", ns.getServerMoneyAvailable("home"))
            // no arguments, one thread requirement
            ns.installAugmentations("/scripts/starter.js")
        }

        await ns.sleep(60000)
    }
}