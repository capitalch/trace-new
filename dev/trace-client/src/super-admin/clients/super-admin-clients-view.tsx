import { _, AgGridReact, ColDef, DeleteIcon, EditIcon, GridOptions, useComponentHistory, useAgGridUtils, useEffect, useFeedback, useAppGraphql, useGranularEffect, useMemo, useRef, Box, appStore, Flex, HStack, GridApi, appStaticStore, Button, IconButton, CloseIcon, Tooltip, useState } from '@src/features'
import { FirstDataRenderedEvent, GridReadyEvent, RowDataUpdatedEvent } from 'ag-grid-community';
import { filter } from 'lodash';

function SuperAdminClientsView() {
    // const [, doRefresh] = useState({})
    const { getAlternateColorStyle, getPinnedRowStyle, swapId } = useAgGridUtils()
    const { appGraphqlStrings, queryGraphql } = useAppGraphql()
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
        // debounceVerticalScrollbar:true,
        getRowStyle: getRowStyle,
        onGridReady: onGridReady,
        rowBuffer: 20,
        // rowData: appStore.superAdmin.filteredRows.value,
        rowSelection: 'single'
    }
    // const refresh = appStore.superAdmin.refresh.value
    // const count = appStore.superAdmin.filteredRows.value.length
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
            // const filteredRows = rows.map((x: any) => ({ ...x }))
            // swapId(filteredRows)
            // appStore.superAdmin.filteredRows.value = filteredRows
            // swapId(appStore.superAdmin.filteredRows.value)
            // console.log(appStore.superAdmin.filteredRows.value)
        }
        appStaticStore.superAdmin.doFilter()
        gridApiRef.current.api.hideOverlay()
    }
}

export { SuperAdminClientsView }

function EditCellRenderer(props: any) {
    return (
        props.data.id && <Tooltip label='Edit'>
            <IconButton size='xs' onClick={() => handleEditRow(props.data)} mb={1} aria-label='edit' icon={<EditIcon fontSize={16} color='teal.400' />} />
        </Tooltip>)
    function handleEditRow(params: any) {
        console.log(params)
    }
}
export { EditCellRenderer }

function DeleteCellRenderer(props: any) {
    // for pinnedBottomRow id is undefined hence props.data.id is undefined. So button not appears on pinned row
    return (
        props.data.id && <Tooltip label='Delete'>
            <IconButton size='xs' mb={1} aria-label='edit' icon={<DeleteIcon fontSize={16} color='red.400' />} />
        </Tooltip>)
}
export { DeleteCellRenderer }

function RemoveCellRenderer(props: any) {
    return (
        props.data.id && <Tooltip label='Remove'>
            <IconButton onClick={() => handleRemoveRow(props.data)} size='xs' mb={1} aria-label='edit' icon={<CloseIcon color='gray.700' />} />
        </Tooltip>
    )
    function handleRemoveRow(params: any) {
        const filteredRows: any[] = appStore.superAdmin.filteredRows.value
        const clone = filteredRows.map((x: any) => ({ ...x }))
        // const id = params.id - 1
        const indexOfRow = clone.findIndex((x: any) => (x.id === params.id))
        clone.splice(indexOfRow, 1)

        appStore.superAdmin.filteredRows.value = clone
        // appStaticStore.superAdmin.doRefresh()
        // const cnt = filteredRows.length
        // filteredRows.splice(id, 1)
        // const cnt1 = filteredRows.length
        // appStore.superAdmin.filteredRows.value = filteredRows
    }
}
export { RemoveCellRenderer }

// const api: GridApi = params.api
// const columnApi: ColumnApi = params.columnApi
// api.setPinnedBottomRowData(getPinnedBottomRowData(api, columnApi))

// animateRows={true}
// rowSelection='multiple'
// columnDefs={columnDefs}

// getRowStyle={getAgGridAlternateColor}
// onGridReady={onGridReady}

// onFirstDataRendered={(ev: FirstDataRenderedEvent<any>) => {
// }}