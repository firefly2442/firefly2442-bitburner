/** @param {NS} ns **/
export async function main(ns) {
	let servers = []
	let serversToScan = ns.scan("home")
	while (serversToScan.length > 0) {
		let server = serversToScan.shift()
		if (!servers.includes(server)) {
			servers.push(server)
			serversToScan = serversToScan.concat(ns.scan(server))
		}
	}

	for (let i = 0; i < servers.length; i++) {
		ns.tprint("Server: " + servers[i] + " - maxmoney/securitylevel - " + Math.round(ns.getServerMaxMoney(servers[i])/ns.getServerSecurityLevel(servers[i]), 2))
	}
}