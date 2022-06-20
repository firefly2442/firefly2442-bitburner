/** @param {NS} ns **/
export async function main(ns) {
	if (ns.getHostname() == "home") {
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
			if (!ns.hasRootAccess(server)) {
				let i = 0;
				if (ns.fileExists("BruteSSH.exe", "home")) {
					await ns.brutessh(server)
					i++;
				}
				if (ns.fileExists("FTPCrack.exe", "home")) {
					await ns.ftpcrack(server)
					i++;
				}
				if (ns.fileExists("relaySMTP.exe", "home")) {
					await ns.relaysmtp(server)
					i++;
				}
				if (ns.fileExists("HTTPWorm.exe", "home")) {
					await ns.httpworm(server)
					i++;
				}
				if (ns.fileExists("SQLInject.exe", "home")) {
					await ns.sqlinject(server)
					i++;
				}
				if (ns.getServerNumPortsRequired(server) <= i && ns.fileExists("NUKE.exe", "home")) {
					await ns.nuke(server)
				}
			}
			if (ns.hasRootAccess(server) && server != "home") {
                let freeramgb = ns.getServerMaxRam(server) - ns.getServerUsedRam(server)
                let availablegrowweakenthreads = Math.floor(freeramgb / ns.getScriptRam("/scripts/tix/growforever.js", server))

                if (availablegrowweakenthreads == 0) {availablegrowweakenthreads++}
                
                await ns.scp("/scripts/tix/growforever.js", server)
                await ns.exec("/scripts/tix/growforever.js", server, availablegrowweakenthreads, "--target", server)
			}
		}
	}
}