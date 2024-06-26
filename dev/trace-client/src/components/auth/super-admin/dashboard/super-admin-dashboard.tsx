import { HStack, IconButton, RefreshIcon, SimpleGrid, Tooltip, } from '@src/libs'
import { useSuperAdminDashboard } from './super-admin-dashboard-hook'
import { SuperAdminDatabaseConnections } from './super-admin-database-connections'
import { SuperAdminCounts } from './super-admin-counts-card'
import { SuperAdminClientsCard } from './super-admin-clients-card'

function SuperAdminDashboard() {
    const { loadData, } = useSuperAdminDashboard()

    return (
        <>
            <HStack justifyContent='flex-end'>
                <Tooltip label='Refresh'>
                    <IconButton size='sm' aria-label="Reload"
                        onClick={loadData}
                        icon={<RefreshIcon fontSize={26} color='blue.500' />} />
                </Tooltip>
            </HStack>
            <SimpleGrid mt={2} spacing={8} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
                <SuperAdminDatabaseConnections />
                {/* <SuperAdminClientsCard />
                <SuperAdminCounts /> */}
            </SimpleGrid>
        </>
    )
}

export { SuperAdminDashboard }



