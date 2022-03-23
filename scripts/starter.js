/** @param {NS} ns **/
import * as connect from '/scripts/lib/connect.js';

export async function main(ns) {

	ns.universityCourse("rothman university", "Study Computer Science", false)

	// start getting money and experience
	ns.exec("/scripts/hacktheplanet.js", "home", 1)
	await ns.sleep(500) // prevents race condition by waiting

	// rerun when we have a stronger hacking level and can connect to more machines
	while (ns.getHackingLevel() < 50) {
		await ns.sleep(5000)
	}
	// code starter program to bootstrap ability to make some decent money
	ns.createProgram("BruteSSH.exe", false)

	for (let p of ns.ps("home")) {
		if (["/scripts/hackit.js", "/scripts/lib/grow.js", "/scripts/lib/hack.js", "/scripts/lib/weaken.js"].includes(p.filename)) {
			ns.kill(p.pid, "home")
		}
	}
	// start our career and augmentations checks
	ns.exec("/scripts/singularity/career.js", "home", 1)
	ns.exec("/scripts/singularity/augmentations.js", "home", 1)

	while (ns.exec("/scripts/hacktheplanet.js", "home", 1) == 0) {
		await ns.sleep(1000)
	}
	ns.toast("Finished waiting for hack level", "success", 6000)

	// purchase tor router, requires Singularity API
	while (ns.getServerMoneyAvailable("home") < 200000) {
		await ns.sleep(5000)
	}
	await ns.purchaseTor()
	ns.toast("Tor node purchased", "success", 6000)

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
	let topurchase = ["BruteSSH.exe", "FTPCrack.exe", "relaySMTP.exe", "HTTPWorm.exe", "SQLInject.exe", "ServerProfiler.exe",
					"DeepscanV1.exe", "DeepscanV2.exe", "AutoLink.exe"]
	ns.toast("Starting loop purchasing darkweb programs", "success", 6000)
	let moretoinstall = true
	while (moretoinstall) {
		moretoinstall = false
		for (let toinstall of topurchase) {
			if (!ns.ls("home").includes(toinstall)) {
				if (ns.purchaseProgram(toinstall)) {
					// relaunch to make use of new program
					for (let p of ns.ps("home")) {
						if (["/scripts/hackit.js", "/scripts/lib/grow.js", "/scripts/lib/hack.js", "/scripts/lib/weaken.js"].includes(p.filename)) {
							ns.kill(p.pid, "home")
						}
					}
					while (ns.exec("/scripts/hacktheplanet.js", "home", 1) == 0) {
						await ns.sleep(1000)
					}
				}
				moretoinstall = true
			}
		}
		await ns.sleep(5000)
	}
	ns.toast("All programs purchased", "success", 6000)

	// relaunch to make use of new programs
	for (let p of ns.ps("home")) {
		if (["/scripts/hackit.js", "/scripts/lib/grow.js", "/scripts/lib/hack.js", "/scripts/lib/weaken.js"].includes(p.filename)) {
			ns.kill(p.pid, "home")
		}
	}
	while (ns.exec("/scripts/hacktheplanet.js", "home", 1) == 0) {
		await ns.sleep(1000)
	}

	// start to grow Hacknet
	ns.exec("/scripts/growhacknet.js", "home", 1)
	ns.toast("Growing Hacknet", "success", 6000)

	// hack CSEC (CyberSec faction)
	while (!ns.hasRootAccess("CSEC") || ns.getServerRequiredHackingLevel("CSEC") > ns.getHackingLevel()) {
		await ns.sleep(5000)
	}
	for (let i = 0; i < 3; i++) { //hacking is not guaranteed so we try a couple times
		await ns.hack("CSEC")
	}
	
	await connect.singularityConnect(ns, "CSEC")
	await ns.installBackdoor()
	ns.toast("Hacked CSEC", "success", 6000)

	// hack avmnite-02h (NiteSec faction)
	while (!ns.hasRootAccess("avmnite-02h") || ns.getServerRequiredHackingLevel("avmnite-02h") > ns.getHackingLevel()) {
		await ns.sleep(5000)
	}
	for (let i = 0; i < 3; i++) { //hacking is not guaranteed so we try a couple times
		await ns.hack("avmnite-02h")
	}
	
	await connect.singularityConnect(ns, "avmnite-02h")
	await ns.installBackdoor()
	ns.toast("Hacked avmnite-02h", "success", 6000)

	// hack I.I.I.I (The Black Hand faction)
	while (!ns.hasRootAccess("I.I.I.I") || ns.getServerRequiredHackingLevel("I.I.I.I") > ns.getHackingLevel()) {
		await ns.sleep(5000)
	}
	for (let i = 0; i < 3; i++) { //hacking is not guaranteed so we try a couple times
		await ns.hack("I.I.I.I")
	}
	
	await connect.singularityConnect(ns, "I.I.I.I")
	await ns.installBackdoor()
	ns.toast("Hacked I.I.I.I", "success", 6000)

	// stop growing Hacknet
	ns.kill("/scripts/growhacknet.js", "home")
	ns.toast("Finished growing Hacknet", "success", 6000)
	
	// hack run4theh111z (BitRunners faction)
	while (!ns.hasRootAccess("run4theh111z") || ns.getServerRequiredHackingLevel("run4theh111z") > ns.getHackingLevel()) {
		await ns.sleep(5000)
	}
	for (let i = 0; i < 3; i++) { //hacking is not guaranteed so we try a couple times
		await ns.hack("run4theh111z")
	}
	
	await connect.singularityConnect(ns, "run4theh111z")
	await ns.installBackdoor()
	ns.toast("Hacked run4theh111z", "success", 6000)

	// hack The-Cave
	while (!ns.hasRootAccess("The-Cave") || ns.getServerRequiredHackingLevel("The-Cave") > ns.getHackingLevel()) {
		await ns.sleep(5000)
	}
	for (let i = 0; i < 3; i++) { //hacking is not guaranteed so we try a couple times
		await ns.hack("The-Cave")
	}
	
	await connect.singularityConnect(ns, "The-Cave")
	await ns.installBackdoor()
	ns.toast("Hacked The-Cave", "success", 6000)


	// enter The-Cave and then perform a scan
	// enter the only available entry and continue...

	ns.tprint("Finished with starter")
}