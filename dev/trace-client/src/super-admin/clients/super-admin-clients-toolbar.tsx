import { AppConstants, appStaticStore, appStore, Box, Button, DashboardIcon, Flex, Heading, HStack, IconButton, RefreshIcon, Text, Tooltip, } from "@src/features"
import { GlobalSearchBox } from "./global-search-box";
import { SuperAdminNewClient } from "./super-admin-new-client";
function SuperAdminClientsToolbar() {
  const ctrlArray = [];
  // const { onCloseAppModalA, showAppModalA } = useAppModalA()
  return (
    <HStack
      rowGap={1}
      wrap={"wrap"}
      h={AppConstants.COMPONENT_TOOLBAR_HEIGHT}
      // bgColor="beige"
      // direction="row"
      // w="100%"
      // spacing="24px"
      // columnGap={10}
      justifyContent="space-between">
      <Box>
        <Heading size='sm'>All clients view</Heading>
      </Box>
      <HStack>
        <Tooltip label='Create a new client with external database details'>
          <Button size="sm" colorScheme="blue" onClick={handleNewClientExternalDatabase}>
            New client with external database
          </Button>
        </Tooltip>
        <Tooltip label='Create a new client'>
          <Button size="sm" colorScheme="blue" onClick={handleNewClient}>
            New client
          </Button>
        </Tooltip>
        <Tooltip label='Refresh data'>
          <IconButton size='sm' aria-label="Refresh"
            onClick={appStaticStore.superAdmin.refresh}
            icon={<RefreshIcon fontSize={26} color='teal.400' />} />
        </Tooltip>
        <GlobalSearchBox />
      </HStack>
    </HStack>
  )

  function handleNewClient() {
    appStore.modalDialogA.title.value = 'New client'
    appStore.modalDialogA.toShowCloseButton.value = false
    appStore.modalDialogA.body.value = SuperAdminNewClient
    appStore.modalDialogA.isOpen.value = true
    // showAppModalA('New client', false, SuperAdminNewClient)
    // appStore.layouts.selectedComponent.value = SuperAdminNewClient
  }

  function handleNewClientExternalDatabase() {

  }
}
export { SuperAdminClientsToolbar }
