import { appStaticStore, appStore, Messages, useToast } from '@src/features'

function useAgGridUtils () {
  function getAlternateColorStyle (params: any) {
    const id = params?.data?.id
    let ret = undefined
    if (id % 2) {
      ret = {
        backgroundColor: '#f4f0ec'
      }
    }
    return ret
  }

  function getPinnedRowStyle (params: any) {
    if (params.node.rowPinned) {
      return {
        fontWeight: 'bold',
        backgroundColor: '#ADD8E6'
      }
    }
  }
  return { getAlternateColorStyle, getPinnedRowStyle }
}

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

function useComponentHistory () {
  function addToComponentHistory (componentName: componentNames) {
    appStaticStore.componentHistorySet.add(componentName.toString())
  }

  function removeFromComponentHistory (componentName: componentNames) {
    appStaticStore.componentHistorySet.delete(componentName.toString())
  }

  function isInComponentHistory (componentName: componentNames): boolean {
    return appStaticStore.componentHistorySet.has(componentName.toString())
  }

  function isNotInComponentHistory (componentName: componentNames): boolean {
    return !appStaticStore.componentHistorySet.has(componentName.toString())
  }

  enum componentNames {
    'superAdminClientsView'
  }

  return {
    addToComponentHistory,
    componentNames,
    isInComponentHistory,
    isNotInComponentHistory,
    removeFromComponentHistory
  }
}

export { useAgGridUtils, useComponentHistory, useFeedback }
