/** @param {NS} ns **/
export async function main(ns) {
	// $ run grow.js --target n00dles
	const data = ns.flags([
		['target', '']
  	])

    while (true) {
	    await ns.grow(data['target'], {stock:true})
    }
}