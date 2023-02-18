import { appStaticStore, appStore, GraphQlQueryResultType, Messages, useToast } from '@src/features'
import { FC } from 'react'

function useAgGridUtils() {
  function getAlternateColorStyle(params: any) {
    const id = params?.data?.id
    let ret = undefined
    if (id % 2) {
      ret = {
        backgroundColor: '#f4f0ec'
      }
    }
    return ret
  }

  function getPinnedRowStyle(params: any) {
    if (params.node.rowPinned) {
      return {
        fontWeight: 'bold',
        backgroundColor: '#dbd3d1'
      }
    }
  }

  function swapId(rows: any[]) {
    const ret: any[] = rows.map((row: any, i: number) => {
      const r = { ...row }
      r.id1 = r.id
      r.id = i + 1
      return r
    })
    return ret
  }
  return { getAlternateColorStyle, getPinnedRowStyle, swapId }
}

function useComponentHistory() {
  function addToComponentHistory(componentName: componentNames) {
    appStaticStore.componentHistorySet.add(componentName.toString())
  }

  function removeFromComponentHistory(componentName: componentNames) {
    appStaticStore.componentHistorySet.delete(componentName.toString())
  }

  function isInComponentHistory(componentName: componentNames): boolean {
    return appStaticStore.componentHistorySet.has(componentName.toString())
  }

  function isNotInComponentHistory(componentName: componentNames): boolean {
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

function useDialogs() {
  function showAlertDialogOk({ title, body }: { title: string; body: any }) {
    appStore.alertDialogOk.isOpen.value = true
    appStore.alertDialogOk.header.value = title
    appStore.alertDialogOk.body.value = body
  }

  function showAlertDialogYesNo({
    action,
    title,
    body
  }: {
    action?: () => void
    title?: string;
    body?: any
  }) {
    const b: any = <>This operation cannot be undone </>
    appStore.alertDialogYesNo.action.value = action || (() => { })
    appStore.alertDialogYesNo.isOpen.value = true
    appStore.alertDialogYesNo.header.value = title || 'Are you sure'
    appStore.alertDialogYesNo.body.value = body || b
  }

  function showModalDialogA({
    title,
    body,
    toShowCloseButton = false,
    defaultData = undefined
  }: {
    title: string
    body: FC
    toShowCloseButton?: boolean
    defaultData?: { [key: string]: any }
  }) {
    appStore.modalDialogA.title.value = title
    appStore.modalDialogA.toShowCloseButton.value = toShowCloseButton
    appStore.modalDialogA.body.value = body
    appStore.modalDialogA.defaultData.value = defaultData
    appStore.modalDialogA.isOpen.value = true
  }

  function closeModalDialogA() {
    appStore.modalDialogA.isOpen.value = false
  }

  return {
    closeModalDialogA,
    showAlertDialogOk,
    showAlertDialogYesNo,
    showModalDialogA
  }
}

function useFeedback() {
  const toast = useToast()

  function showAppLoader(toShow: boolean) {
    appStore.appLoader.isOpen.value = toShow
  }

  function showError(message: string) {
    toast({
      title: 'Error',
      description: message,
      status: 'error',
      isClosable: true,
      position: 'bottom-right',
      duration: 10000000
    })
  }

  function showSuccess() {
    toast({
      title: 'Success',
      description: Messages.messSuccess,
      status: 'success',
      isClosable: true,
      position: 'bottom-right',
      duration: 3000
    })
  }

  return { showAppLoader, showError, showSuccess }
}

// function useQueryResult() {
//   const { showError, showSuccess } = useFeedback()

//   function handleUpdateResult(result: GraphQlQueryResultType, actionWhenSuccess?: () => void, queryName: string ='genericUpdate'): boolean {
//     const res: any = result?.data?.[queryName]  //result.data[queryName]
//     let ret = false
//     const handleSuccess = () => {
//       showSuccess()
//       if (actionWhenSuccess) {
//         actionWhenSuccess()
//       }
//     }
//     if (res) {
//       if (res?.error) {
//         const detail = res.error.detail
//         const errorCode = res.error.errorCode
//         const exception = res.error.exception
//         const message = `${errorCode}, ${detail}`
//         ret = true
//         showError(message)
//         console.log(exception)
//       } else {
//         handleSuccess()
//       }
//     } else { // successful delete returns null
//       handleSuccess()
//     }
//     return (ret)
//   }

//   function handleAndGetQueryResult(result: GraphQlQueryResultType, queryName: string = 'genericQuery'): any {
//     const res: any = result?.data?.[queryName]
//     if (res) {
//       if (res?.error) {
//         const detail = res.error.detail
//         const errorCode = res.error.errorCode
//         const exception = res.error.exception
//         const message = `${errorCode}, ${detail}`
//         showError(message)
//         console.log(exception)
//       }
//     }
//     return (res)
//   }

//   return ({ handleUpdateResult, handleAndGetQueryResult })
// }

export { useAgGridUtils, useComponentHistory, useDialogs, useFeedback, }
