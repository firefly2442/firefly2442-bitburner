/** @param {NS} ns **/
export async function main(ns) {
	// $ run commandcontrolserver.js --mode server|client
	const data = ns.flags([
		['mode', 'client'] //default to client mode
  	])

	ns.disableLog("sleep")
	
	if (data['mode'] == 'client') {
		// https://bitburner.readthedocs.io/en/latest/netscript/netscriptmisc.html
		// use port 2 to listen for any commands to run across the cluster
		let port = ns.getPortHandle(2)
		// return any data on port 3
		let returndata = ns.getPortHandle(3)
		while (true) {
			let r = port.peek()
			if (r != "NULL PORT DATA") {
				let splitarray = r.split(":")
				if (splitarray[0] == ns.getHostname()) {
					port.read()
					if (splitarray[1] == "hack") {
						// TODO
					} else if (splitarray[1] == "getmoney") {
						while (!returndata.tryWrite(ns.getHostname() + " - " + ns.getServerMoneyAvailable(ns.getHostname()))){
							await ns.sleep(100)
						}
					} else {
						ns.print("Command not recognized: " + splitarray[1])
					}
				}
			}
			await ns.sleep(1000)
		}
	} else if (data['mode'] == 'server') {
		// deploy the server that looks for responses
		await ns.kill("/scripts/commandcontrolresults.js", "home")
		await ns.exec("/scripts/commandcontrolresults.js", "home", 1)

		// deploy this code to all available nodes and start it up
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
			if (ns.hasRootAccess(server) && server != "home") {
				await ns.kill("/scripts/commandcontrolserver.js", server)
				await ns.scp("/scripts/commandcontrolserver.js", server)
				await ns.exec("/scripts/commandcontrolserver.js", server, 1)
			}
		}
		ns.tprint("Finished deploying command and control clients")

		// listen on port 1 for any commands to then send to port 2
		let commands = ns.getPortHandle(1)
		let server = ns.getPortHandle(2)
		while (true) {
			let r = commands.read()
			if (r != "NULL PORT DATA") {
				ns.print("Received command: " + r)
				let splitarray = r.split(":")
				let towrite = []
				if (splitarray[0] == "all") {
					for (let server of servers) {
						towrite.push(r.replace("all", server))
					}
				} else {
					towrite.push(r)
				}
				for (let towritestring of towrite) {
					while (!server.tryWrite(towritestring)) {
						await ns.sleep(100)
					}
				}
			}

			await ns.sleep(1000)
		}
	}
}