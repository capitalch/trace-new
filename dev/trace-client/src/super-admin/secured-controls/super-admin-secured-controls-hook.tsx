import { AgGridReact, AppGridToolbar, ColDef, DeleteIcon, EditIcon, GridOptions, GridReadyEvent, HideIcon, RowDataUpdatedEvent, useComponentHistory, useAgGridUtils, useFeedback, useAppGraphql, useGranularEffect, useRef, Box, appStore, Flex, HStack, GridApi, appStaticStore, Button, IconButton, CloseIcon, Tooltip, useState, useDialogs, appGraphqlStrings, Messages, GraphQlQueryResultType } from '@src/features'

function useSuperAdminSecuredControls() {
    const { handleAndGetQueryResult } = useAppGraphql()
    const { showError } = useFeedback()
    const { getAlternateColorStyle, getPinnedRowStyle, swapId } = useAgGridUtils()
    const { appGraphqlStrings, queryGraphql, } = useAppGraphql()
    const { componentNames, isNotInComponentHistory } = useComponentHistory()
    const { addToComponentHistory } = useComponentHistory()
    const gridApiRef: any = useRef(null)

    useGranularEffect(() => {
        appStaticStore.superAdmin.securedControls.doReload = loadData
    }, [], [loadData])


    const onGridReady = (params: GridReadyEvent) => {
        if (isNotInComponentHistory(componentNames.superAdminSecuredControls)) {
            loadData()
            addToComponentHistory(componentNames.superAdminSecuredControls)
        }
    }

    const columnDefs: ColDef[] = [
        {
            headerName: '#',
            field: 'id',
            width: 60
        },
        {
            field: 'controlName',
            headerName: 'Control name',
            headerClass: 'header',
            width: 150
        },
        {
            field: 'controlNo',
            headerName: 'Control no',
            width: 100
        },
        {
            field: 'controlType',
            headerName: 'Control type',
            headerClass: 'header',
            width: 150
        },
        {
            field: 'descr',
            headerName: 'Description',
            width: 300,
            flex: 1
        },
        
        // {
        //     cellRenderer: DeleteCellRenderer,
        //     cellStyle: { padding: 0, margin: 0 },
        //     width: 20
        // },
        // {
        //     cellRenderer: HideCellRenderer,
        //     cellStyle: { padding: 0, margin: 0 },
        //     width: 20
        // },
        // {
        //     cellRenderer: EditCellRenderer,
        //     cellStyle: { padding: 0, margin: 0 },
        //     width: 20
        // },
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
            sqlId: 'get_secured_controls',
        }
        const q = appGraphqlStrings['genericQuery'](args, 'traceAuth')
        gridApiRef.current.api.showLoadingOverlay()
        try {
            const result: GraphQlQueryResultType = await queryGraphql(q)
            const rows: [] = handleAndGetQueryResult(result, 'genericQuery')
            if (rows && (rows.length > 0)) {
                appStore.superAdmin.securedControls.rows.value = rows
                appStaticStore.superAdmin.securedControls.doFilter()
            }
        } catch (e: any) {
            showError(e.message || Messages.errFetchingData)
            console.log(e.message)
        } finally {
            gridApiRef.current.api.hideOverlay()
        }
    }

    return { gridApiRef, gridOptions,}
}

export { useSuperAdminSecuredControls }