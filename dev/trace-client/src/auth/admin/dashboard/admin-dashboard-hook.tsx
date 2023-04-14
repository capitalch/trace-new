import { _, appStaticStore, Card, CardBody, CardHeader, GraphQlQueryResultType, Heading, Messages, Table, TableContainer, Tbody, Text, Th, Thead, Tr, useAppGraphql, useDeepSignal, useFeedback, useGranularEffect } from '@src/features'


function useAdminDashboard() {
    const meta: any = useDeepSignal({
        counts: {
            buesCount: 0,
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

    return ({ meta })

    async function loadData() {
        const args = {
            sqlId: 'get_admin_dashboard',
            sqlArgs: {
                clientId: appStaticStore.login.clientId
            }
        }
        const q = appGraphqlStrings['genericQuery'](args, 'traceAuth')
        showAppLoader(true)
        try {
            const result: GraphQlQueryResultType = await queryGraphql(q)
            const rows: any[] = handleAndGetQueryResult(result, 'genericQuery')
            if (rows && (rows.length > 0)) {
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
        const buesCount: number = rows[0]?.jsonResult?.buesCount || 0
        const rolesCount: number = rows[0]?.jsonResult?.rolesCount || 0
        const businessUsersCount: number = rows[0]?.jsonResult?.businessUsersCount || 0

        meta.counts.buesCount.value = buesCount
        meta.counts.rolesCount.value = rolesCount
        meta.counts.businessUsersCount.value = businessUsersCount
    }
}

export { useAdminDashboard }
