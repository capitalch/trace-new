import { Checkbox, Spacer } from '@chakra-ui/react'
import { AppGridSearchBox, ColDef, DeleteIcon, EditIcon, GridOptions, GridReadyEvent, HideIcon, useComponentHistory, useAgGridUtils, useFeedback, useAppGraphql, useCellRenderers, useGranularEffect, useRef, appStore, appStaticStore, IconButton, Tooltip, useDialogs, appGraphqlStrings, Messages, GraphQlQueryResultType, Button, useDeepSignal, AgGridReact, Flex, AppGridToolbar, HStack } from '@src/features'
import { SuperAdminEditNewRole } from './super-admin-edit-new-role'

function useSuperAdminRoles() {
    const { showError } = useFeedback()
    const { getAlternateColorStyle, getPinnedRowStyle, swapId } = useAgGridUtils()
    const { appGraphqlStrings, queryGraphql, handleAndGetQueryResult } = useAppGraphql()
    const { componentNames, isNotInComponentHistory } = useComponentHistory()
    const { addToComponentHistory } = useComponentHistory()
    const gridApiRef: any = useRef(null)
    const { DeleteCellRenderer, EditCellRenderer, HideCellRenderer }
        = useCellRenderers({
            dbName: 'traceAuth'
            , tableName: 'RoleM'
            , appStoreObject: appStore.superAdmin.roles
            , appStaticStoreObject: appStaticStore.superAdmin.roles
            , EditBodyComponent: SuperAdminEditNewRole
            , editTitle: 'Edit super admin role'
        })

    useGranularEffect(() => {
        appStaticStore.superAdmin.roles.doReload = loadData
    }, [], [loadData])

    const onGridReady = (params: GridReadyEvent) => {
        if (isNotInComponentHistory(componentNames.superAdminRoles)) {
            loadData()
            addToComponentHistory(componentNames.superAdminRoles)
        }
    }

    const columnDefs: ColDef[] = [
        {
            headerName: '#',
            field: 'id',
            width: 60
        },
        {
            field: 'roleName',
            headerName: 'Role name',
            headerClass: 'header',
            width: 150
        },
        {
            field: 'descr',
            headerName: 'Description',
            width: 300,
            flex: 1
        },
        {
            cellRenderer: PermissionCellRenderer,
        },
        {
            field: 'rank',
            headerName: 'Rank',
            width: 100
        },
        {
            cellRenderer: DeleteCellRenderer,
            cellStyle: { padding: 0, margin: 0 },
            width: 20
        },
        {
            cellRenderer: HideCellRenderer,
            cellStyle: { padding: 0, margin: 0 },
            width: 20
        },
        {
            cellRenderer: EditCellRenderer,
            cellStyle: { padding: 0, margin: 0 },
            width: 20
        },
    ]

    const defaultColDef: ColDef = {
        resizable: true,
        width: 100,
        filter: true,
    }

    const gridOptions: GridOptions = {
        animateRows: true,
        columnDefs: columnDefs,
        defaultColDef: defaultColDef,
        getRowStyle: getRowStyle,
        onGridReady: onGridReady,
        rowSelection: 'single'
    }


    function getRowStyle(params: any) {
        const style1 = getAlternateColorStyle(params)
        const style2 = getPinnedRowStyle(params)
        const ret = { ...style1, ...style2 }
        return (ret)
    }

    async function loadData() {
        const args = {
            sqlId: 'get_roles',
            sqlArgs: {
                clientId: appStaticStore.login.clientId || 0
            }
        }
        const q = appGraphqlStrings['genericQuery'](args, 'traceAuth')
        gridApiRef.current.api.showLoadingOverlay()
        try {
            const result: GraphQlQueryResultType = await queryGraphql(q)
            const rows: [] = handleAndGetQueryResult(result, 'genericQuery')
            if (rows) {
                appStore.superAdmin.roles.rows.value = rows
                appStaticStore.superAdmin.roles.doFilter()
            }
        } catch (e: any) {
            showError(e.message || Messages.errFetchingData)
            console.log(e.message)
        } finally {
            gridApiRef?.current?.api?.hideOverlay()
        }
    }

    return { columnDefs, defaultColDef, gridApiRef, gridOptions, onGridReady, }
}

export { useSuperAdminRoles }

function PermissionCellRenderer(params: any) {
    const rank = params?.data?.rank || (params?.data?.rank === 0)
    const { showModalDialogA } = useDialogs()
    // let visible = true
    // if((rank) || rank === 0){

    // }
    // B
    return ((!rank) && <Button onClick={handlePermissionClick} size='xs' variant='link' colorScheme='blue'>Permission</Button>)

    function handlePermissionClick() {
        showModalDialogA({
            size: '2xl',
            title: 'Control permissions',
            body: SecuredControlsWithPermissions,
            toShowCloseButton: false,
            defaultData: {}
        })
    }
}

