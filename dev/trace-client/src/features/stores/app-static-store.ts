const appStaticStore: AppStaticStoreType = {
  componentHistorySet: new Set(), // A set for history of component names which have been loaded so far
  // doReload: () => appStore.reload.value = !appStore.reload.value,
  isCloseClicked: false,
  isOpenClicked: false,
  admin: {
    businessUnits: {
      doFilter: () => {},
      doReload: () => {}
    },
    businessUsers: {
      doFilter: () => {},
      doReload: () => {}
    },
    bues: {
      doReload: () => {}
    }
  },
  login: {
    clientId: 0,
    clientCode: '',
    clientName: '',
    buId: 0,
    buCode: '',
    buName: '',
    branchId: 1,
    branchCode: 'head',
    branchName: 'Head office'
  },
  permissions: {
    doFilter: () => {},
    doReload: () => {}
  },
  superAdmin: {
    adminUsers: {
      doFilter: () => {},
      doReload: () => {}
    },
    clients: {
      doFilter: () => {},
      doReload: () => {}
    },
    dashboard: {
      doReload: () => {}
    },
    roles: {
      doFilter: () => {},
      doReload: () => {}
    },
    securedControls: {
      doFilter: () => {},
      doReload: () => {}
    }
  }
}

type AppStaticStoreType = {
  componentHistorySet: Set<string>
//   doReload: () => void
  isCloseClicked: boolean
  isOpenClicked: boolean
  admin: {
    businessUnits: {
      doFilter: () => void
      doReload: () => void
    }
    businessUsers: {
      doFilter: () => void
      doReload: () => void
    }
    bues: {
      doReload: () => void
    }
  }
  login: {
    clientId: number
    clientCode: string
    clientName: string
    buId: number
    buCode: string
    buName: string
    branchId: number
    branchCode: string
    branchName: string
  }
  permissions: {
    doFilter: () => void
    doReload: () => void
  }
  superAdmin: {
    adminUsers: {
      doFilter: () => void
      doReload: () => void
    }
    clients: {
      doFilter: () => void
      doReload: () => void
    }
    dashboard: {
      doReload: () => void
    }
    roles: {
      doFilter: () => void
      doReload: () => void
    }
    securedControls: {
      doFilter: () => void
      doReload: () => void
    }
  }
//   [key: string]: any
}

export {appStaticStore, type AppStaticStoreType}