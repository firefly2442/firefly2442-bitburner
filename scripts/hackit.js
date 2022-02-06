/** @param {NS} ns **/
export async function main(ns) {
	// $ run hackit.js --target phantasy 
	const data = ns.flags([
		['target', '']
  	])
	
	if (data['target'] == '') {
		data['target'] = ns.getHostname() // default to target itself
	}

	while(true) {
		let freeramgb = ns.getServerMaxRam(ns.getHostname()) - ns.getServerUsedRam(ns.getHostname())
		if (ns.getHostname() == "home") {freeramgb = freeramgb * 0.95} //reserve a little bit for other stuff
		let availablegrowweakenthreads = Math.floor(freeramgb / ns.getScriptRam("/scripts/lib/grow.js"))
		let availablehackthreads = Math.floor(freeramgb / ns.getScriptRam("/scripts/lib/hack.js"))

		if (availablegrowweakenthreads == 0) {availablegrowweakenthreads++}
		if (availablehackthreads == 0) {availablehackthreads++}

		if (ns.getServerSecurityLevel(data['target']) >= ns.getServerMinSecurityLevel(data['target']) * 0.99 &&
			ns.getServerMoneyAvailable(data['target']) >= ns.getServerMaxMoney(data['target']) * 0.99) {
			await ns.exec("/scripts/lib/hack.js", ns.getHostname(), availablehackthreads, "--target", data['target'])
		} else if (ns.getServerSecurityLevel(data['target']) > ns.getServerMinSecurityLevel(data['target']) * 2) {
			// TODO: could add more logic to tweak the number of threads to save RAM
			await ns.exec("/scripts/lib/weaken.js", ns.getHostname(), availablegrowweakenthreads, "--target", data['target'])
		} else {
			// TODO: could add more logic to tweak the number of threads to save RAM
			await ns.exec("/scripts/lib/grow.js", ns.getHostname(), availablegrowweakenthreads, "--target", data['target'])
		}

		await ns.sleep(10);
	}
}