/** @param {NS} ns **/
export async function main(ns) {

    while (true) {
        // stop any actions that are running
        ns.bladeburner.stopBladeburnerAction()

        // increase stamina or HP if low
        while (ns.getPlayer().hp < ns.getPlayer().max_hp*0.8 || ns.bladeburner.getStamina()[0] < ns.bladeburner.getStamina()[1]*0.8) {
            let t = ns.bladeburner.getActionTime("general", "Hyperbolic Regeneration Chamber")
            ns.bladeburner.startAction("general", "Hyperbolic Regeneration Chamber")
            await ns.sleep(t+100)
            ns.bladeburner.stopBladeburnerAction()
        }

        // reduce city chaos if needed
        while (ns.bladeburner.getCityChaos(ns.bladeburner.getCity()) > 3) {
            let t = ns.bladeburner.getActionTime("general", "Diplomacy")
            ns.bladeburner.startAction("general", "Diplomacy")
            await ns.sleep(t+100)
            ns.bladeburner.stopBladeburnerAction()
        }

        // look for skills to upgrade
        for (let skill of ns.bladeburner.getSkillNames()) {
            if (ns.bladeburner.upgradeSkill(skill)) {
                ns.toast(skill + " upgraded", "success", 6000)
            }
        }

        // look to contract tracking to gain rep and skills
        let t = ns.bladeburner.getActionTime("contract", "Tracking")
        ns.bladeburner.startAction("contracts", "Tracking")
        await ns.sleep(t+100)
        ns.bladeburner.stopBladeburnerAction()

        // look to contract bounty hunt if we have good enough intel and good chances
        const [low_per_bounty, high_per_bounty] = ns.bladeburner.getActionEstimatedSuccessChance("contracts", "Bounty Hunter")
        if (low_per_bounty == high_per_bounty && high_per_bounty >= 0.95) {
            let t = ns.bladeburner.getActionTime("contract", "Bounty Hunter")
            ns.bladeburner.startAction("contracts", "Bounty Hunter")
            await ns.sleep(t+100)
            ns.bladeburner.stopBladeburnerAction()
        }

        // look to contract retire if we have good enough intel and good chances
        const [low_per_retire, high_per_retire] = ns.bladeburner.getActionEstimatedSuccessChance("contracts", "Retirement")
        if (low_per_retire == high_per_retire && high_per_retire >= 0.95) {
            let t = ns.bladeburner.getActionTime("contracts", "Retirement")
            ns.bladeburner.startAction("contracts", "Retirement")
            await ns.sleep(t+100)
            ns.bladeburner.stopBladeburnerAction()
        }

        // gather more intel to narrow the percentages range
        if (low_per_bounty != high_per_bounty || low_per_retire != high_per_retire) {
            let t = ns.bladeburner.getActionTime("general", "Field Analysis")
            ns.bladeburner.startAction("general", "Field Analysis")
            await ns.sleep(t+100)
            ns.bladeburner.stopBladeburnerAction()
        }

        // train if we have nothing else to do
        t = ns.bladeburner.getActionTime("general", "Training")
        ns.bladeburner.startAction("general", "Training")
        await ns.sleep(t+100)
        ns.bladeburner.stopBladeburnerAction()

        // recruit if we have nothing else to do
        // t = ns.bladeburner.getActionTime("general", "Recruitment")
        // ns.bladeburner.startAction("general", "Recruitment")
        // await ns.sleep(t+100)
        // ns.bladeburner.stopBladeburnerAction()
    }
}