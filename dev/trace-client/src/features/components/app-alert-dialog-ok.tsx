import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, appStore, Button, useRef } from '@src/features'


function AppAlertDialogOk() {
    const cancelRef: any = useRef()
    return (
        <AlertDialog
            isOpen={appStore.alertDialogOk.isOpen.value}
            leastDestructiveRef={cancelRef}
            onClose={handleClose}>
            <AlertDialogOverlay>
                <AlertDialogContent>
                    <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                        {appStore.alertDialogOk.header.value}
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        {appStore.alertDialogOk.body.value}
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={handleClose}>
                            OK
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialogOverlay>

        </AlertDialog>
    )

    function handleClose() {
        appStore.alertDialogOk.isOpen.value = false
    }

}
export { AppAlertDialogOk }