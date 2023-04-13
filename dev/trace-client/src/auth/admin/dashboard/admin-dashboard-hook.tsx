import { _, appStaticStore, GraphQlQueryResultType, Messages, useAppGraphql, useDeepSignal, useFeedback, useGranularEffect } from '@src/features'


function useAdminDashboard() {
    const meta: any = useDeepSignal({
        counts: {
            buCount: 0,
            rolesCount: 0,
            businessUsersCount: 0
        }
    })

    const { showError, showAppLoader } = useFeedback()
    const { appGraphqlStrings, queryGraphql, handleAndGetQueryResult } = useAppGraphql()
    useGranularEffect(() => {
        appStaticStore.superAdmin.dashboard.doReload = loadData
        loadData()
    }, [], [loadData])

    return ({ loadData, meta })

    async function loadData() {
        const args = {
            sqlId: 'get_admin_dashboard',
            // sqlArgs: {
            //     dbName: 'traceAuth'
            // }
        }
        const q = appGraphqlStrings['genericQuery'](args, 'traceAuth')
        showAppLoader(true)
        try {
            const result: GraphQlQueryResultType = await queryGraphql(q)
            const rows: any[] = handleAndGetQueryResult(result, 'genericQuery')
            if (rows && (rows.length > 0)) {
                // setConnections(rows)
                // setClients(rows)
                setCounts(rows)
            }
        } catch (e: any) {
            showError(e.message || Messages.errFetchingData)
            console.log(e.message)
        } finally {
            showAppLoader(false)
        }
    }

    function setCounts(rows: any[]) {
        // const dbCount: number = rows[0]?.jsonResult?.dbCount || 0
        // const securedControlsCount = rows[0]?.jsonResult?.securedControlsCount || 0
        // const adminUsersCount = rows[0]?.jsonResult?.adminUsersCount || 0
        // const adminRolesCount = rows[0]?.jsonResult?.adminRolesCount || 0

        // meta.counts.dbCount.value = dbCount
        // meta.counts.securedControlsCount.value = securedControlsCount
        // meta.counts.adminUsersCount.value = adminUsersCount
        // meta.counts.adminRolesCount.value = adminRolesCount
    }
}

export { useAdminDashboard }