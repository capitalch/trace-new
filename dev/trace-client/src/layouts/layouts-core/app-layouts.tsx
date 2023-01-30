import {
  AppConstants,
  appStore,
  Box,
  useEffect,
  SideMenuTypesEnum,
  UserTypesEnum,
  Spinner,
  // AppModalA,
} from "@src/features"
// import { AppLogin, DummyComponent } from "@src/components"
import { AppContent, AppDrawer, AppHeader, AppSidebar } from "@src/layouts"
import { SuperAdminClients } from "@src/super-admin"
import { AppAlertDialogOk } from "@src/features/components/app-alert-dialog-ok";
import { AppModalDialogA } from "@src/features/components/app-modal-dialog-a";
import { AppLoader } from "@src/features/components/app-loader";
// import { AppErrorAlert } from "@src/features/components/app-error-alert";
// import { useAppLayouts } from './app-layouts-hook'

function AppLayouts() {
  const isLoggedIn = appStore.login.isLoggedIn.value;

  useEffect(() => {
    // appStore.layouts.selectedComponent.value = isLoggedIn
    //   ? DummyComponent
    //   : AppLogin;

    showClients()
  }, [isLoggedIn])

  return (
    <Box>
      <AppHeader />
      <Box>
        <AppSidebar />
        <AppDrawer />
        <AppContent />
        <AppModalDialogA />
        {/* <AppModalA /> */}
        <AppAlertDialogOk />
        <AppLoader />
        {/* <Spinner size='md' /> */}
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
