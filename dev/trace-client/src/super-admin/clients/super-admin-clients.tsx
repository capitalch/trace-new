import { AgGridReact, AppGridToolbar, ColDef, DeleteIcon, EditIcon, GridOptions, useComponentHistory, useAgGridUtils, useFeedback, useAppGraphql, useGranularEffect, useQueryResult, useRef, Box, appStore, Flex, HStack, GridApi, appStaticStore, Button, IconButton, CloseIcon, Tooltip, useState, useDialogs, appGraphqlStrings, Messages, GraphQlQueryResultType } from '@src/features'
import { GridReadyEvent, RowDataUpdatedEvent } from 'ag-grid-community'
import { SuperAdminEditNewClient } from './super-admin-edit-new-client'
import { SuperAdminEditNewClientExtDatabase } from './super-admin-edit-new-client-ext-database'
import { SuperAdminNewClientButtons } from './super-admin-new-client-buttons'

function SuperAdminClients() {
    const { handleAndGetQueryResult } = useQueryResult()
    const { showError } = useFeedback()
    const { getAlternateColorStyle, getPinnedRowStyle, swapId } = useAgGridUtils()
    const { appGraphqlStrings, queryGraphql, } = useAppGraphql()
    const { componentNames, isNotInComponentHistory } = useComponentHistory()
    const { addToComponentHistory } = useComponentHistory()
    const gridApiRef: any = useRef(null)

    // Alternative of useEffect. Dependency array can be blank with no warning
    useGranularEffect(() => {
        appStaticStore.superAdmin.doReload = loadData
    }, [], [])

    const onGridReady = (params: GridReadyEvent) => {
        if (isNotInComponentHistory(componentNames.superAdminClientsView)) {
            loadData()
            addToComponentHistory(componentNames.superAdminClientsView)
        }
    }

    const columnDefs: ColDef[] = [
        {
            // checkboxSelection: true,
            headerName: '#',
            field: 'id',
            // headerCheckboxSelection: true,
            width: 80
        },
        {
            field: 'id1',
            headerName: 'Client id',
            headerClass: 'header',
            filter: 'agNumberColumnFilter',
            width: 100
        },
        {
            field: 'clientCode',
            headerClass: 'header',
            width: 200
        },
        {
            field: 'clientName',
            width: 300,
            flex: 1
        },
        {
            field: 'dbName',
            width: 250
        },
        {
            headerName: 'Active',
            field: 'isActive',
            width: 80
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

    return (
        <Flex h='100%' w='100%' direction='column' className="ag-theme-balham" >
            {/* <SuperAdminClientsToolbar /> */}
            <AppGridToolbar storeObjectName='superAdmin' title='All clients view' CustomControl={SuperAdminNewClientButtons} />
            {/* customControl={()=><SuperAdminNewClientButtons storeObjectName='superAdmin' /> */}
            <AgGridReact
                gridOptions={gridOptions}
                onRowDataUpdated={(ev: RowDataUpdatedEvent<any>) => {
                    const api = gridApiRef.current.api
                    const model: any = api.getModel()
                    const visibleRows: any[] = model.rowsToDisplay
                    api.setPinnedBottomRowData([{ id1: 'Rows:', clientCode: visibleRows.length }])
                }}
                onFilterChanged={(ev: any) => {
                    const api = gridApiRef.current.api
                    const model: any = api.getModel()
                    const visibleRows: any[] = model.rowsToDisplay
                    api.setPinnedBottomRowData([{ id1: 'Rows:', clientCode: visibleRows.length }])
                }}
                ref={gridApiRef}
                rowData={appStore.superAdmin.filteredRows.value}
                suppressScrollOnNewData={true}
            />
        </Flex>
    )

    function getRowStyle(params: any) {
        const style1 = getAlternateColorStyle(params)
        const style2 = getPinnedRowStyle(params)
        const ret = { ...style1, ...style2 }
        return (ret)
    }

    async function loadData() {
        const args = {
            sqlId: 'get_all_clients',
            sqlArgs: {
                noOfRows: appStore.superAdmin.noOfRows.value || null
            }
        }
        const q = appGraphqlStrings['queryClients'](args, 'traceAuth')
        gridApiRef.current.api.showLoadingOverlay()
        try {
            const result: GraphQlQueryResultType = await queryGraphql(q)
            const rows: [] = handleAndGetQueryResult(result)
            if (rows && (rows.length > 0)) {
                appStore.superAdmin.rows.value = rows
                appStaticStore.superAdmin.doFilter()
            }
        } catch (e: any) {
            showError(e.message || Messages.errFetchingData)
            console.log(e.message)
        } finally {
            gridApiRef.current.api.hideOverlay()
        }
    }
}

export { SuperAdminClients }

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
            body: params?.isExternalDb ? SuperAdminEditNewClientExtDatabase : SuperAdminEditNewClient,
            defaultData: {
                ...obj
            }
        })
    }
}
export { EditCellRenderer }

function DeleteCellRenderer(props: any) {
    const { showAlertDialogYesNo } = useDialogs()
    const { handleUpdateResult } = useQueryResult()
    const { showAppLoader, showError, showSuccess } = useFeedback()
    const { mutateGraphql } = useAppGraphql()
    // for pinnedBottomRow id is undefined hence props.data.id is undefined. So button not appears on pinned row
    return (
        props.data.id && <Tooltip label='Delete'>
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
        handleUpdateResult(result,  () => {
            appStaticStore.superAdmin.doReload()
        })
        showAppLoader(false)

        // const err = result?.data?.genericUpdate?.error
        // if (err) {
        //     showError(`${err.errorCode}, ${Messages.errGenericServerError}`)
        // } else {
        //     appStaticStore.superAdmin.doReload()
        //     showSuccess()
        // }
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
        const filteredRows: any[] = appStore.superAdmin.filteredRows.value
        const clone = filteredRows.map((x: any) => ({ ...x }))
        const indexOfRow = clone.findIndex((x: any) => (x.id === data.id))
        clone.splice(indexOfRow, 1)

        appStore.superAdmin.filteredRows.value = clone
    }
}
export { HideCellRenderer }

// const st = new Date().getTime()
// const ret = await queryGraphql(q)
// const en = (new Date()).getTime()
// console.log(en - st, ret)