import { ColDef, DeleteIcon, EditIcon, GridOptions, GridReadyEvent, HideIcon, useComponentHistory, useAgGridUtils, useFeedback, useAppGraphql, useCellRenderers, useGranularEffect, useRef, appStore, appStaticStore, IconButton, Tooltip, useDialogs, appGraphqlStrings, Messages, GraphQlQueryResultType, Button, useDeepSignal, AgGridReact } from '@src/features'
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
            // cellRendererParams: {
            //     clicked: (field: any) => {
            //         alert(field)
            //     }
            // }
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
            title: 'Control permissions',
            body: () => <SecuredControlsWithPermissions roleId={4} />,
            toShowCloseButton: true,
            defaultData: {}
        })
    }
}

function SecuredControlsWithPermissions({ roleId }: { roleId: number }) {
    const meta: any = useDeepSignal({ rows: [] })
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
            width: 60
        },
    ]

    const gridOptions: GridOptions = {
        animateRows: true,
        columnDefs: columnDefs,

        getRowStyle: getRowStyle,
        onGridReady: onGridReady,
        rowSelection: 'single'
    }

    // useGranularEffect(() => {
    //     loadData()
    // }, [], [loadData])

    return (
        <AgGridReact
            gridOptions={gridOptions}
            ref={gridApiRef}
            rowData={appStore.superAdmin.roles.filteredRows.value}
            suppressScrollOnNewData={true}
        />
    )

    async function loadData() {
        const args = {
            sqlId: 'get_secured_controls_with_permissions',
            sqlArgs: {
                roleId: roleId
            }
        }
        const q = appGraphqlStrings['genericQuery'](args, 'traceAuth')
        gridApiRef.current.api.showLoadingOverlay()
        try {
            const result: GraphQlQueryResultType = await queryGraphql(q)
            const rows: any[] = handleAndGetQueryResult(result, 'genericQuery')
            if (rows) {
                const jsonResult = rows[0]?.['jsonResult']
                console.log(jsonResult)
                meta.rows.value = []
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
}