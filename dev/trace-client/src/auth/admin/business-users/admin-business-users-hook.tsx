import { ColDef, GridOptions, GridReadyEvent, moment, useComponentHistory, useAgGridUtils, useFeedback, useAppGraphql, useCellRenderers, useGranularEffect, useRef, appStore, appStaticStore, Messages, GraphQlQueryResultType } from '@src/features'
import { AdminEditNewBusinessUser } from './admin-edit-new-business-user'
// import { SuperAdminEditNewAdminUser } from './super-admin-edit-new-admin-user'

function useAdminBusinessUsers() {
    const { showError } = useFeedback()
    const { getRowStyle } = useAgGridUtils()
    const { appGraphqlStrings, handleAndGetQueryResult, queryGraphql, } = useAppGraphql()
    const { addToComponentHistory, componentNames, isNotInComponentHistory } = useComponentHistory()
    const gridApiRef: any = useRef(null)

    useGranularEffect(() => {
        appStaticStore.admin.businessUsers.doReload = loadData
    }, [], [loadData])

    const { DeleteCellRenderer, EditCellRenderer, HideCellRenderer }
        = useCellRenderers({
            dbName: 'traceAuth'
            , tableName: 'UserM'
            , appStoreObject: appStore.admin.businessUsers
            , appStaticStoreObject: appStaticStore.admin.businessUsers
            , EditBodyComponent: AdminEditNewBusinessUser
            , editTitle: 'Edit business user'
        })

        const columnDefs: ColDef[] = [
            {
                headerName: '#',
                field: 'id',
                width: 60
            },
            {
                field: 'roleName',
                headerName: 'Role name',
                width: 200
            },
    
            {
                field: 'uid',
                headerName: 'Uid',
                width: 150
            },
            {
                field: 'userName',
                headerName: 'User name',
                width: 180
            },
            {
                field: 'mobileNo',
                headerName: 'Mobile',
                width: 90
            },
            {
                field: 'userEmail',
                headerName: 'Email',
                width: 200,
            },
            {
                field: 'descr',
                headerName: 'Desc',
                width: 200,
                minWidth: 80,
                flex: 1
            },
            {
                field: 'businessUnits',
                headerName: 'Business units',
                width: 250,
            },
            {
                field: 'isActive',
                headerName: 'Active',
                width: 80,
            },
            {
                field: 'timestamp',
                headerName: 'Timestamp',
                valueFormatter: (params: any) => {
                    const dateTime = params.value ? moment(params.value).format('YYYY/MM/DD hh:mm:ss') : ''
                    return (dateTime)
                },
                width: 140
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
            headerClass: 'header',
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
                sqlId: 'get_business_users',
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
                    appStore.admin.businessUsers.rows.value = rows
                    appStaticStore.admin.businessUsers.doFilter()
                }
            } catch (e: any) {
                showError(e.message || Messages.errFetchingData)
                console.log(e.message)
            } finally {
                gridApiRef?.current?.api?.hideOverlay()
            }
        }

        function onGridReady(params: GridReadyEvent) {
            if (isNotInComponentHistory(componentNames.adminBusiinessUsers)) {
                loadData()
                addToComponentHistory(componentNames.adminBusiinessUsers)
            }
        }

    return { gridApiRef, gridOptions, }
}
export { useAdminBusinessUsers }