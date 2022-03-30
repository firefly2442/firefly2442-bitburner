/** @param {NS} ns **/
export async function main(ns) {

    let crimes = ["shoplift", "rob store", "mug someone", "larceny",
            "deal drugs", "bond forgery", "traffick illegal arms",
            "homicide", "grand theft auto", "kidnap",
            "assassination", "heist"]

    while (true) {
        let performcrime = "shoplift"
        for (let crime of crimes) {
            if (ns.getCrimeChance(crime) >= .80) {
                performcrime = crime
            }
        }

        ns.commitCrime(performcrime)

        // TODO: this just runs forever and there's no way to exit out
        // of it for "quick" jobs, have to kill all scripts with red button
        // adding some type of overall timer as a parameter may be beneficial
        while (ns.isBusy()) {
            await ns.sleep(500)
        }
    }
}