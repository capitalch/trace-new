import { deepSignal } from "@deepsignal/react";

const store = {
    isSideMenuOpen: false
}

let globalStore = deepSignal(store)

export { globalStore }