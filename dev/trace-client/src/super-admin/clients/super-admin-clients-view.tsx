import { AgGridReact, ColDef, DeleteIcon, EditIcon, GridOptions, useComponentHistory, useAgGridUtils, useFeedback, useAppGraphql, useGranularEffect, useQueryResult, useRef, Box, appStore, Flex, HStack, GridApi, appStaticStore, Button, IconButton, CloseIcon, Tooltip, useState, useDialogs, appGraphqlStrings, Messages, GraphQlQueryResultType } from '@src/features'
import { FirstDataRenderedEvent, GridReadyEvent, RowDataUpdatedEvent } from 'ag-grid-community';
import { filter } from 'lodash';
import { SuperAdminEditNewClient } from './super-admin-edit-new-client';
import { SuperAdminEditNewClientExtDatabase } from './super-admin-edit-new-client-ext-database';

function SuperAdminClientsView() {
    const { handleAndGetQueryResult } = useQueryResult()
    const { getAlternateColorStyle, getPinnedRowStyle, swapId } = useAgGridUtils()
    const { appGraphqlStrings, queryGraphql, } = useAppGraphql()
    const { componentNames, isNotInComponentHistory } = useComponentHistory()
    const { addToComponentHistory } = useComponentHistory()
    const gridApiRef: any = useRef(null)

    // Alternative of useEffect. Dependency array can be blank with no warning
    useGranularEffect(() => {
        appStaticStore.superAdmin.doReload = loadData
        // appStaticStore.superAdmin.doRefresh = () => doRefresh({})
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
            headerName: 'Index',
            field: 'id',
            // headerCheckboxSelection: true,
            width: 80
        },
        {
            field: 'clientCode',
            filter: true,
            headerClass: 'header',
            width: 100
        },
        {
            field: 'clientName',
            width: 200,
            resizable: true,
            flex: 1
        },
        {
            field: 'dbName',
            width: 150
        },
        {
            field: 'isActive',
            width: 40
        },
        {
            cellRenderer: EditCellRenderer,
            cellStyle: { padding: 0, margin: 0 },
            width: 20
        },
        {
            cellRenderer: DeleteCellRenderer,
            cellStyle: { padding: 0, margin: 0 },
            width: 20
        },
        {
            cellRenderer: RemoveCellRenderer,
            cellStyle: { padding: 0, margin: 0 },
            width: 20
        }
    ]

    const gridOptions: GridOptions = {
        animateRows: true,
        columnDefs: columnDefs,
        getRowStyle: getRowStyle,
        onGridReady: onGridReady,
        // rowBuffer: 20,
        // rowData: appStore.superAdmin.filteredRows.value,
        rowSelection: 'single'
    }

    return (
        <Box h='100%' w='100%' className="ag-theme-balham" mt={5}>

            <AgGridReact
                gridOptions={gridOptions}
                onRowDataUpdated={(ev: RowDataUpdatedEvent<any>) => {
                    const api = gridApiRef.current.api // ev.api
                    const model: any = api.getModel()
                    const visibleRows: any[] = model.rowsToDisplay
                    api.setPinnedBottomRowData([{ 'clientCode': 'Rows:', clientName: visibleRows.length }])
                }}
                onFilterChanged={(ev: any) => {
                    const api = gridApiRef.current.api //ev.api
                    const model: any = api.getModel()
                    const visibleRows: any[] = model.rowsToDisplay
                    api.setPinnedBottomRowData([{ 'clientCode': 'Rows:', clientName: visibleRows.length }])
                }}
                ref={gridApiRef}
                rowData={appStore.superAdmin.filteredRows.value}
                suppressScrollOnNewData={true}
            />
        </Box>
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
            sqlArgs:{
                noOfRows:appStore.superAdmin.noOfRows.value
            }
        }
        const q = appGraphqlStrings['genericQuery'](args, 'traceAuth')
        gridApiRef.current.api.showLoadingOverlay()
        const result: GraphQlQueryResultType = await queryGraphql(q)
        const rows: [] = handleAndGetQueryResult(result)
        if (rows && (rows.length > 0)) {
            appStore.superAdmin.rows.value = rows
            appStaticStore.superAdmin.doFilter()
        }
        gridApiRef.current.api.hideOverlay()
    }
}

export { SuperAdminClientsView }

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

        const obj = { ...params, host: dbParams.host, userName: dbParams.userName, password: dbParams.password, port: dbParams.port, url: dbParams.url }
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
    const { showError, showSuccess } = useFeedback()
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
        const ret = await mutateGraphql(q)
        const err = ret?.data?.genericUpdate?.error
        if (err) {
            showError(`${err.errorCode}, ${Messages.errGenericServerError}`)
        } else {
            appStaticStore.superAdmin.doReload()
            showSuccess()
        }
    }
}
export { DeleteCellRenderer }

function RemoveCellRenderer(props: any) {

    return (
        props.data.id && <Tooltip label='Remove'>
            <IconButton onClick={() => handleRemoveRow(props.data)} size='xs' mb={1} aria-label='edit' icon={<CloseIcon color='gray.500' />} />
        </Tooltip>
    )
    function handleRemoveRow(data: any) {
        const filteredRows: any[] = appStore.superAdmin.filteredRows.value
        const clone = filteredRows.map((x: any) => ({ ...x }))
        const indexOfRow = clone.findIndex((x: any) => (x.id === data.id))
        clone.splice(indexOfRow, 1)

        appStore.superAdmin.filteredRows.value = clone
    }
}
export { RemoveCellRenderer }

// const st = new Date().getTime()
// const ret = await queryGraphql(q)
// const en = (new Date()).getTime()
// console.log(en - st, ret)