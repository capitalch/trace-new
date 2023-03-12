import { AppLogin, DummyComponent } from "@src/components";
import {
  AppConstants,
  appStore,
  Box,
  useEffect,
  SideMenuTypesEnum,
  UserTypesEnum,
  AppAlertDialogOk,
  AppAlertDialogYesNo,
  AppLoader,
  AppModalDialogA,
} from "@src/features"

import { AppContent, AppDrawer, AppHeader, AppSidebar } from "@src/layouts"
import { SuperAdminClients } from "@src/auth/super-admin"
function AppLayouts() {
  const isLoggedIn = appStore.login.isLoggedIn.value;

  useEffect(() => {
    appStore.layouts.selectedComponent.value = isLoggedIn
      ? DummyComponent
      : AppLogin

    // showClients()
  }, [isLoggedIn])

  return (
    <Box>
      <AppHeader />
      <Box>
        <AppSidebar />
        <AppDrawer />
        <AppContent />
        <AppModalDialogA />
        <AppAlertDialogOk />
        <AppLoader />
        <AppAlertDialogYesNo />
      </Box>
    </Box>
  )

  function showClients() {
    appStore.login.isLoggedIn.value = true;
    appStore.login.userType.value = UserTypesEnum.SUPER_ADMIN;
    appStore.layouts.sideMenuType.value = SideMenuTypesEnum.superAdminMenu;
    appStore.layouts.sideMenuHeading.value = AppConstants.SUPER_ADMIN_USER;
    appStore.layouts.selectedComponent.value = SuperAdminClients;
  }
}
export { AppLayouts }
