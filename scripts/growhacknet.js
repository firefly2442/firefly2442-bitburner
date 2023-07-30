/** @param {NS} ns **/
export async function main(ns) {
	// $ run growhacknet.js --upgrade [true]
	const data = ns.flags([
		['upgrade', 'true']
  	])

	while(true){
		for (var n = 0; n < ns.hacknet.numNodes(); n++) {
			if (data['upgrade'] == "true") {
				ns.hacknet.upgradeRam(n, 1)
				ns.hacknet.upgradeLevel(n, 1)
				ns.hacknet.upgradeCore(n, 1)
				ns.hacknet.upgradeCache(n, 1)
			}
		}
		if (data['upgrade'] == "true") {
			await ns.hacknet.purchaseNode()
		}
		while (ns.hacknet.spendHashes("Sell for Money")) {}

		await ns.sleep(500);
	}
}