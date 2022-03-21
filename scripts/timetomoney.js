/** @param {NS} ns **/
export async function main(ns) {
	// $ run timetomoney.js --target 10000000000
	const data = ns.flags([
		['target', '10000000000']
  	])

	ns.tprint("Wait 60 seconds, gathering data...")
	let moneyone = await ns.getServerMoneyAvailable("home")
	await ns.sleep(60000)
	let moneytwo = await ns.getServerMoneyAvailable("home")

	let timeminutes = (data['target']-moneytwo) / (moneytwo - moneyone)
	ns.tprint("It will take " + timeminutes + " minutes to meet the target")
}