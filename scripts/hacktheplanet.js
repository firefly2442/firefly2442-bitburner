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
		ns.tprint("Servers: " + servers)

		for (let server of servers) {
			ns.print("Running on: " + server + " with " + ns.getServer(server)['cpuCores'] + " cores.")
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
			if (ns.hasRootAccess(server)) {
				await ns.kill("/scripts/hackit.js", server)
				await ns.scp("/scripts/hackit.js", server)

				await ns.scp("/scripts/lib/grow.js", server)
				await ns.scp("/scripts/lib/hack.js", server)
				await ns.scp("/scripts/lib/weaken.js", server)
				// // figure out how many threads we can run in parallel
				// let numthreads = 1
				// while (ns.getScriptRam("/scripts/hackit.js", server) * numthreads < ns.getServerMaxRam(server)) {
				// 	numthreads++
				// }
				// if (numthreads == 1) {
				// 	await ns.exec("/scripts/hackit.js", server, 1)
				// } else {
				// 	await ns.exec("/scripts/hackit.js", server, numthreads-1)
				// }
				let currenthackinglevel = ns.getHackingLevel()
				if (ns.getServerRequiredHackingLevel(server) <= currenthackinglevel && ns.getServerMaxMoney(server) > 0) {
					await ns.exec("/scripts/hackit.js", server, 1)
				} else {
					// we don't have the hacking level yet but we can still utilize the node
					// TODO: add better logic for what server we target
					if (currenthackinglevel < 100) {
						await ns.exec("/scripts/hackit.js", server, 1, "--target", "sigma-cosmetics") //lvl 5
					} else if (currenthackinglevel >= 100 && currenthackinglevel < 300) {
						await ns.exec("/scripts/hackit.js", server, 1, "--target", "harakiri-sushi") //lvl 40
					} else if (currenthackinglevel >= 300 && currenthackinglevel < 600) {
						await ns.exec("/scripts/hackit.js", server, 1, "--target", "phantasy") //lvl 100
					} else if (currenthackinglevel >= 600 && currenthackinglevel < 1000) {
						await ns.exec("/scripts/hackit.js", server, 1, "--target", "johnson-ortho") //lvl 293
					} else if (currenthackinglevel >= 1000) {
						await ns.exec("/scripts/hackit.js", server, 1, "--target", "catalyst") //lvl 410
					}
				}
			}
			if (ns.ls(server).length > 0) {
				ns.print("Files on " + server + ": " + ns.ls(server))
				for (let s of ns.ls(server)) {
					if (s.endsWith(".lit")) {
						await ns.scp(s, server, "home")
					}
				}
			}
		}
		ns.tprint("Finished deployment")
	}
}