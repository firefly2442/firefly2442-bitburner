import * as store from '/scripts/lib/store.js';

/** @param {NS} ns **/
export async function main(ns) {

    // uses abilities from localStorage
    // https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage
    // alternative to the native "ports" abilities in the game for message
    // and data passing between scripts

    store.setItem('some-key', 1234);
    const val = store.getItem('some-key');

    ns.tprint(val)
}