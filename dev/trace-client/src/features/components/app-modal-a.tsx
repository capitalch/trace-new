import {
  appStore,
  Box,
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
  useDisclosure,
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

    })
    const subs2 = filterOn(AppConstants.IBUKI_MESSAGE_APP_MODAL_A_CLOSE).subscribe(onClose)
    return (() => {
      subs1.unsubscribe()
      subs2.unsubscribe()
    })
  }, [])

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{meta.title.value}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <meta.body.value />
            <Box>Test</Box>
            {/* <Lorem count={2} /> */}
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
  function showAppModalA(title: string, body?: React.FC) {
    emit('IBUKI_MESSAGE_APP_MODAL_A_OPEN', { title: title, body: body })
  }
  function onCloseAppModalA() {
    emit('IBUKI_MESSAGE_APP_MODAL_A_CLOSE', null)
  }

  return { showAppModalA, onCloseAppModalA }
}

export { useAppModalA }
