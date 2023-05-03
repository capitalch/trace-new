import { HStack, IconButton, RefreshIcon, SimpleGrid, Tooltip, } from '@src/libs'
import { AdminCounts } from './admin-counts'

function AdminDashboard() {
    return (
        <>
            <HStack justifyContent='flex-end'>
                <Tooltip aria-label='reload' label='Reload'>
                    <IconButton size='sm' aria-label="Reload"
                        // onClick={loadData}
                        icon={<RefreshIcon fontSize={26} color='blue.500' />} />
                </Tooltip>
            </HStack>
            <SimpleGrid mt={2} spacing={8} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
                <AdminCounts />
                {/* <SuperAdminDatabaseConnections />
                <SuperAdminClients />
                <SuperAdminCounts /> */}
            </SimpleGrid>
        </>
    )
}

export { AdminDashboard }
