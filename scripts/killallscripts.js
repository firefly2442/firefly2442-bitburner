/** @param {NS} ns **/
export async function main(ns) {
	let servers = ["home"]
	let serversToScan = ns.scan("home")
	while (serversToScan.length > 0) {
		let server = serversToScan.shift()
		if (!servers.includes(server)) {
			servers.push(server)
			serversToScan = serversToScan.concat(ns.scan(server))
		}
	}

	for (let server of servers) {
		ns.killall(server)
	}
}