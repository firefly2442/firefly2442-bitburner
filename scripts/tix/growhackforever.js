import * as store from '/scripts/lib/store.js';

/** @param {NS} ns **/
export async function main(ns) {
	// $ run growhackforever.js --target n00dles
	const data = ns.flags([
		['target', '']
  	])

    while (true) {
		// if (ns.getServerMaxMoney(data['target']) == ns.getServerMoneyAvailable(data['target'])) {
		// 	await ns.sleep(30000) //wait for stock sale
		// }
		// if (ns.getServerMoneyAvailable(data['target']) <= 10000) {
		// 	await ns.sleep(30000) //wait for stock purchase
		// }

		while (ns.getServerSecurityLevel(data['target']) > 20) {
			await ns.weaken(data['target'], {stock:true})
		}
		if (store.getItem('market-target-going-up')) {
	    	await ns.grow(data['target'], {stock:true})
		} else {
			await ns.hack(data['target'], {stock:true})
		}
    }
}