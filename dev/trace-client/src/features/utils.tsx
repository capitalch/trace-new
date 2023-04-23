import { DeleteIcon, EditIcon, FC, HideIcon, IconButton, Tooltip, useToast } from '@src/libs'
import { appStaticStore, GraphQlQueryResultType, Messages, useAppGraphql } from '@src/features'

function usingAuthUtils() {
  function getAccessTokenFromLS() {
    return (localStorage.getItem('accessToken'))
  }

  function setAccesstokenInLS(accessToken: string) {
    localStorage.setItem('accessToken', accessToken)
  }

  function getRefreshTokenFromLS() {
    return (localStorage.getItem('refreshToken'))
  }

  function setRefreshTokenInLS(refreshToken: string) {
    localStorage.setItem('refreshToken', refreshToken)
  }

  function getIsLoggedInFromLS() {
    const ret = localStorage.getItem('isLoggedIn')
    return (ret === 'true')
  }

  function setIsLoggedInInLS(isLoggedIn: boolean) {
    const is = String(isLoggedIn)
    localStorage.setItem('isLoggedIn', is)
  }

  function getLoginInfoFromLS() {
    const ret = localStorage.getItem('loginInfo') || '{}'
    return (JSON.parse(ret))
  }

  function setLoginInfoInLS(loginInfo: {}) {
    const loginString = JSON.stringify(loginInfo)
    localStorage.setItem('loginInfo', loginString)
  }

  function resetLoginInfoInLS() {
    localStorage.setItem('loginInfo', '')
  }

  return ({ getAccessTokenFromLS, getIsLoggedInFromLS, getLoginInfoFromLS, getRefreshTokenFromLS, resetLoginInfoInLS, setAccesstokenInLS, setIsLoggedInInLS, setLoginInfoInLS, setRefreshTokenInLS })
}

function getHostUrl() {
  const url: any =
    process.env.NODE_ENV === 'development'
      ? process.env.REACT_APP_LOCAL_SERVER_URL
      : window.location.href
  return (url)
}

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

  function getRowStyle(params: any) {
    const style1 = getAlternateColorStyle(params)
    const style2 = getPinnedRowStyle(params)
    const ret = { ...style1, ...style2 }
    return (ret)
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
  return { getAlternateColorStyle, getPinnedRowStyle, getRowStyle, swapId }
}

