/** @param {NS} ns **/
export async function main(ns) {

    while (true) {
        for (let i = 0; i < ns.sleeve.getNumSleeves(); i++) {
            ns.sleeve.setToIdle(i)
        }
        let availablefactions = ns.getPlayer().factions
        let availablecompanies = ["MegaCorp"]
        //https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.sleeve.md
        for (let i = 0; i < ns.sleeve.getNumSleeves(); i++) {
            //ns.tprint("Preparing sleeve "+i)
            if (ns.sleeve.getSleeve(i).shock != 0) {
                ns.sleeve.setToShockRecovery(i)
                break;
            }
            if (ns.sleeve.getSleeve(i).sync != 100) {
                ns.sleeve.setToSynchronize(i)
                break;
            }

            // come up with a random activity to work on
            let r = Math.floor(Math.random() * 3)
            if (r == 0) {
                // commit crimes
                ns.sleeve.setToCommitCrime(i, "Larceny")
                //ns.tprint("Setting sleeve "+i+" to crime.")
            } else if (r == 1) {
                // work faction
                //ns.tprint("Available factions before:")
                //ns.tprint(availablefactions)
                for (let f = 0; f < availablefactions.length; f++) {
                    ns.sleeve.setToFactionWork(i, availablefactions[f], "hacking")
                    //ns.tprint("Setting sleeve "+i+" to faction work.")
                    availablefactions.splice(f, 1)
                    break;
                    //ns.tprint("After:")
                    //ns.tprint(availablefactions)
                }
            } else if (r == 2) {
                // work company
                //ns.tprint("Available companies before:")
                //ns.tprint(availablecompanies)
                for (let f = 0; f < availablecompanies.length; f++) {
                    ns.sleeve.setToCompanyWork(i, availablecompanies[f])
                    //ns.tprint("Setting sleeve "+i+" to company work.")
                    availablecompanies.splice(f, 1)
                    break;
                    //ns.tprint("After:")
                    //ns.tprint(availablecompanies)
                }
            }

            // if everything falls through, just do crime
            if (ns.sleeve.getTask(i) === null) {
                ns.sleeve.setToCommitCrime(i, "Larceny")
            }
        }
        await ns.sleep(60000)
    }
}