// { roleId }: { roleId: number }
function SecuredControlsWithPermissions() {
    const meta: any = useDeepSignal({ rows: [], filteredRows: [] })
    const { showError } = useFeedback()
    const { getAlternateColorStyle, getPinnedRowStyle, getRowStyle, swapId } = useAgGridUtils()
    const gridApiRef: any = useRef(null)
    const { appGraphqlStrings, queryGraphql, handleAndGetQueryResult } = useAppGraphql()

    const onGridReady = (params: GridReadyEvent) => {
        // if (isNotInComponentHistory(componentNames.superAdminRoles)) {
        loadData()
        // addToComponentHistory(componentNames.superAdminRoles)
    }


    const columnDefs: ColDef[] = [
        {
            headerName: '#',
            field: 'id',
            width: 50
        },
        {
            field: 'controlName',
            headerName: 'Control name',
            headerClass: 'header',
            width: 300,
            flex: 1,
        },
        {
            field: 'controlType',
            headerName: 'Type',
            headerClass: 'header',
            width: 80
        },
        {
            editable: true,
            field: 'isEnabled',
            headerName: 'Enabled',
            headerClass: 'header',
            width: 70,
            cellRenderer: (params: any) => {
            // console.log(params)
            return <Checkbox 
                border='1px solid grey' size='md' mt={1} colorScheme='blue'
                checked={params.data.isEnabled}
                onClick={()=>{
                    params.data.isEnabled = !params.data.isEnabled
                }}
            />}
        },
    ]

    const gridOptions: GridOptions = {
        animateRows: true,
        columnDefs: columnDefs,

        getRowStyle: getRowStyle,
        onGridReady: onGridReady,
        rowSelection: 'single'
    }

    return (
        <Flex h={400} w='100%' className='ag-theme-balham' direction='column'>
            <HStack justifyContent='flex-end' mb={5}>
                <AppGridSearchBox appStaticStoreObject={appStaticStore.permissions} appStoreObject={appStore.permissions} />
            </HStack>
            <AgGridReact
                gridOptions={gridOptions}
                ref={gridApiRef}
                rowData={appStore.permissions.filteredRows.value}
                suppressScrollOnNewData={true}
            />
            <HStack justifyContent='flex-end' mt={2}>
                <Button size='md' variant='solid' colorScheme='blue' onClick={onSubmit}>Submit</Button>
            </HStack>
        </Flex>
    )

    function getArrayFromObject(obj: any) {
        const arr: any[] = []
        for (const key of Object.keys(obj)) {
            const myObj: any = {}
            myObj.securedControlId = key
            myObj.controlType = obj[key].controlType
            myObj.controlName = obj[key].controlName
            myObj.isEnabled = obj[key].isEnabled || true
            myObj.id = obj[key].xId || undefined
            arr.push(myObj)
        }
        return (arr)
    }

    function getControlsObjectFromArray(securedControls: any[]) {
        const secObject: any = {}
        for (const control of securedControls) {
            const controlId: number = control.securedControlId
            secObject[controlId] = { controlType: control.controlType, controlName: control.controlName }
        }
        return (secObject)
    }

    async function loadData() {
        const args = {
            sqlId: 'get_secured_controls_with_permissions',
            sqlArgs: {
                roleId: 4 //roleId
            }
        }
        const q = appGraphqlStrings['genericQuery'](args, 'traceAuth')
        gridApiRef.current.api.showLoadingOverlay()
        try {
            const result: GraphQlQueryResultType = await queryGraphql(q)
            const rows: any[] = handleAndGetQueryResult(result, 'genericQuery')
            if (rows) {
                const jsonResult = rows[0]?.['jsonResult']
                const allSecuredControls: any[] = jsonResult?.securedControls || []
                const permissions: any[] = jsonResult?.permissions || []
                const securedControlsObject = getControlsObjectFromArray(allSecuredControls)
                for (const item of permissions) {
                    securedControlsObject[item.securedControlId].isEnabled = item.isEnabled
                }
                console.log(securedControlsObject)
                const securedControls = getArrayFromObject(securedControlsObject)
                appStore.permissions.rows.value = securedControls
                appStaticStore.permissions.doFilter()
                console.log(appStore.permissions.filteredRows.value)
                // meta.rows.value = securedControls
                // appStore.superAdmin.roles.rows.value = rows
                // appStaticStore.superAdmin.roles.doFilter()
            }
        } catch (e: any) {
            showError(e.message || Messages.errFetchingData)
            console.log(e.message)
        } finally {
            gridApiRef?.current?.api?.hideOverlay()
        }
    }

    async function onSubmit(){
        const fData = appStore.permissions.filteredRows.value
        console.log(fData)
    }
}

export { SecuredControlsWithPermissions }