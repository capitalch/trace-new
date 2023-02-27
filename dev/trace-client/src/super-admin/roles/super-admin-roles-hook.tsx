import { ColDef, DeleteIcon, EditIcon, GridOptions, GridReadyEvent, HideIcon, useComponentHistory, useAgGridUtils, useFeedback, useAppGraphql,useCellRenderers, useGranularEffect, useRef, appStore,  appStaticStore, IconButton, Tooltip,  useDialogs, appGraphqlStrings, Messages, GraphQlQueryResultType } from '@src/features'
import { SuperAdminEditNewRole } from './super-admin-edit-new-role'

function useSuperAdminRoles() {
    const { handleAndGetQueryResult } = useAppGraphql()
    const { showError } = useFeedback()
    const { getAlternateColorStyle, getPinnedRowStyle, swapId } = useAgGridUtils()
    const { appGraphqlStrings, queryGraphql, } = useAppGraphql()
    const { componentNames, isNotInComponentHistory } = useComponentHistory()
    const { addToComponentHistory } = useComponentHistory()
    const gridApiRef: any = useRef(null)
    const { DeleteCellRenderer,EditCellRenderer, HideCellRenderer } 
    = useCellRenderers({ 
        dbName: 'traceAuth'
        , tableName: 'RoleM'
        ,appStoreObject:appStore.superAdmin.roles
        , appStaticStoreObject: appStaticStore.superAdmin.roles 
        , EditBodyComponent: SuperAdminEditNewRole
        , editTitle:'Edit super admin role'
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
            field: 'permission',
            headerName: 'Permission',
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
            sqlId: 'get_super_admin_roles',
        }
        const q = appGraphqlStrings['genericQuery'](args, 'traceAuth')
        gridApiRef.current.api.showLoadingOverlay()
        try {
            const result: GraphQlQueryResultType = await queryGraphql(q)
            const rows: [] = handleAndGetQueryResult(result, 'genericQuery')
            if (rows && (rows.length > 0)) {
                appStore.superAdmin.roles.rows.value = rows
                appStaticStore.superAdmin.roles.doFilter()
            }
        } catch (e: any) {
            showError(e.message || Messages.errFetchingData)
            console.log(e.message)
        } finally {
            gridApiRef.current.api.hideOverlay()
        }
    }

    return { columnDefs, defaultColDef, gridApiRef, gridOptions, onGridReady, }
}

export { useSuperAdminRoles }

// function EditCellRenderer(props: any) {
//     const { showModalDialogA } = useDialogs()
//     return (
//         props.data.id && <Tooltip label='Edit'>
//             <IconButton size='xs' onClick={() => handleEditRow(props.data)} mb={1} aria-label='edit' icon={<EditIcon color='blue.500' />} />
//         </Tooltip>)

//     function handleEditRow(params: any) {
//         const obj = { ...params }
//         obj.id = obj.id1
//         delete obj['id1']
//         showModalDialogA({
//             title: 'Edit super admin role',
//             body: SuperAdminEditNewRole,
//             defaultData: {
//                 ...obj
//             }
//         })
//     }
// }
// export { EditCellRenderer }

// function DeleteCellRenderer(props: any) {
//     const { showAlertDialogYesNo } = useDialogs()
//     const { handleUpdateResult } = useAppGraphql()
//     const { showAppLoader, } = useFeedback()
//     const { mutateGraphql } = useAppGraphql()
//     // for pinnedBottomRow id is undefined hence props.data.id is undefined. So button not appears on pinned row
//     return (
//         props.data.id && <Tooltip label='Delete'>
//             <IconButton onClick={() => handleDeleteRow(props?.data)} size='xs' mb={1} aria-label='edit' icon={<DeleteIcon color='red.500' />} />
//         </Tooltip>)

//     function handleDeleteRow(data: any) {
//         const deleteId = data?.id1
//         showAlertDialogYesNo({ action: () => doDelete(deleteId), title: 'Are you sure to delete this row?' })
//     }

//     async function doDelete(id: number) {
//         const sqlObj = {
//             tableName: 'RoleM',
//             deletedIds: [id]
//         }
//         const q = appGraphqlStrings['genericUpdate'](sqlObj, 'traceAuth')

//         showAppLoader(true)
//         const result: GraphQlQueryResultType = await mutateGraphql(q)
//         handleUpdateResult(result, () => {
//             appStaticStore.superAdmin.roles.doReload()
//         })
//         showAppLoader(false)
//     }
// }
// export { DeleteCellRenderer }

// function HideCellRenderer(props: any) {
//     return (
//         props.data.id && <Tooltip label='Hide'>
//             <IconButton onClick={() => handleHideRow(props.data)} size='xs' mb={1} aria-label='edit' icon={<HideIcon color='gray.500' />} />
//         </Tooltip>
//     )
//     function handleHideRow(data: any) {
//         const filteredRows: any[] = appStore.superAdmin.roles.filteredRows.value
//         const clone = filteredRows.map((x: any) => ({ ...x }))
//         const indexOfRow = clone.findIndex((x: any) => (x.id === data.id))
//         clone.splice(indexOfRow, 1)

//         appStore.superAdmin.roles.filteredRows.value = clone
//     }
// }
// export { HideCellRenderer }