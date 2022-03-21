/** @param {NS} ns **/
export async function main(ns) {
    let cities = ["Aevum", "Sector-12", "Chongqing", "New Tokyo", "Ishima", "Volhaven"]

    while (true) {
        let corp = ns.corporation.getCorporation()    
        
        let upgradewarehouses = false
        for (let div of corp.divisions) {
            for (let city of cities) {
                if (ns.corporation.hasWarehouse(div.name, city)) {
                    let w = ns.corporation.getWarehouse(div.name, city)
                    if (w.sizeUsed > w.size*.9) {
                        // purchase a warehouse upgrade if we can
                        if (corp.funds > ns.corporation.getUpgradeWarehouseCost(div.name, city)) {
                            ns.corporation.upgradeWarehouse(div.name, city)
                        } else {
                            upgradewarehouses = true
                        }
                    }
                }
            }
        }

        for (let div of ['Agriculture', 'Healthcare']) {
            if (!upgradewarehouses) {
                //ns.toast("Purchasing real-estate for " + div, "success", 1500)
                for (let city of cities) {
                    if (ns.corporation.hasWarehouse(div, city)) {
                        let w = ns.corporation.getWarehouse(div, city)
                        if (w.sizeUsed < w.size*.9) {
                            let amnt = ns.corporation.getMaterial(div, city, "Real Estate")
                            ns.corporation.buyMaterial(div, city, "Real Estate", Math.floor(amnt.qty*.001))
                        }
                    }
                }
            } else {
                //ns.toast("Upgrading warehouses", "success", 1500)
                for (let city of cities) {
                    if (ns.corporation.hasWarehouse(div, city)) {
                        ns.corporation.buyMaterial(div, city, "Real Estate", 0)
                    }
                }
            }
        }

        await ns.sleep(2000)
    }
}