/** @param {NS} ns **/
export async function main(ns) {

	while(true){
		for (var n = 0; n < ns.hacknet.numNodes(); n++) {
			ns.hacknet.upgradeRam(n, 1)
			ns.hacknet.upgradeLevel(n, 1)
			ns.hacknet.upgradeCore(n, 1)
		}
		await ns.hacknet.purchaseNode()

		await ns.sleep(1000);
	}
}