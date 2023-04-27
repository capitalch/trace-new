import { appStore, AppStoreType} from '@src/features'
import { Modal, ModalBody, ModalOverlay, Spinner, State, useHookstate } from '@src/libs'
function AppLoader() {
    const store: State<AppStoreType> = useHookstate<AppStoreType>(appStore)
    const isOpen = store.appLoader.isOpen.value
    return (
        <Modal isOpen={isOpen} onClose={handleOnClose} closeOnOverlayClick={false} >
            <ModalOverlay />
            <ModalBody zIndex={100000} style={{ position: 'absolute', left: '50%', bottom: '40%' }} >
                <Spinner size='xl' colorScheme='blue' />
            </ModalBody>
        </Modal>
    )

    function handleOnClose() {
        store.appLoader.isOpen.set(false)
    }
}

export { AppLoader }