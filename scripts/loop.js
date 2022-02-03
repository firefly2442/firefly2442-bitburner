/** @param {NS} ns **/
export async function main(ns) {
	while(true) {
		ns.exec("/scripts/hacktheplanet.js", "home", 1)
		await ns.sleep(60000 * 60) //every hour
	}
}