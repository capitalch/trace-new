import { AgGridReact, AppGridToolbar, ColDef, DeleteIcon, EditIcon, GridOptions, GridReadyEvent, RowDataUpdatedEvent, useComponentHistory, useAgGridUtils, useFeedback, useAppGraphql, useGranularEffect, useRef, Box, appStore, Flex, HStack, GridApi, appStaticStore, Button, IconButton, CloseIcon, Tooltip, useState, useDialogs, appGraphqlStrings, Messages, GraphQlQueryResultType } from '@src/features'

function useSuperAdminRoles() {
    const { handleAndGetQueryResult } = useAppGraphql()
    const { showError } = useFeedback()
    const { getAlternateColorStyle, getPinnedRowStyle, swapId } = useAgGridUtils()
    const { appGraphqlStrings, queryGraphql, } = useAppGraphql()
    const { componentNames, isNotInComponentHistory } = useComponentHistory()
    const { addToComponentHistory } = useComponentHistory()
    const gridApiRef: any = useRef(null)

    useGranularEffect(() => {
        appStaticStore.superAdmin.roles.doReload = loadData
    }, [], [])

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

    return { columnDefs, defaultColDef, gridApiRef, gridOptions, onGridReady }
}

export { useSuperAdminRoles }

function EditCellRenderer(props: any) {
    const { showModalDialogA } = useDialogs()
    return (
        props.data.id && <Tooltip label='Edit'>
            <IconButton size='xs' onClick={() => handleEditRow(props.data)} mb={1} aria-label='edit' icon={<EditIcon fontSize={18} color='teal.500' />} />
        </Tooltip>)

    function handleEditRow(params: any) {
        params.id = params.id1
        params.id1 = undefined

        const dbParams = params?.dbParams || {}

        const obj = { ...params, host: dbParams.host, user: dbParams.user, password: dbParams.password, port: dbParams.port, url: dbParams.url }
        delete obj['id1']
        showModalDialogA({
            title: 'Edit client',
            body: () => <></>, //params?.isExternalDb ? SuperAdminEditNewClientExtDatabase : SuperAdminEditNewClient,
            defaultData: {
                ...obj
            }
        })
    }
}
export { EditCellRenderer }

function DeleteCellRenderer(props: any) {
    const { showAlertDialogYesNo } = useDialogs()
    const { handleUpdateResult } = useAppGraphql()
    const { showAppLoader, } = useFeedback()
    const { mutateGraphql } = useAppGraphql()
    // for pinnedBottomRow id is undefined hence props.data.id is undefined. So button not appears on pinned row
    return (
        props.data.roleName && <Tooltip label='Delete'>
            <IconButton onClick={() => handleDeleteRow(props?.data)} size='xs' mb={1} aria-label='edit' icon={<DeleteIcon fontSize={18} color='red.500' />} />
        </Tooltip>)

    function handleDeleteRow(data: any) {
        const deleteId = data?.id1
        showAlertDialogYesNo({ action: () => doDelete(deleteId), title: 'Are you sure to delete this row?' })
    }

    async function doDelete(id: number) {
        const sqlObj = {
            tableName: 'TestM',
            deletedIds: [id]
        }
        const q = appGraphqlStrings['genericUpdate'](sqlObj, 'traceAuth')

        showAppLoader(true)
        const result: GraphQlQueryResultType = await mutateGraphql(q)
        handleUpdateResult(result, () => {
            appStaticStore.superAdmin.clients.doReload()
        })
        showAppLoader(false)
    }
}
export { DeleteCellRenderer }

function HideCellRenderer(props: any) {

    return (
        props.data.id && <Tooltip label='Hide'>
            <IconButton onClick={() => handleHideRow(props.data)} size='xs' mb={1} aria-label='edit' icon={<CloseIcon color='gray.500' />} />
        </Tooltip>
    )
    function handleHideRow(data: any) {
        const filteredRows: any[] = appStore.superAdmin.clients.filteredRows.value
        const clone = filteredRows.map((x: any) => ({ ...x }))
        const indexOfRow = clone.findIndex((x: any) => (x.id === data.id))
        clone.splice(indexOfRow, 1)

        appStore.superAdmin.clients.filteredRows.value = clone
    }
}
export { HideCellRenderer }