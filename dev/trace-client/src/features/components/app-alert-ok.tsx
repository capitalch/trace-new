import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, appStore, Button, Center, useDisclosure, useRef } from '@src/features'


function AppAlertOk() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef: any = useRef()
    return (
        // <Center>
            <AlertDialog
                isOpen={appStore.alertOk.isOpen.value}
                leastDestructiveRef={cancelRef}
                onClose={handleClose}>
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            {appStore.alertOk.header.value}
                        </AlertDialogHeader>
                        <AlertDialogBody>
                            {appStore.alertOk.body.value}
                            {/* {appStore.alertOk.body.value ? appStore.alertOk.body.value : <></>} */}
                        </AlertDialogBody>
                        <AlertDialogFooter>
                            <Button ref={cancelRef} onClick={handleClose}>
                                OK
                            </Button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>

            </AlertDialog>
            // </Center>
            )

    function handleClose() {
        appStore.alertOk.isOpen.value = false
    }

}
export { AppAlertOk }