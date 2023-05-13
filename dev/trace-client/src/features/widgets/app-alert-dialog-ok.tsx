import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useRef } from '@src/libs'
import { appStore } from '@src/features'

function AppAlertDialogOk() {
    const cancelRef: any = useRef()
    return (
        <AlertDialog closeOnOverlayClick={false} isCentered size='xs'
            isOpen={appStore.alertDialogOk.isOpen.value}
            leastDestructiveRef={cancelRef}
            onClose={handleOnClose}>
            <AlertDialogOverlay />
            <AlertDialogContent >
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    {appStore.alertDialogOk.header.value}
                </AlertDialogHeader>
                <AlertDialogBody>
                    <appStore.alertDialogOk.body.value />
                </AlertDialogBody>
                <AlertDialogFooter>
                    <Button ref={cancelRef} onClick={handleOnClose}>
                        OK
                    </Button>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )

    function handleOnClose() {
        appStore.alertDialogOk.isOpen.value = false
    }
}
export { AppAlertDialogOk }