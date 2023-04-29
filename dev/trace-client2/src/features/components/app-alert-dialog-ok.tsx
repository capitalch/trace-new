import { AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Button, useRef, useHookstate, State } from '@src/libs'
import { appStore, AppStoreType } from '@src/features'

function AppAlertDialogOk() {
    const store: State<AppStoreType> = useHookstate<AppStoreType>(appStore)
    const cancelRef: any = useRef()
    const AlertBody = store.alertDialogOk.get({ noproxy: true }).body
    return (
        <AlertDialog closeOnOverlayClick={false} isCentered size='xs'
            isOpen={store.alertDialogOk.isOpen.value}
            leastDestructiveRef={cancelRef}
            onClose={handleOnClose}>
            <AlertDialogOverlay />
            <AlertDialogContent >
                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                    {store.alertDialogOk.header.value}
                </AlertDialogHeader>
                <AlertDialogBody>
                    <AlertBody />
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
        store.alertDialogOk.isOpen.set(false)
    }
}
export { AppAlertDialogOk }