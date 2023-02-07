import { AlertDialog, AlertDialogHeader, AlertDialogBody, useRef, appStore, AlertDialogOverlay, AlertDialogContent, Heading, AlertDialogFooter, Button, CloseButton, HStack, } from '@src/features'

function AppAlertDialogYesNo() {
    const cancelRef: any = useRef()

    return (<AlertDialog closeOnOverlayClick={false}
        isOpen={appStore.alertDialogYesNo.isOpen.value}
        leastDestructiveRef={cancelRef}
        onClose={handleOnClose}>
        <AlertDialogOverlay />
        <AlertDialogContent>
            <AlertDialogHeader>
                <HStack justifyContent='space-between'>
                    <Heading size='md'>{appStore.alertDialogYesNo.header.value}</Heading>
                    <CloseButton onClick={handleOnClose} />
                </HStack>
            </AlertDialogHeader>
            <AlertDialogBody>
                {appStore.alertDialogYesNo.body.value}
            </AlertDialogBody>
            <AlertDialogFooter justifyContent='flex-end' columnGap={5}>
                <Button minW={100} size='md' variant='solid' colorScheme='red' onClick={handleYes}>Yes</Button>
                <Button minW={100} size='md' variant='solid' colorScheme='blue' ref={cancelRef} onClick={handleNo}>No</Button>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>)

    function handleOnClose() {
        appStore.alertDialogYesNo.isOpen.value = false
    }

    function handleNo() {
        appStore.alertDialogYesNo.result.value = false
        appStore.alertDialogYesNo.isOpen.value = false
    }

    function handleYes() {
        appStore.alertDialogYesNo.result.value = true
        appStore.alertDialogYesNo.action.value()
        appStore.alertDialogYesNo.isOpen.value = false
    }
}
export { AppAlertDialogYesNo }