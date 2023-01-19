import { AppConstants, Box, Button, Flex, HStack } from '@src/features'
function SuperAdminClientsToolbar() {
    return (<HStack h={AppConstants.COMPONENT_TOOLBAR_HEIGHT} w='100%' justifyItems='flex-end'>
        <Button size='md' >New client</Button>
    </HStack>)
}
export { SuperAdminClientsToolbar }