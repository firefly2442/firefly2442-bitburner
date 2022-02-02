/** @param {NS} ns **/
export async function main(ns) {
	let targetmoney = 10000000000 // 10 billion

	ns.tprint("Wait 60 seconds, gathering data...")
	let moneyone = await ns.getServerMoneyAvailable("home")
	await ns.sleep(60000)
	let moneytwo = await ns.getServerMoneyAvailable("home")

	let timeminutes = (targetmoney-moneytwo) / (moneytwo - moneyone)
	ns.tprint("It will take " + timeminutes + " minutes to meet the target")
}