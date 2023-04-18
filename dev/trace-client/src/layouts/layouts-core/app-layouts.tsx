import { AppLogin, DummyComponent } from "@src/components";
import {
  // AppConstants,
  appStore,
  Box,
  useEffect,
  // SideMenuTypesEnum,
  // UserTypesEnum,
  AppAlertDialogOk,
  AppAlertDialogYesNo,
  AppLoader,
  AppModalDialogA,
  AppModalDialogB,
  LoginInfoType,
  getLoginInfoFromLS,
  getIsLoggedInFromLS,
  appStaticStore,
} from "@src/features"

import { AppContent, AppDrawer, AppHeader, AppSidebar } from "@src/layouts"
// import { SuperAdminClients } from "@src/auth/super-admin"

function AppLayouts() {
  const isLoggedIn = appStore.login.isLoggedIn.value;

  useEffect(() => {
    loadLoginInfo()
    appStore.layouts.selectedComponent.value = (appStore.login.isLoggedIn.value
      ? DummyComponent
      : AppLogin)
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
    const loginInfo: LoginInfoType = getLoginInfoFromLS()
    // populate appStore properties
    appStore.login.uidEmail = loginInfo.uidEmail
    appStore.login.userType = loginInfo.userType
    appStore.layouts.sideMenuType = loginInfo.sideMenuType
    appStore.layouts.sideMenuHeading = loginInfo.sideMenuHeading

    appStaticStore.login.branchCode = loginInfo.branchCode || ''
    appStaticStore.login.branchId = loginInfo.branchId || 0
    appStaticStore.login.branchName = loginInfo.branchName || ''
    appStaticStore.login.buCode = loginInfo.buCode || ''
    appStaticStore.login.buId = loginInfo.buId || 0
    appStaticStore.login.buName = loginInfo.buName || ''
  }

  // function showClients() {
  //   appStore.login.isLoggedIn.value = true;
  //   appStore.login.userType.value = UserTypesEnum.SUPER_ADMIN;
  //   appStore.layouts.sideMenuType.value = SideMenuTypesEnum.superAdminMenu;
  //   appStore.layouts.sideMenuHeading.value = AppConstants.SUPER_ADMIN_USER;
  //   appStore.layouts.selectedComponent.value = SuperAdminClients;
  // }
}
export { AppLayouts }
