import { AppConstants, appStore, Box, Button, Flex, HStack, } from "@src/features"
import { SuperAdminNewClient } from "./super-admin-new-client";
function SuperAdminClientsToolbar() {
  const ctrlArray = [];
  // const { onCloseAppModalA, showAppModalA } = useAppModalA()
  return (
    <HStack
      // bgColor="beige"
      rowGap={1}
      wrap={"wrap"}
      // direction="row"
      h={AppConstants.COMPONENT_TOOLBAR_HEIGHT}
      // w="100%"
      spacing="24px"
      justifyContent="flex-end">
      <Button size="sm" colorScheme="blue" onClick={handleNewClientExternalDatabase}>
        New client with external database
      </Button>
      <Button size="sm" colorScheme="blue" onClick={handleNewClient}>
        New client
      </Button>
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
