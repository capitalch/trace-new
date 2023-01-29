import {
  Button,
  emit,
  filterOn,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDeepSignal,
  useEffect,
  AppConstants,
  React,
} from "@src/features"

function AppModalA() {
  const meta: any = useDeepSignal({
    isOpen: false,
    title: undefined,
    toShowCloseButton: true,
    body: () => <></>
  })
  const isOpen = meta.isOpen.value

  useEffect(() => {
    const subs1 = filterOn(AppConstants.IBUKI_MESSAGE_APP_MODAL_A_OPEN).subscribe((d: any) => {
      meta.title.value = d.data.title
      meta.isOpen.value = true
      meta.toShowCloseButton.value = d.data.toShowCloseButton
      meta.body.value = d.data.body || (() => <></>)
    })
    const subs2 = filterOn(AppConstants.IBUKI_MESSAGE_APP_MODAL_A_CLOSE).subscribe(() => {
      meta.isOpen.value = false
    })
    return (() => {
      subs1.unsubscribe()
      subs2.unsubscribe()
    })
  }, [meta.isOpen, meta.title, meta.toShowCloseButton, meta.body])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false} >
        <ModalOverlay />
        <ModalContent pb={2}>
          <ModalHeader>{meta.title.value}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <meta.body.value />
          </ModalBody>
          {meta.toShowCloseButton.value && <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>}
        </ModalContent>
      </Modal>
    </>
  )

  function onClose() {
    meta.isOpen.value = false
  }
}

export { AppModalA }

function useAppModalA() {
  function showAppModalA(title: string, toShowCloseButton: boolean, body?: React.FC,) {
    emit('IBUKI_MESSAGE_APP_MODAL_A_OPEN', { title: title, body: body, toShowCloseButton: toShowCloseButton })
  }
  function onCloseAppModalA() {
    emit('IBUKI_MESSAGE_APP_MODAL_A_CLOSE', null)
  }

  return { showAppModalA, onCloseAppModalA }
}

export { useAppModalA }
