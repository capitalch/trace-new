import { AppLogin, EmptyComponent } from "@src/components";
import { AppContent, AppDrawer, AppHeader, AppSidebar } from '@src/layouts'
import {
  appStore,
  AppLoader,
  AppAlertDialogOk,
  AppAlertDialogYesNo,
  AppModalDialogA,
  AppModalDialogB,
  getIsLoggedInFromLS,
} from "@src/features"
import {
  Box,
  useEffect,
} from '@src/libs'

function AppLayouts() {
  const isLoggedIn = appStore.login.isLoggedIn.value;

  useEffect(() => {
    const x = appStore.login.isLoggedIn.value;
    console.log(x)
    appStore.layouts.selectedComponent.value = (appStore.login.isLoggedIn.value
      ? EmptyComponent
      : AppLogin)
      console.log(appStore.layouts.selectedComponent.value)
  }, [isLoggedIn])

  return (
    <Box>
      <AppHeader />
      <Box>
        <AppSidebar />
        <AppDrawer />
        <AppContent />
        <AppModalDialogA />
        <AppModalDialogB />
        <AppAlertDialogOk />
        <AppLoader />
        <AppAlertDialogYesNo />
      </Box>
    </Box>
  )

  function loadLoginInfo() {
    appStore.login.isLoggedIn.value = getIsLoggedInFromLS()
    // const loginInfo: LoginInfoType = getLoginInfoFromLS()
    // populate appStore properties
    // appStore.login.uidEmail.value = loginInfo.uidEmail
    // appStore.login.userType.value = loginInfo.userType
    // appStore.layouts.sideMenuType = loginInfo.sideMenuType || ''
    // appStore.layouts.sideMenuHeading = loginInfo.sideMenuHeading || ''

    // appStaticStore.login.branchCode = loginInfo.branchCode || ''
    // appStaticStore.login.branchId = loginInfo.branchId || 0
    // appStaticStore.login.branchName = loginInfo.branchName || ''
    // appStaticStore.login.buCode = loginInfo.buCode || ''
    // appStaticStore.login.buId = loginInfo.buId || 0
    // appStaticStore.login.buName = loginInfo.buName || ''
  }

}
export { AppLayouts }
