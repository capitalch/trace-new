import {
  AppConstants,
  appStore,
  Box,
  useEffect,
  SideMenuTypesEnum,
  UserTypesEnum,
  AppModalA,
} from "@src/features"
import { AppLogin, DummyComponent } from "@src/components"
import { AppContent, AppDrawer, AppHeader, AppSidebar } from "@src/layouts"
import { SuperAdminClients } from "@src/super-admin"
import { AppAlertOk } from "@src/features/components/app-alert-ok";
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
        <AppModalA />
        <AppAlertOk />
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
