import { AppConstants, appStaticStore, appStore, Box, Button, Heading, HStack, IconButton, RefreshIcon, Select, Tooltip, useDialogs } from "@src/features"
import { GlobalSearchBox } from "./global-search-box";
import { SuperAdminEditNewClient } from "./super-admin-edit-new-client";
import { SuperAdminEditNewClientExtDatabase } from "./super-admin-edit-new-client-ext-database";
function SuperAdminClientsToolbar() {
  const { showModalDialogA } = useDialogs()
 
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
          <Select size='sm' w={150} variant='filled'>
            <option value='100'>Last 100 rows</option>
            <option value='1000'>Last 1000 rows</option>
            <option value='0'>All rows</option>
          </Select>
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
      body: SuperAdminEditNewClient,
    })
  }

  function handleNewClientExternalDatabase() {
    showModalDialogA({
      title:'New client with external database',
      body: SuperAdminEditNewClientExtDatabase,
    })
  }

  async function handleOnClickReload() {
    appStaticStore.superAdmin.doReload()
    // appStaticStore.superAdmin.doFilter()
  }
}
export { SuperAdminClientsToolbar }
