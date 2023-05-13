import {
    Button,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from "@src/libs"

import { appStore } from "@src/features"

function AppModalDialogB() {
    return (
        <Modal size={appStore.modalDialogB.size.value} isOpen={appStore.modalDialogB.isOpen.value} onClose={handleOnClose} closeOnOverlayClick={false} >
            <ModalOverlay />
            <ModalContent pb={2}>
                <ModalHeader mt={-2} fontSize='2xl' color='twitter.800' fontWeight='bold'>{appStore.modalDialogB.title.value}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <appStore.modalDialogB.body.value />
                </ModalBody>
                {appStore.modalDialogB.toShowCloseButton.value && <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={handleOnClose}>
                        Close
                    </Button>
                </ModalFooter>}
            </ModalContent>
        </Modal>
    )

    function handleOnClose() {
        appStore.modalDialogB.isOpen.value = false
    }
}

export { AppModalDialogB }