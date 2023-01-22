import { AppConstants, appStore, Box, Button, Flex, HStack, useAppModalA } from "@src/features"
import { SuperAdminNewClient } from "./super-admin-new-client";
function SuperAdminClientsToolbar() {
  const ctrlArray = [];
  const { onCloseAppModalA, showAppModalA } = useAppModalA()
  return (
    <HStack
      bgColor="beige"
      rowGap={1}
      wrap={"wrap"}
      // direction="row"
      h={AppConstants.COMPONENT_TOOLBAR_HEIGHT}
      // w="100%"
      spacing="24px"
      justifyContent="flex-end">
      <Button size="sm" colorScheme="blue" onClick={handleNewClientExDatabase}>
        New client with external database
      </Button>
      <Button size="sm" colorScheme="blue" onClick={handleNewClient}>
        New client
      </Button>
    </HStack>
  )

  function handleNewClient() {
    showAppModalA('New client', false, SuperAdminNewClient)
    // appStore.layouts.selectedComponent.value = SuperAdminNewClient
  }

  function handleNewClientExDatabase(){

  }
}
export { SuperAdminClientsToolbar }
