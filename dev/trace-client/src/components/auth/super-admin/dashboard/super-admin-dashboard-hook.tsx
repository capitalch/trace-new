import { appStaticStore, GraphQlQueryResultType, Messages, useAppGraphql, useFeedback, } from '@src/features'
import { _, useGranularEffect, useHookstate, State, } from '@src/libs'
function useSuperAdminDashboard() {
    const meta: State<SuperAdminDashboardType> = useHookstate<SuperAdminDashboardType>({
        connections: {
            active: 0,
            idle: 0,
            total: 0
        },
        clients: {
            active: 0,
            inactive: 0,
            total: 0
        },
        counts: {
            dbCount: 0,
            securedControlsCount: 0,
            adminUsersCount: 0,
            adminRolesCount: 0
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
                meta.clients.active.set(active.count)
            }
            if (!_.isEmpty(inactive)) {
                meta.clients.inactive.set(inactive.count)
            }
            meta.clients.total.set(meta.clients.active.value + meta.clients.inactive.value)
        }
    }

    function setConnections(rows: any[]) {
        const connections: Connection[] = rows[0]?.jsonResult?.connections
        if (connections && (connections.length > 0)) {
            const active: Connection = connections.find((x: Connection) => (x?.state === 'active'))
            const idle: Connection = connections.find((x: Connection) => (x?.state === 'idle'))
            if (!_.isEmpty(active)) {
                meta.connections.active.set(active.count)
            }
            if (!_.isEmpty(idle)) {
                meta.connections.idle.set(idle.count)
            }
            meta.connections.total.set(meta.connections.active.value + meta.connections.idle.value)
        }
    }

    function setCounts(rows: any[]) {
        const dbCount: number = rows[0]?.jsonResult?.dbCount || 0
        const securedControlsCount = rows[0]?.jsonResult?.securedControlsCount || 0
        const adminUsersCount = rows[0]?.jsonResult?.adminUsersCount || 0
        const adminRolesCount = rows[0]?.jsonResult?.adminRolesCount || 0

        meta.counts.dbCount.set(dbCount)
        meta.counts.securedControlsCount.set(securedControlsCount)
        meta.counts.adminUsersCount.set(adminUsersCount)
        meta.counts.adminRolesCount.set(adminRolesCount)
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

type SuperAdminDashboardType = {
    connections: {
        active: number,
        idle: number,
        total: number
    },
    clients: {
        active: number,
        inactive: number,
        total: number
    },
    counts: {
        dbCount: number,
        securedControlsCount: number,
        adminUsersCount: number,
        adminRolesCount: number
    }
}

