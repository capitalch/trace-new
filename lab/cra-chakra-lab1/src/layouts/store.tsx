import { deepSignal } from "@deepsignal/react";

const store = {
    isSideMenuOpen: false,
    isDrawerOpen: false
}

let globalStore = deepSignal(store)

export { globalStore }