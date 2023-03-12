import { ColDef, DeleteIcon, EditIcon, GridOptions, GridReadyEvent, HideIcon, useComponentHistory, useAgGridUtils, useFeedback, useAppGraphql, useCellRenderers, useGranularEffect, useRef, appStore, appStaticStore, IconButton, Tooltip, useDialogs, appGraphqlStrings, Messages, GraphQlQueryResultType } from '@src/features'
import { AdminEditNewBusinessUnit } from './admin-edit-new-business-unit'

function useAdminBusinessUnits() {
    const { showError } = useFeedback()
    const { getAlternateColorStyle, getPinnedRowStyle, getRowStyle, swapId } = useAgGridUtils()
    const { appGraphqlStrings, queryGraphql, handleAndGetQueryResult } = useAppGraphql()
    const { componentNames, isNotInComponentHistory } = useComponentHistory()
    const { addToComponentHistory } = useComponentHistory()
    const gridApiRef: any = useRef(null)
    const { DeleteCellRenderer,EditCellRenderer, HideCellRenderer } 
    = useCellRenderers({ 
        dbName: 'traceAuth'
        , tableName: 'BuM'
        ,appStoreObject:appStore.admin.businessUnits
        , appStaticStoreObject: appStaticStore.admin.businessUnits
        , EditBodyComponent: AdminEditNewBusinessUnit
        , editTitle:'Edit business unit'
    })

    useGranularEffect(() => {
        appStaticStore.admin.businessUnits.doReload = loadData
    }, [], [loadData])

    const onGridReady = (params: GridReadyEvent) => {
        if (isNotInComponentHistory(componentNames.adminBusinessUnits)) {
            loadData()
            addToComponentHistory(componentNames.adminBusinessUnits)
        }
    }

    const columnDefs: ColDef[] = [
        {
            headerName: '#',
            field: 'id',
            width: 60
        },
        {
            field: 'buCode',
            headerName: 'Bu code',
            headerClass: 'header',
            width: 150
        },
        {
            field: 'buName',
            flex:1,
            headerName: 'Bu name',
            headerClass: 'header',
            width: 150
        },
        {
            field: 'isActive',
            headerName: 'Active',
            headerClass: 'header',
            width: 90
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

    async function loadData() {
        const args = {
            sqlId: 'get_admin_businessUnits',
            sqlArgs: {
                clientId: appStaticStore.login.clientId
            }
        }
        const q = appGraphqlStrings['genericQuery'](args, 'traceAuth')
        gridApiRef.current.api.showLoadingOverlay()
        try {
            const result: GraphQlQueryResultType = await queryGraphql(q)
            const rows: [] = handleAndGetQueryResult(result, 'genericQuery')
            if (rows) {
                appStore.admin.businessUnits.rows.value = rows
                appStaticStore.admin.businessUnits.doFilter()
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
export { useAdminBusinessUnits }