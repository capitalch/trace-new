import { appStore, Center, Flex, Modal, ModalBody, ModalContent, ModalOverlay, Spinner } from '@src/features'
function AppLoader() {
    const isOpen = appStore.appLoader.isOpen.value
    return (
        <Modal  isOpen={isOpen} onClose={handleOnClose} closeOnOverlayClick={false} >
            <ModalOverlay />
            <ModalBody  zIndex={100000}style={{ position: 'absolute', left: '50%', bottom: '40%' }} >
                <Spinner size='xl' colorScheme='blue' />
            </ModalBody>
        </Modal>
    )

    function handleOnClose() {
        appStore.appLoader.isOpen.value = false
    }
}

export { AppLoader }