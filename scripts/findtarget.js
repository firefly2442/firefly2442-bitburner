/** @param {NS} ns **/
export async function main(ns) {
	//Uses a DFS to find the path to the specified server and then prints the path
	//to Terminal.

	// $ run test.js --target run4theh111z
	const data = ns.flags([
		['target', '']
  	])
	
	if (data['target'] == '') {
		data['target'] = 'run4theh111z'
	}
	let target = data['target']

	ns.tprint("Rooted: " + ns.hasRootAccess(target))
	ns.tprint("Money: " + ns.getServerMoneyAvailable(target))

	let visited = [];
	let stack = [];
	let parentTracker = [];
	let origin = ns.getHostname();
	stack.push(origin);

	while(stack.length > 0) {
		let node = stack.pop();
		ns.print("DFS processing server " + node);
		if (!visited.includes(node)) {
			if (node == target) {break;}
			visited.push(node);
			let nextNodes = ns.scan(node);
			for (let i = 0; i < nextNodes.length; i++) {
				stack.push(nextNodes[i]);

				//Keep track of the nodes "parent" so we can re-create the path
				//Ignore entries that start at the origin
				if (nextNodes[i] != origin) {
					parentTracker.push([nextNodes[i], node]);
				}
			}
		}
	}

	ns.print("Target found. About to re-create path");
	ns.print("parentTracker size: " + parentTracker.length);
	let path = [];
	let i = target;
	while (i != ns.getHostname()) {
		path.push(i);
		ns.print("Re-creating path at " + i);

		//Search through the parentTracker array to find this nodes parent
		for (let j = 0; j < parentTracker.length; j++) {
			let pair = parentTracker[j];
			if (pair[0] == i) {
				i = pair[1];
				break;
			}
		}
	}
	path.push("home")

	path.reverse();
	ns.tprint(path);
}