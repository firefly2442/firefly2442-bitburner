/** @param {NS} ns **/
export async function main(ns) {
	// $ run hackit.js --target phantasy 
	const data = ns.flags([
		['target', '']
  	])
	
	if (data['target'] == '') {
		data['target'] = ns.getHostname()
	}

	while(true) {
		if (ns.getServerSecurityLevel(data['target']) > ns.getServerMinSecurityLevel(data['target']) + 5) {
			await ns.weaken(data['target'])
		} else if (ns.getServerMoneyAvailable(data['target']) < ns.getServerMaxMoney(data['target']) * 0.75) {
			await ns.grow(data['target'])
		} else {
			await ns.hack(data['target'])
		}
		await ns.sleep(1);
	}
}