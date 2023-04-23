import { appStore, AppStoreType, } from '@src/features'
import { Box, State, useEffect, useHookstate } from '@src/libs'
import { AppLogin } from '@src/components'
import { AppContent, AppHeader, AppSidebar } from '@src/layouts'

function AppLayouts() {
  const store: State<AppStoreType> = useHookstate<AppStoreType>(appStore)
  const isLoggedIn = store.login.isLoggedIn.value

  useEffect(() => {
    const compName = isLoggedIn ? 'emptyComponent' : 'appLogin'
    store.layouts.selectedComponentName.set(compName)

  }, [isLoggedIn])

  return (
    <Box>
      <AppHeader />
      <Box>
        <AppSidebar />
        {/* <AppDrawer /> */}
        <AppContent />
        {/* <AppModalDialogA />
        <AppModalDialogB />
        <AppAlertDialogOk />
        <AppLoader />
        <AppAlertDialogYesNo /> */}
      </Box>
    </Box>
  )
}

export { AppLayouts }