import { AppConstants, appStaticStore, appStore, Box, Button, Heading, HStack, IconButton, RefreshIcon, Tooltip, useDialogs } from "@src/features"
import { GlobalSearchBox } from "./global-search-box";
import { SuperAdminNewClient } from "./super-admin-new-client";
function SuperAdminClientsToolbar() {
  const { showModalDialogA } = useDialogs()
  // const ctrlArray = [];
  // const { onCloseAppModalA, showAppModalA } = useAppModalA()
  return (
    <HStack
      rowGap={1}
      wrap='wrap'
      h={AppConstants.COMPONENT_TOOLBAR_HEIGHT}
      justifyContent="space-between">
      <Box>
        <Heading size='sm'>All clients view</Heading>
      </Box>
      <HStack wrap='wrap'>
        <Tooltip label='Create a new client with external database'>
          <Button size="sm" colorScheme="blue" onClick={handleNewClientExternalDatabase}>
            New client with external database
          </Button>
        </Tooltip>
        <Tooltip label='Create a new client'>
          <Button size="sm" colorScheme="blue" onClick={handleNewClient}>
            New client
          </Button>
        </Tooltip>
        <Tooltip label='Reload data'>
          <IconButton size='sm' aria-label="Reload"
            onClick={handleOnClickReload}
            icon={<RefreshIcon fontSize={26} color='blue.500' />} />
        </Tooltip>
        <GlobalSearchBox appStoreChildObject={appStore.superAdmin} />
      </HStack>
    </HStack>
  )

  function handleNewClient() {
    showModalDialogA({
      title:'New client',
      body: SuperAdminNewClient,
    })
    // appStore.modalDialogA.title.value = 'New client'
    // appStore.modalDialogA.toShowCloseButton.value = false
    // appStore.modalDialogA.body.value = SuperAdminNewClient
    // appStore.modalDialogA.isOpen.value = true
    // showAppModalA('New client', false, SuperAdminNewClient)
    // appStore.layouts.selectedComponent.value = SuperAdminNewClient
  }

  function handleNewClientExternalDatabase() {

  }

  async function handleOnClickReload() {
    appStaticStore.superAdmin.doReload()
    // appStaticStore.superAdmin.doFilter()
  }
}
export { SuperAdminClientsToolbar }
