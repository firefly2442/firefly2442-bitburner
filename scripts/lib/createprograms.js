/** @param {NS} ns **/
export async function main(ns) {
    let programs = [
        "AutoLink.exe",
        "BruteSSH.exe",
        "ServerProfiler.exe",
        "DeepscanV1.exe",
        "FTPCrack.exe",
        "relaySMTP.exe",
        "DeepscanV2.exe",
        "HTTPWorm.exe",
        "SQLInject.exe"    
    ]

	while (true) {
        for (let program of programs) {
            if (!ns.fileExists(program, "home") && !ns.singularity.isBusy()) {
                ns.singularity.createProgram(program, false)
            }
        }
        let morecreate = false
        for (let program of programs) {
            if (!ns.fileExists(program, "home")) {
                morecreate = true
                break
            }
        }

        if (!morecreate) {
            break
        }
        await ns.sleep(1000)
    }
}