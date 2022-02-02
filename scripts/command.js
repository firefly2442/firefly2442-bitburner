/** @param {NS} ns **/
export async function main(ns) {
	// $ run command.js --command solaris:hack:n00dles
	// $ run command.js --command all:hack:n00dles
	// $ run command.js --command solaris:getmoney
	const data = ns.flags([
		['command', '']
  	])

	ns.disableLog("sleep")
	
	if (data['command'] != '') {
		// send a command on port 1 to be picked up by the command and control main server
		let commands = ns.getPortHandle(1)
		while (!commands.tryWrite(data['command'])){
			await ns.sleep(100)		
		}
		ns.tprint("Finished sending command: " + data['command'])
	}
	ns.tprint("See commandcontrolresults.js for any return results")
}