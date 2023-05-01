import { useComponentHistory, useAgGridUtils, useFeedback, useAppGraphql, useCellRenderers, appStore, Messages, GraphQlQueryResultType } from '@src/features'
import { ColDef, GridOptions, GridReadyEvent, useGranularEffect, useRef, } from '@src/libs'
import { SuperAdminEditNewSecuredControl } from './super-admin-edit-new-secured-control'


function useSuperAdminSecuredControls() {
    const { showError } = useFeedback()
    const { getAlternateColorStyle, getPinnedRowStyle, } = useAgGridUtils()
    const { appGraphqlStrings, handleAndGetQueryResult, queryGraphql, } = useAppGraphql()
    const { componentNames, isNotInComponentHistory } = useComponentHistory()
    const { addToComponentHistory } = useComponentHistory()
    const gridApiRef: any = useRef(null)

    const { DeleteCellRenderer, EditCellRenderer, HideCellRenderer }
        = useCellRenderers({
            dbName: 'traceAuth'
            , tableName: 'SecuredControlM'
            , appStoreObject: appStore.superAdmin.securedControls
            // , appStaticStoreObject: appStaticStore.superAdmin.securedControls 
            , EditBodyComponent: SuperAdminEditNewSecuredControl
            , editTitle: 'Edit secured control'
        })

    useGranularEffect(() => {
        appStore.superAdmin.securedControls.doReload = loadData
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
            width: 250
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
            sqlId: 'get_secured_controls',
        }
        const q = appGraphqlStrings['genericQuery'](args, 'traceAuth')
        gridApiRef.current.api.showLoadingOverlay()
        try {
            const result: GraphQlQueryResultType = await queryGraphql(q)
            const rows: [] = handleAndGetQueryResult(result, 'genericQuery')
            if (rows) {
                appStore.superAdmin.securedControls.rows.value = rows
                appStore.superAdmin.securedControls.doFilter()
            }
        } catch (e: any) {
            showError(e.message || Messages.errFetchingData)
            console.log(e.message)
        } finally {
            gridApiRef?.current?.api?.hideOverlay()
        }
    }

    return { gridApiRef, gridOptions, }
}

export { useSuperAdminSecuredControls }