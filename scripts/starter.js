/** @param {NS} ns **/
export async function main(ns) {

	// start getting money and experience
	ns.exec("hacktheplanet.js", "home", 1)
	ns.exec("hackit.js", "home", 25000, "--target", "n00dles")

	// rerun when we have a stronger hacking level and can connect to more machines
	while (ns.getHackingLevel() < 50) {
		await ns.sleep(5000)
	}
	ns.kill("hacktheplanet.js", "home")
	ns.exec("hacktheplanet.js", "home", 1)

	// purchase tor router, requires Singularity API
	// while (ns.getServerMoneyAvailable("home") < 200000) {
	// 	await ns.sleep(5000)
	// }
	// await ns.purchaseTor()

	// purchase items from the dark web, requires Singularity API
	// BruteSSH.exe - $500.000k - Opens up SSH Ports.
	// FTPCrack.exe - $1.500m - Opens up FTP Ports.
	// relaySMTP.exe - $5.000m - Opens up SMTP Ports.
	// HTTPWorm.exe - $30.000m - Opens up HTTP Ports.
	// SQLInject.exe - $250.000m - Opens up SQL Ports.
	// ServerProfiler.exe - $500.000k - Displays detailed information about a server.
	// DeepscanV1.exe - $500.000k - Enables 'scan-analyze' with a depth up to 5.
	// DeepscanV2.exe - $25.000m - Enables 'scan-analyze' with a depth up to 10.
	// AutoLink.exe - $1.000m - Enables direct connect via 'scan-analyze'.
	// Formulas.exe - $5.000b - Unlock access to the formulas API.
	// let topurchase = ["FTPCrack.exe", "HTTPWorm.exe", etc.]
	// while (topurchase.length != 0) {
	// 	await ns.sleep(5000)
	// }

	// relaunch to make use of new injections
	ns.kill("hacktheplanet.js", "home")
	ns.exec("hacktheplanet.js", "home", 1)

	// start to grow Hacknet
	ns.exec("growhacknet.js", "home", 1)

	// hack CSEC (CyberSec faction)
	while (await !ns.hasRootAccess("CSEC")) {
		await ns.sleep(5000)
	}
	for (let i = 0; i < 3; i++) {
		await ns.hack("CSEC")
	}

	// hack avmnite-02h (NiteSec faction)
	while (await !ns.hasRootAccess("avmnite-02h")) {
		await ns.sleep(5000)
	}
	for (let i = 0; i < 3; i++) {
		await ns.hack("avmnite-02h")
	}

	// hack I.I.I.I (The Blank Hand faction)
	while (await !ns.hasRootAccess("I.I.I.I")) {
		await ns.sleep(5000)
	}
	for (let i = 0; i < 3; i++) {
		await ns.hack("I.I.I.I")
	}
	
	// hack run4theh111z manually (BitRunners faction)
	let servers = []
	let serversToScan = ns.scan("home")
	while (serversToScan.length > 0) {
		let server = serversToScan.shift()
		if (!servers.includes(server)) {
			servers.push(server)
			serversToScan = serversToScan.concat(ns.scan(server))
		}
	}
	for (let server of servers) {
		if (server == "run4theh111z") {
			await ns.hack(server, {threads: 1})
		}
	}
	
	// kill off launched scripts
	ns.kill("hackit.js", "home")
	ns.kill("growhacknet.js", "home")

	ns.tprint("Finished with starter")
}