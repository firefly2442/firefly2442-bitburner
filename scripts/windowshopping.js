/** @param {NS} ns **/
export async function main(ns) {
	let mymoney = ns.getServerMoneyAvailable("home")
	let largestpurchase = 0
	for (let i = 1; i <= 20; i++) {
		ns.tprint(Math.pow(2, i) + " GB RAM -- $" + Math.ceil(ns.getPurchasedServerCost(Math.pow(2, i))).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","))
		if (Number(mymoney) > Number(ns.getPurchasedServerCost(Math.pow(2, i)))) {
			largestpurchase = Math.pow(2, i)
		}
	}
	ns.tprint("Largest purchase given the available money is: " + largestpurchase + " GB RAM server")
	if (await ns.prompt("Would you like to purchase it?")) {
		await ns.purchaseServer("purchased_" + largestpurchase+"_GB_RAM", largestpurchase)
	}
}