function useCellRenderers({ dbName, tableName, appStoreObject, appStaticStoreObject, EditBodyComponent, editTitle }: { dbName: string, tableName: string, appStoreObject: any, appStaticStoreObject: any, EditBodyComponent?: FC, editTitle?: string }) {

  function DeleteCellRenderer(props: any) {
    const { showAlertDialogYesNo } = useDialogs()
    const { appGraphqlStrings, handleUpdateResult } = useAppGraphql()
    const { showAppLoader, } = useFeedback()
    const { mutateGraphql } = useAppGraphql()
    // for pinnedBottomRow id is undefined hence props.data.id is undefined. So button not appears on pinned row
    return (
      props.data.id && <Tooltip label='Delete'>
        <IconButton onClick={() => handleDeleteRow(props?.data)} size='xs' mb={1} aria-label='edit' icon={<DeleteIcon color='red.500' />} />
      </Tooltip>)

    function handleDeleteRow(data: any) {
      const deleteId = data?.id1
      showAlertDialogYesNo({ action: () => doDelete(deleteId), title: 'Are you sure to delete this row?' })
    }

    async function doDelete(id: number) {
      const sqlObj = {
        tableName: tableName,
        deletedIds: [id]
      }
      const q = appGraphqlStrings['genericUpdate'](sqlObj, dbName)

      showAppLoader(true)
      const result: GraphQlQueryResultType = await mutateGraphql(q)
      handleUpdateResult(result, () => {
        appStaticStoreObject.doReload()
      })
      showAppLoader(false)
    }
  }

  function HideCellRenderer(props: any) {
    return (
      props.data.id && <Tooltip label='Hide'>
        <IconButton onClick={() => handleHideRow(props.data)} size='xs' mb={1} aria-label='edit' icon={<HideIcon color='gray.500' />} />
      </Tooltip>
    )
    function handleHideRow(data: any) {
      const filteredRows: any[] = appStoreObject.filteredRows.value
      const clone = filteredRows.map((x: any) => ({ ...x }))
      const indexOfRow = clone.findIndex((x: any) => (x.id === data.id))
      clone.splice(indexOfRow, 1)

      appStoreObject.filteredRows.value = clone
    }
  }

  function EditCellRenderer(props: any) {
    const { showModalDialogA } = useDialogs()
    return (
      props.data.id && <Tooltip label='Edit'>
        <IconButton size='xs' onClick={() => handleEditRow(props.data)} mb={1} aria-label='edit' icon={<EditIcon color='blue.500' />} />
      </Tooltip>)

    function handleEditRow(params: any) {
      const obj = { ...params }
      obj.id = params.id1
      // obj.id1 = undefined
      delete obj['id1']
      showModalDialogA({
        title: editTitle || '',
        body: EditBodyComponent || (() => <></>),
        defaultData: {
          ...obj
        }
      })
    }
  }
  return ({ DeleteCellRenderer, EditCellRenderer, HideCellRenderer })
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
    'adminBusinessUnits',
    'adminBusiinessUsers',
    'superAdminAdminUsers',
    'superAdminClients',
    'superAdminRoles',
    'superAdminSecuredControls'
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
    // appStore.alertDialogOk.isOpen.value = true
    // appStore.alertDialogOk.header.value = title
    // appStore.alertDialogOk.body.value = body
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
    // appStore.alertDialogYesNo.action.value = action || (() => { })
    // appStore.alertDialogYesNo.isOpen.value = true
    // appStore.alertDialogYesNo.header.value = title || 'Are you sure'
    // appStore.alertDialogYesNo.body.value = body || b
  }

  function showModalDialogA({
    size,
    title,
    body,
    toShowCloseButton = false,
    defaultData = undefined
  }: {
    size?: string
    title: string
    body: FC
    toShowCloseButton?: boolean
    defaultData?: { [key: string]: any }
  }) {
    // appStore.modalDialogA.size.value = size || 'md'
    // appStore.modalDialogA.title.value = title
    // appStore.modalDialogA.toShowCloseButton.value = toShowCloseButton
    // appStore.modalDialogA.body.value = body
    // appStore.modalDialogA.defaultData.value = defaultData
    // appStore.modalDialogA.isOpen.value = true
  }

  function closeModalDialogA() {
    // appStore.modalDialogA.isOpen.value = false
  }

  function showModalDialogB({
    size,
    title,
    body,
    toShowCloseButton = false,
    defaultData = undefined
  }: {
    size?: string
    title: string
    body: FC
    toShowCloseButton?: boolean
    defaultData?: { [key: string]: any }
  }) {
    // appStore.modalDialogB.size.value = size || 'sm'
    // appStore.modalDialogB.title.value = title
    // appStore.modalDialogB.toShowCloseButton.value = toShowCloseButton
    // appStore.modalDialogB.body.value = body
    // appStore.modalDialogB.defaultData.value = defaultData
    // appStore.modalDialogB.isOpen.value = true
  }

  function closeModalDialogB() {
    // appStore.modalDialogB.isOpen.value = false
  }

  return {
    closeModalDialogA,
    closeModalDialogB,
    showAlertDialogOk,
    showAlertDialogYesNo,
    showModalDialogA,
    showModalDialogB
  }
}

function useFeedback() {
  const toast = useToast()

  function showAppLoader(toShow: boolean) {
    // appStore.appLoader.isOpen.value = toShow
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

export { getHostUrl, useAgGridUtils, usingAuthUtils, useCellRenderers, useComponentHistory, useDialogs, useFeedback, }
