/** @param {NS} ns **/
export async function main(ns) {
	ns.disableLog("sleep")
	// receive responses on port 3
	let response = ns.getPortHandle(3)
	while (true) {
		let r = response.read()
		if (r != "NULL PORT DATA") {
			ns.print(r)
		}
		await ns.sleep(50)
	}
}