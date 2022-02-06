/** @param {NS} ns **/
export async function main(ns) {
	// $ run weaken.js --target n00dles
	const data = ns.flags([
		['target', '']
  	])

	await ns.weaken(data['target'])
}