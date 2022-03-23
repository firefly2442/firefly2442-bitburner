/** @param {NS} ns **/
export async function main(ns) {

    // be a poor graduate student
    ns.universityCourse("rothman university", "Study Computer Science", false)
    while (ns.getHackingLevel() < 200) {
		await ns.sleep(5000)
	}
    ns.stopAction()
    // take a class that costs money
    ns.universityCourse("rothman university", "Algorithms", false)
    while (ns.getHackingLevel() < 250) {
		await ns.sleep(5000)
	}
    ns.stopAction()

    ns.toast("MegaCorp Software Job", "success", 6000)
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
    }
}