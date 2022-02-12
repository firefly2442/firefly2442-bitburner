import * as uuid from '/scripts/lib/uuid.js';

/** @param {NS} ns **/
export async function main(ns) {
	// $ run rungang.js

	while(true) {
		if (ns.gang.canRecruitMember()) {
            let name = uuid.uuidv4()
            ns.gang.recruitMember(name)
            ns.toast("Recruited new gang member", "success", 3000)
        }

        let ganginfo = ns.gang.getGangInformation()
        let members = ns.gang.getMemberNames()
        //let tasks = ns.gang.getTaskNames()

        // check if the wanted penalty hits -10%
        if (1-ganginfo.wantedPenalty > 0.10) {
            // put everyone on Vigilante mode
            for (let member of members) {
                ns.gang.setMemberTask(member, "Vigilante Justice")
            }
            // wait until the wanted level hits 1 (the minimum)
            while (ns.gang.getGangInformation().wantedLevel != 1) {
                await ns.sleep(1000)
            }
        } else {
            // do some training
            for (let member of members) {
                await ns.gang.setMemberTask(member, "Train Combat")
            }
            await ns.sleep(60000)
            for (let member of members) {
                await ns.gang.setMemberTask(member, "Train Charisma")
            }
            await ns.sleep(60000)
            
            // look to ascend gang members
            for (let member of members) {
                let ascensionres = ns.gang.getAscensionResult(member)
                if (typeof ascensionres !== "undefined") {
                    if (!ganginfo.isHacking) {
                        // combat gang, look to double stats
                        if (ascensionres.agi > 2 &&
                            ascensionres.def > 2 &&
                            ascensionres.dex > 2 &&
                            ascensionres.str > 2 &&
                            ascensionres.cha > 2)
                        {
                            ns.gang.ascendMember(member)
                            ns.toast("Ascended " + member, "success", 3000)
                        }
                    } else {
                        // hacking gang, look to double stats
                        if (ascensionres.hack > 2) {
                            ns.gang.ascendMember(member)
                            ns.toast("Ascended " + member, "success", 3000)
                        }
                    }
                }
            }

            // buy equipment
            for (let member of members) {
                for (let e of ns.gang.getEquipmentNames()) {
                    if (ns.getServerMoneyAvailable("home") > ns.gang.getEquipmentCost(e)) {
                        if (!ganginfo.isHacking) {
                            // combat gang
                            if (!["Augmentation", "Rootkit"].includes(ns.gang.getEquipmentType(e))) {
                                ns.gang.purchaseEquipment(member, e)                                
                            }
                        } else {
                            // hacking gang
                            if (!["Augmentation", "Weapon", "Armor", "Vehicle"].includes(ns.gang.getEquipmentType(e))) {
                                ns.gang.purchaseEquipment(member, e)
                            }
                        }
                    }
                }
            }

            // perform some actions to get money and experience
            for (let member of members) {
                if (ns.gang.getMemberInformation(member).earnedRespect < 1000) {
                    await ns.gang.setMemberTask(member, "Deal Drugs")
                } else {
                    await ns.gang.setMemberTask(member, "Armed Robbery")
                }
            }
            await ns.sleep(60000)

            // do territory warfare to increase power
            for (let member of members) {
                await ns.gang.setMemberTask(member, "Territory Warfare")
            }
            await ns.sleep(60000)
        }

		await ns.sleep(100);
	}
}