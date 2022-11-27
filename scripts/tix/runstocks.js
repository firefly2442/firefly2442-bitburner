import * as shufflearray from '/scripts/lib/shufflearray.js';

/** @param {NS} ns **/
export async function main(ns) {

    // https://www.youtube.com/watch?v=5EOI-yY2tCU

    const commission = 200000 // 100k buy and sell

    // create all programs necessary to grow and hack
    await ns.exec("/scripts/lib/createprograms.js", ns.getHostname(), 1)

    // purchase the necessary accounts and access
    while (!ns.TIX.purchaseWseAccount()) {
        await ns.sleep(5000)
    }
    ns.toast("Purchased WSE account", "success", 8000)
    while (!ns.TIX.purchaseTixApi()) {
        await ns.sleep(5000)
    }
    ns.toast("Purchased TIX API", "success", 8000)

    while (true) {
        // look for more hosts to run on
        await ns.exec("/scripts/tix/growtheplanet.js", ns.getHostname(), 1)

        for (let sym of shufflearray.shufflearray(ns.TIX.getSymbols())) {
            // buy stocks if we have money
            if (ns.getPlayer().money > 50000000) {
                let buyshares = Math.floor(25000000 / ns.TIX.getAskPrice(sym))
                let pricebought = ns.TIX.buyStock(sym, buyshares)
                ns.toast("Bought " + buyshares + " of " + sym + " for " + Math.ceil(pricebought * buyshares))
            }
        }

        for (let sym of shufflearray.shufflearray(ns.TIX.getSymbols())) {
            const [shares, avgPx, sharesShort, avgPxShort] = ns.TIX.getPosition(sym)
            // sell stock if we can make a profit
            if (shares != 0) {
                let totalcost = (avgPx * shares) + commission
                let saleprice = ns.TIX.getBidPrice(sym) * shares
                let potentialprofit = Math.floor(saleprice - totalcost)
                if (potentialprofit > 0) {
                    ns.toast("Sold " + shares + " of " + sym + " for " + potentialprofit + " profit.", "success", 9000)
                    ns.TIX.sellStock(sym, shares)
                }
            }
        }

        // purchase additional data and APIs if possible
        ns.TIX.purchase4SMarketDataTixApi()
        ns.TIX.purchase4SMarketData()

        await ns.sleep(5000)
    }
}