// import { AppLogin, DummyComponent, appComponentSelect } from "@src/components";
import {
  appStore,
  Box,
  useEffect,
  // AppAlertDialogOk,
  // AppAlertDialogYesNo,
  // AppLoader,
  // AppModalDialogA,
  // AppModalDialogB,
  LoginInfoType,
  getLoginInfoFromLS,
  getIsLoggedInFromLS,
  appStaticStore,
  useHookstate,
} from "@src/features"

import { AppContent, AppDrawer, AppHeader, AppSidebar } from "@src/layouts"

function AppLayouts() {
  const store: any = useHookstate(appStore)
  const isLoggedIn = store.login.isLoggedIn.get();
  // store.layouts.selectedComponent.set(AppLogin)
  useEffect(() => {
    const selectedComponentName = (isLoggedIn
      ? 'dummyComponent'
      : 'appLogin')
    store.layouts.selectedComponentName.set(selectedComponentName)
  }, [isLoggedIn])

  return (
    <Box>
      <AppHeader />
      <Box>
        <AppSidebar />
        <AppDrawer />
        <AppContent />
        {/* <AppModalDialogA />
        <AppModalDialogB />
        <AppAlertDialogOk />
        <AppLoader />
        <AppAlertDialogYesNo /> */}
      </Box>
    </Box>
  )

  // function loadLoginInfo() {
  //   appStore.login.isLoggedIn.value = getIsLoggedInFromLS()
  //   const loginInfo: LoginInfoType = getLoginInfoFromLS()
  //   // populate appStore properties
  //   appStore.login.uidEmail = loginInfo.uidEmail
  //   appStore.login.userType = loginInfo.userType
  //   appStore.layouts.sideMenuType = loginInfo.sideMenuType || ''
  //   appStore.layouts.sideMenuHeading = loginInfo.sideMenuHeading || ''

  //   appStaticStore.login.branchCode = loginInfo.branchCode || ''
  //   appStaticStore.login.branchId = loginInfo.branchId || 0
  //   appStaticStore.login.branchName = loginInfo.branchName || ''
  //   appStaticStore.login.buCode = loginInfo.buCode || ''
  //   appStaticStore.login.buId = loginInfo.buId || 0
  //   appStaticStore.login.buName = loginInfo.buName || ''
  // }
}
export { AppLayouts }
