import * as shufflearray from '/scripts/lib/shufflearray.js';
import * as store from '/scripts/lib/store.js';

/** @param {NS} ns **/
export async function main(ns) {

    // https://www.youtube.com/watch?v=5EOI-yY2tCU

    // buy stocks when server money is 0 and sell when maxed out
    // grow and hack the servers forever

    const commission = 200000 // 100k buy and sell

    // create all programs necessary to grow and hack
    await ns.exec("/scripts/lib/createprograms.js", ns.getHostname(), 1)

    // purchase the necessary accounts and access
    while (!ns.stock.purchaseWseAccount()) {
        await ns.sleep(5000)
    }
    ns.toast("Purchased WSE account", "success", 8000)
    while (!ns.stock.purchaseTixApi()) {
        await ns.sleep(5000)
    }
    ns.toast("Purchased TIX API", "success", 8000)

    // const servermapping = ['joesguns', 'foodnstuff', 'sigma-cosmetics', 'omega-net']
    // const symbolmapping = ['JGN', 'FNS', 'SGC', 'OMGA]
    const servermapping = ['omega-net']
    const symbolmapping = ['OMGA']

    store.setItem('market-hack-grow-target', 'omega-net');
    store.setItem('market-target-going-up', false);

    while (true) {
        // look for more hosts to run on
        await ns.exec("/scripts/tix/looptheplanet.js", ns.getHostname(), 1)

        for (let sym of shufflearray.shufflearray(ns.stock.getSymbols())) {
            for (let i = 0; i < servermapping.length; i++) {
                if (sym == symbolmapping[i]) {
                    ns.print("Low Target: " + ns.getServerMaxMoney(servermapping[i]) * 0.05)
                    if (ns.getServerMoneyAvailable(servermapping[i]) < ns.getServerMaxMoney(servermapping[i]) * 0.05) {
                        // buy stocks if we have money
                        if (ns.getPlayer().money > 50000000) {
                            let buyshares = Math.floor((ns.getPlayer().money*0.95) / ns.stock.getAskPrice(sym))
                            let pricebought = ns.stock.buyStock(sym, buyshares)
                            ns.toast("Bought " + buyshares + " of " + sym + " for " + Math.ceil(pricebought * buyshares), "success", 9000)
                        }
                        store.setItem('market-target-going-up', true);
                    }
                }
            }
        }

        for (let sym of shufflearray.shufflearray(ns.stock.getSymbols())) {
            const [shares, avgPx, sharesShort, avgPxShort] = ns.stock.getPosition(sym)
            for (let i = 0; i < servermapping.length; i++) {
                if (sym == symbolmapping[i]) {
                    // sell stock if we can make a substantial profit
                    if (shares != 0) {
                        let totalcost = (avgPx * shares) + commission
                        let saleprice = ns.stock.getBidPrice(sym) * shares
                        let potentialprofit = Math.floor(saleprice - totalcost)
                        if (potentialprofit > totalcost*1.5) {
                            ns.toast("Sold " + shares + " of " + sym + " for " + potentialprofit + " profit.", "success", 9000)
                            ns.stock.sellStock(sym, shares)
                            store.setItem('market-target-going-up', false);
                        }
                    }
                    // if we can't go any higher, go back down
                    if (ns.getServerMoneyAvailable(servermapping[i]) == ns.getServerMaxMoney(servermapping[i])) {
                        store.setItem('market-target-going-up', false);
                    }
                }
            }
        }

        // purchase additional data and APIs if possible
        ns.stock.purchase4SMarketDataTixApi()
        ns.stock.purchase4SMarketData()

        await ns.sleep(3000)
    }
}