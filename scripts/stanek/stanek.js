/** @param {NS} ns **/
export async function main(ns) {

    // use threads to make it go faster, e.g.:
    // run stanek/stanek.js -t 10

    if (ns.stanek.acceptGift()) {
        ns.toast("Accepted Stanek's Gift", "success", 8000)
    }

    while (true) {
        // https://github.com/bitburner-official/bitburner-src/blob/dev/markdown/bitburner.stanek.md
        for (let h = 0; h < ns.stanek.giftHeight(); h++) {
            for (let w = 0; w < ns.stanek.giftWidth(); w++) {
                let fragment = ns.stanek.getFragment(h, w)
                if (fragment != null) {
                    await ns.stanek.chargeFragment(h, w)
                }
            }
        }
    }
}
