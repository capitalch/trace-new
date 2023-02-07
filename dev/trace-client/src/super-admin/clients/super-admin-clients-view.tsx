import { _, AgGridReact, ColDef, DeleteIcon, EditIcon, GridOptions, useComponentHistory, useAgGridUtils, useEffect, useFeedback, useAppGraphql, useGranularEffect, useMemo, useRef, Box, appStore, Flex, HStack, GridApi, appStaticStore, Button, IconButton, CloseIcon, Tooltip, useState, useDialogs, appGraphqlStrings } from '@src/features'
import { FirstDataRenderedEvent, GridReadyEvent, RowDataUpdatedEvent } from 'ag-grid-community';
import { filter } from 'lodash';

function SuperAdminClientsView() {
    // const [, doRefresh] = useState({})
    const { getAlternateColorStyle, getPinnedRowStyle, swapId } = useAgGridUtils()
    const { appGraphqlStrings, queryGraphql,  } = useAppGraphql()
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
        }
        const q = appGraphqlStrings['genericQuery'](args, 'traceAuth')

        gridApiRef.current.api.showLoadingOverlay()
        const st = new Date().getTime()
        const ret = await queryGraphql(q)
        const en = (new Date()).getTime()
        console.log(en - st, ret)
        const rows: [] = ret?.data?.genericQuery

        if (rows && (rows.length > 0)) {
            appStore.superAdmin.rows.value = rows
            appStaticStore.superAdmin.doFilter()
            // const filteredRows = rows.map((x: any) => ({ ...x }))
            // swapId(filteredRows)
            // appStore.superAdmin.filteredRows.value = filteredRows
            // swapId(appStore.superAdmin.filteredRows.value)
            // console.log(appStore.superAdmin.filteredRows.value)
        }

        gridApiRef.current.api.hideOverlay()
    }
}

export { SuperAdminClientsView }

function EditCellRenderer(props: any) {
    return (
        props.data.id && <Tooltip label='Edit'>
            <IconButton size='xs' onClick={() => handleEditRow(props.data)} mb={1} aria-label='edit' icon={<EditIcon fontSize={18} color='teal.500' />} />
        </Tooltip>)
    function handleEditRow(params: any) {
        console.log(params)
    }
}
export { EditCellRenderer }

function DeleteCellRenderer(props: any) {
    const { showAlertDialogYesNo } = useDialogs()
    const {showSuccess} = useFeedback()
    const {mutateGraphql} = useAppGraphql()
    // for pinnedBottomRow id is undefined hence props.data.id is undefined. So button not appears on pinned row
    return (
        props.data.id && <Tooltip label='Delete'>
            <IconButton onClick={handleDeleteRow} size='xs' mb={1} aria-label='edit' icon={<DeleteIcon fontSize={18} color='red.500' />} />
        </Tooltip>)

    function handleDeleteRow(data: any) {
        const deleteId = data.id1
        showAlertDialogYesNo({ action: () => doDelete(deleteId), title: 'Are you sure to delete this row?' })

    }

    async function doDelete(id: number) {
        const sqlObj = {
            tableName:'TestM',
            deletedIds:[id]
        }
        const q = appGraphqlStrings['genericUpdate'](sqlObj,'traceAuth')
        const ret = await mutateGraphql(q)
        appStaticStore.superAdmin.doReload()
        showSuccess()
        // console.log(id)
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