/** @param {NS} ns **/
export async function singularityConnect(ns, target) {
	let visited = [];
	let stack = [];
	let parentTracker = [];
	let origin = ns.getHostname();
	stack.push(origin);

	while(stack.length > 0) {
		let node = stack.pop();
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

	let path = [];
	let i = target;
	while (i != ns.getHostname()) {
		path.push(i);

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
	path.reverse()
	
    for (let c of path) {
        await ns.connect(c)
    }
  }