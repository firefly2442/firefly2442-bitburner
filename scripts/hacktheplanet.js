/** @param {NS} ns **/
export async function main(ns) {
	if (ns.getHostname() == "home") {
		let servers = []
		let serversToScan = ns.scan("home")
		while (serversToScan.length > 0) {
			let server = serversToScan.shift()
			if (!servers.includes(server)) {
				servers.push(server)
				serversToScan = serversToScan.concat(ns.scan(server))
			}
		}
		ns.tprint("Servers: " + servers)

		for (let server of servers) {
			if (server != "home") {
				ns.tprint("Running on: " + server + " with " + ns.getServer(server)['cpuCores'] + " cores.")
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
				if (ns.hasRootAccess(server) && ns.getServerRequiredHackingLevel(server) <= ns.getHackingLevel()) {
					await ns.kill("hackit.js", server)
					await ns.scp("hackit.js", server)
					// figure out how many threads we can run in parallel
					let numthreads = 1
					while (ns.getScriptRam("hackit.js", server) * numthreads < ns.getServerMaxRam(server)) {
						numthreads++
					}
					if (numthreads == 1) {
						await ns.exec("hackit.js", server, 1)
					} else {
						await ns.exec("hackit.js", server, numthreads-1)
					}
				}
				if (ns.ls(server).length > 0) {
					ns.tprint("Files on " + server + ": " + ns.ls(server))
					for (let s of ns.ls(server)) {
						if (s.endsWith(".lit")) {
							await ns.scp(s, server, "home")
						}
					}
				}
			}
		}
		ns.tprint("Finished deployment")
	}
}