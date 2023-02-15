import { AppConstants, AppGridSearchBox, appStaticStore, appStore, Box, Button, Heading, HStack, IconButton, RefreshIcon, Select, Tooltip, useDialogs, useMediaQuery, useState } from "@src/features"
import { SuperAdminEditNewClient } from "./super-admin-edit-new-client";
import { SuperAdminEditNewClientExtDatabase } from "./super-admin-edit-new-client-ext-database";

function SuperAdminClientsToolbar() {
  const { showModalDialogA } = useDialogs()
  const [isLargerThan480] = useMediaQuery("(min-width: 480px)", { ssr: false })
  const [isLargerThan992] = useMediaQuery("(min-width: 992px)", { ssr: false })
  return (
    <HStack mb={2}
      rowGap={1}
      wrap='wrap'
      h={AppConstants.COMPONENT_TOOLBAR_HEIGHT}
      justifyContent="space-between">
      {isLargerThan992 && <Box>
        <Heading size='sm'>All clients view</Heading>
      </Box>}
      <HStack wrap='wrap'>
        {isLargerThan992 && <HStack>
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
        </HStack>}
        <Select size='sm' w='0.5xs' variant='filled' defaultValue={appStore.superAdmin.noOfRows.value} onChange={handleOnSelectRows}>
          <option value='100'>Last 100 rows</option>
          <option value='1000'>Last 1000 rows</option>
          <option value=''>All rows</option>
        </Select>
        {isLargerThan480 && <Tooltip label='Reload data'>
          <IconButton size='sm' aria-label="Reload"
            onClick={handleOnClickReload}
            icon={<RefreshIcon fontSize={26} color='blue.500' />} />
        </Tooltip>}
        <AppGridSearchBox storeObjectName='superAdmin' />
      </HStack>
    </HStack>
  )

  function handleNewClient() {
    showModalDialogA({
      title: 'New client',
      body: SuperAdminEditNewClient,
    })
  }

  function handleNewClientExternalDatabase() {
    showModalDialogA({
      title: 'New client with external database',
      body: SuperAdminEditNewClientExtDatabase,
    })
  }

  async function handleOnClickReload() {
    appStaticStore.superAdmin.doReload()
  }

  function handleOnSelectRows(e: any) {
    appStore.superAdmin.noOfRows.value = e.target.value
    appStaticStore.superAdmin.doReload()
  }
}
export { SuperAdminClientsToolbar }
