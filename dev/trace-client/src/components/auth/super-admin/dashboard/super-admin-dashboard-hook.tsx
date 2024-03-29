import {appStore,  GraphQlQueryResultType, Messages, useAppGraphql, useFeedback,} from '@src/features'
import {_, useGranularEffect, useSignal } from '@src/libs'
function useSuperAdminDashboard() {
    const meta: any = {
        connections: {
            active: useSignal(0),
            idle: useSignal(0),
            total: useSignal(0)
        },
        clients: {
            active: useSignal(0),
            inactive: useSignal(0),
            total: useSignal(0)
        },
        counts: {
            dbCount: useSignal(0),
            securedControlsCount: useSignal(0),
            adminUsersCount: useSignal(0),
            adminRolesCount: useSignal(0)
        }
    }
    const { showError, showAppLoader } = useFeedback()
    const { appGraphqlStrings, queryGraphql, handleAndGetQueryResult } = useAppGraphql()
    
    useGranularEffect(() => {
        appStore.superAdmin.dashboard.doReload = loadData
        loadData()
    }, [], [loadData])

    return ({ loadData, meta })

    async function loadData() {
        const args = {
            sqlId: 'get_super_admin_dashboard',
            sqlArgs: {
                dbName: 'traceAuth'
            }
        }
        const q = appGraphqlStrings['genericQuery'](args, 'traceAuth')
        showAppLoader(true)
        try {
            const result: GraphQlQueryResultType = await queryGraphql(q)
            const rows: any[] = handleAndGetQueryResult(result, 'genericQuery')
            if (rows && (rows.length > 0)) {
                setConnections(rows)
                setClients(rows)
                setCounts(rows)
            }
        } catch (e: any) {
            showError(e.message || Messages.errFetchingData)
            console.log(e.message)
        } finally {
            showAppLoader(false)
        }
    }

    function setClients(rows: any[]) {
        const clients: Client[] = rows[0]?.jsonResult?.clients
        if (clients && (clients.length > 0)) {
            const active: Client = clients.find((x: Client) => x?.isActive)
            const inactive: Client = clients.find((x: Client) => !x?.isActive)
            if (!_.isEmpty(active)) {
                meta.clients.active.value = active.count
            }
            if (!_.isEmpty(inactive)) {
                meta.clients.inactive.value = inactive.count
            }
            meta.clients.total.value = meta.clients.active.value + meta.clients.inactive.value
        }
    }

    function setConnections(rows: any[]) {
        const connections: Connection[] = rows[0]?.jsonResult?.connections
        if (connections && (connections.length > 0)) {
            const active: Connection = connections.find((x: Connection) => (x?.state === 'active'))
            const idle: Connection = connections.find((x: Connection) => (x?.state === 'idle'))
            if (!_.isEmpty(active)) {
                meta.connections.active.value = active.count
            }
            if (!_.isEmpty(idle)) {
                meta.connections.idle.value = idle.count
            }
            meta.connections.total.value = meta.connections.active.value + meta.connections.idle.value
        }
    }

    function setCounts(rows: any[]) {
        const dbCount: number = rows[0]?.jsonResult?.dbCount || 0
        const securedControlsCount = rows[0]?.jsonResult?.securedControlsCount || 0
        const adminUsersCount = rows[0]?.jsonResult?.adminUsersCount || 0
        const adminRolesCount = rows[0]?.jsonResult?.adminRolesCount || 0

        meta.counts.dbCount.value = dbCount
        meta.counts.securedControlsCount.value = securedControlsCount
        meta.counts.adminUsersCount.value = adminUsersCount
        meta.counts.adminRolesCount.value = adminRolesCount
    }
}

export { useSuperAdminDashboard }

type Client = {
    isActive: boolean
    count: number
} | undefined

type Connection = {
    state: 'active' | 'idle'
    count: number
} | undefined

