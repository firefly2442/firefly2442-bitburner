/** @param {NS} ns **/
export async function main(ns) {

    // be a poor graduate student
    ns.universityCourse("rothman university", "Study Computer Science", false)
    while (ns.getHackingLevel() < 150) {
		await ns.sleep(5000)
	}
    ns.stopAction()
    // take a class that costs money
    ns.universityCourse("rothman university", "Algorithms", false)
    while (ns.getHackingLevel() < 250) {
		await ns.sleep(5000)
	}
    ns.stopAction()

    ns.toast("Working job and gaining rep", "success", 6000)
    while (true) {
        // join all available factions
        for (let f of ns.checkFactionInvitations()) {
            ns.joinFaction(f)
        }

        // apply and look for promotions
        ns.applyToCompany("MegaCorp", "Software")
        ns.workForCompany("MegaCorp", false)
        await ns.sleep(60000)
        ns.stopAction()

        // gain rep with various factions
        let f = ["CyberSec", "Sector-12", "NiteSec", "MegaCorp", "The Black Hand",
                "Netburners", "BitRunners", "Daedalus", "Illuminati"]

        for (let faction of f) {
            if (ns.workForFaction(faction, "Hacking Contracts", false)) {
                await ns.share()
                await ns.sleep(60000)
            }
            ns.stopAction()
        }
    }
}