import { _, AgGridReact, ColDef, GridOptions, useComponentHistory, useAgGridUtils, useEffect, useFeedback, useAppGraphql, useGranularEffect, useMemo, useRef, Box, appStore, Flex, HStack, GridApi, appStaticStore, Button } from '@src/features'
import { FirstDataRenderedEvent, GridReadyEvent, RowDataUpdatedEvent } from 'ag-grid-community';

function SuperAdminClientsView() {
    const { getAlternateColorStyle, getPinnedRowStyle, } = useAgGridUtils()
    const { appGraphqlStrings, queryGraphql } = useAppGraphql()
    const { componentNames, isNotInComponentHistory } = useComponentHistory()
    const { addToComponentHistory } = useComponentHistory()
    const gridApiRef: any = useRef(null)

    // Alternative of useEffect. Dependency array can be blank with no warning
    useGranularEffect(() => {
        appStaticStore.superAdmin.doRefresh = loadData
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
            headerName:'Index',
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
            width: 50
        }
    ]

    const gridOptions: GridOptions = {
        animateRows: true,
        columnDefs: columnDefs,
        getRowStyle: getRowStyle,
        onGridReady: onGridReady,
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
        const val = {
            sqlId: 'get_all_clients',
        }
        const q = appGraphqlStrings['genericQuery'](val, 'traceAuth')

        gridApiRef.current.api.showLoadingOverlay()
        const st = new Date().getTime()
        const ret = await queryGraphql(q)
        const en = (new Date()).getTime()
        console.log(en - st, ret)
        const rows: [] = ret?.data?.genericQuery
        
        if (rows && (rows.length > 0)) {
            appStore.superAdmin.rows.value = rows
            appStore.superAdmin.filteredRows.value = rows
        }
        appStaticStore.superAdmin.doFilter()
        gridApiRef.current.api.hideOverlay()
    }
}

export { SuperAdminClientsView }

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