import { appStaticStore, appStore, Messages, useToast } from '@src/features'
function useFeedback () {
  const toast = useToast()

  function showAppLoader (toShow: boolean) {
    appStore.appLoader.isOpen.value = toShow
  }

  function showError (message: string) {
    toast({
      title: 'Error',
      description: message,
      status: 'error',
      isClosable: true,
      position: 'bottom-right',
      duration: 10000000
    })
  }

  function showSuccess () {
    toast({
      title: 'Success',
      description: Messages.messSuccess,
      status: 'success',
      isClosable: true,
      position: 'bottom-right',
      duration: 5000
    })
  }

  return { showAppLoader, showError, showSuccess }
}

export { useFeedback }
