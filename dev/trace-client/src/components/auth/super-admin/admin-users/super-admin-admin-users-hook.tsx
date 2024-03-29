import { useComponentHistory, useAgGridUtils, useFeedback, useAppGraphql, useCellRenderers, appStore, Messages, GraphQlQueryResultType } from '@src/features'
import { ColDef, GridOptions, GridReadyEvent, moment, useGranularEffect, useRef, } from '@src/libs'
import { SuperAdminEditNewAdminUser } from './super-admin-edit-new-admin-user'

function useSuperAdminAdminUsers() {
    const { showError } = useFeedback()
    const { getAlternateColorStyle, getPinnedRowStyle, } = useAgGridUtils()
    const { appGraphqlStrings, handleAndGetQueryResult, queryGraphql, } = useAppGraphql()
    const { addToComponentHistory, componentNames, isNotInComponentHistory } = useComponentHistory()
    const gridApiRef: any = useRef(null)

    useGranularEffect(() => {
        appStore.superAdmin.adminUsers.doReload = loadData
    }, [], [loadData])

    const { DeleteCellRenderer, EditCellRenderer, HideCellRenderer }
        = useCellRenderers({
            dbName: 'traceAuth'
            , tableName: 'UserM'
            , appStoreObject: appStore.superAdmin.adminUsers
            // , appStaticStoreObject: appStaticStore.superAdmin.adminUsers
            , EditBodyComponent: SuperAdminEditNewAdminUser
            , editTitle: 'Edit super admin role'
        })

    const columnDefs: ColDef[] = [
        {
            headerName: '#',
            field: 'id',
            width: 60
        },
        {
            field: 'clientName',
            headerName: 'Client name',
            width: 250
        },

        {
            field: 'uid',
            headerName: 'Uid',
            width: 150
        },
        {
            field: 'userName',
            headerName: 'User name',
            width: 250
        },
        {
            field: 'mobileNo',
            headerName: 'Mobile no',
            width: 100
        },
        {
            field: 'userEmail',
            headerName: 'Email',
            width: 250,
        },
        {
            field: 'descr',
            headerName: 'Description',
            width: 250,
            minWidth: 30,
            flex: 1
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

    function getRowStyle(params: any) {
        const style1 = getAlternateColorStyle(params)
        const style2 = getPinnedRowStyle(params)
        const ret = { ...style1, ...style2 }
        return (ret)
    }

    async function loadData() {
        const args = {
            sqlId: 'get_admin_users',
        }
        const q = appGraphqlStrings['genericQuery'](args, 'traceAuth')
        gridApiRef.current.api.showLoadingOverlay()
        try {
            const result: GraphQlQueryResultType = await queryGraphql(q)
            const rows: [] = handleAndGetQueryResult(result, 'genericQuery')
            if (rows) {
                appStore.superAdmin.adminUsers.rows.value = rows
                appStore.superAdmin.adminUsers.doFilter()
            }
        } catch (e: any) {
            showError(e.message || Messages.errFetchingData)
            console.log(e.message)
        } finally {
            gridApiRef?.current?.api?.hideOverlay()
        }
    }

    function onGridReady(params: GridReadyEvent) {
        if (isNotInComponentHistory(componentNames.superAdminAdminUsers)) {
            loadData()
            addToComponentHistory(componentNames.superAdminAdminUsers)
        }
    }


    return { gridApiRef, gridOptions, }
}

export { useSuperAdminAdminUsers }