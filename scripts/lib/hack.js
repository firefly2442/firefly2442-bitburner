/** @param {NS} ns **/
export async function main(ns) {
	// $ run hack.js --target n00dles
	const data = ns.flags([
		['target', '']
  	])

	await ns.hack(data['target'])
}