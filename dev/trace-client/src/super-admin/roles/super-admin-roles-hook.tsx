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
            headerName: 'Client code',
            headerClass: 'header',
            width: 200
        },
        {
            field: 'clientName',
            headerName: 'Client name',
            width: 300,
            flex: 1
        },
        {
            field: 'dbName',
            headerName: 'Db name',
            width: 250
        },
        {
            field: 'isExternalDb',
            headerName: 'Ext. db',
            width: 100
        },
        {
            headerName: 'Active',
            field: 'isActive',
            width: 80
        },
        {
            // cellRenderer: DeleteCellRenderer,
            cellStyle: { padding: 0, margin: 0 },
            width: 20
        },
        {
            // cellRenderer: HideCellRenderer,
            cellStyle: { padding: 0, margin: 0 },
            width: 20
        },
        {
            // cellRenderer: EditCellRenderer,
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
        // getRowStyle: getRowStyle,
        onGridReady: onGridReady,
        rowSelection: 'single'
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