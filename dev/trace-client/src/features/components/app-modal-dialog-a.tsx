import {
    appStore,
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@src/features"

function AppModalDialogA() {
    return (
        <Modal isOpen={appStore.modalDialogA.isOpen.value} onClose={handleOnClose} closeOnOverlayClick={false} >
            <ModalOverlay />
            <ModalContent pb={2}>
                <ModalHeader>{appStore.modalDialogA.title.value}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <appStore.modalDialogA.body.value />
                </ModalBody>
                {appStore.modalDialogA.toShowCloseButton.value && <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleOnClose}>
                        Close
                    </Button>
                </ModalFooter>}
            </ModalContent>
        </Modal>
    )

    function handleOnClose() {
        appStore.modalDialogA.isOpen.value = false
    }
}

export { AppModalDialogA }
