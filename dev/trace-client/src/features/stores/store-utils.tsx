import { appStore, appStaticStore } from '@src/features'

const defaultLayouts = {
  isDrawerOpen: false,
  isSidebarOpen: true,
  // selectedComponent: () => <></>,
  selectedComponentName: 'emptyComponent',
  sideMenuOpenKeys: ['1'],
  sideMenuSelectedKeys: ['2'],
  sideMenuType: '',
  sideMenuHeading: ''
}

const defaultLogin = {
  isLoggedIn: false,
  uidEmail: '',
  userType: ''
}

const defaultLoginStaticObject = {
  clientId: 0,
  clientCode: '',
  clientName: '',
  buId: 0,
  buCode: '',
  buName: '',
  branchId: 1,
  branchCode: 'head',
  branchName: 'Head office'
}

function usingStoreUtils() {
  function doLogout() {
    // setAccesstokenInLS('')
    // setRefreshTokenInLS('')
    // setIsLoggedInInLS(false)
    appStore.layouts.set({ ...defaultLayouts })
    appStore.login.set({ ...defaultLogin })
    appStore.content.breadcrumb.set('')
    appStaticStore.login = { ...defaultLoginStaticObject }

    // appStore.layouts.set({ ...store.layouts })
    // appStore.login.set({ ...store.login })
    // appStore.content.set({ ...store.content })
    // appStaticStore.login = { ...defaultLoginObject }
  }

  return { doLogout }
}

export { usingStoreUtils }
