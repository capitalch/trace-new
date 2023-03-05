import { Button, Card, CardBody, CardFooter, CardHeader, Center, Heading, HStack, IconButton, RefreshIcon, SimpleGrid, Table, Tbody, Td, Text, Tooltip, Tr, } from '@src/features'

import { useSuperAdminDashboard } from './super-admin-dashboard-hook'

function SuperAdminDashboard() {
    const { loadData, } = useSuperAdminDashboard()

    return (
        <>
            <HStack justifyContent='flex-end'>
                <Tooltip label='Reload'>
                    <IconButton size='sm' aria-label="Reload"
                        onClick={loadData}
                        icon={<RefreshIcon fontSize={26} color='blue.500' />} />
                </Tooltip>
            </HStack>
            <SimpleGrid mt={2} spacing={8} templateColumns='repeat(auto-fill, minmax(250px, 1fr))'>
                <DatabaseConnections />
                <Clients />
                <Counts />
            </SimpleGrid>
        </>
    )
}

export { SuperAdminDashboard }

function Clients() {
    const { meta, } = useSuperAdminDashboard()
    return (<Card colorScheme='blue' backgroundColor='twitter.900' color='white' variant='outline' >
        <CardHeader>
            <Heading size='md'>Clients</Heading>
        </CardHeader>
        <CardBody pt={0}>
            <Table variant='unstyled' size='sm'>
                <Tbody>
                    <Tr>
                        <Td>
                            <Text>Active</Text>
                        </Td>
                        <Td>
                            <Text>{meta.clients.active.value}</Text>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>
                            <Text>Inactive</Text>
                        </Td>
                        <Td>
                            <Text>{meta.clients.inactive.value}</Text>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>
                            <Text>Total</Text>
                        </Td>
                        <Td>
                            <Text>{meta.clients.total.value}</Text>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </CardBody>
    </Card>)
}

function Counts() {
    const { meta, } = useSuperAdminDashboard()
    return (<Card colorScheme='blue' backgroundColor='twitter.900' color='white' variant='outline' >
        <CardHeader>
            <Heading size='md'>Counts</Heading>
        </CardHeader>
        <CardBody pt={0}>
            <Table variant='unstyled' size='sm'>
                <Tbody>
                    <Tr>
                        <Td>
                            <Text>Local databases</Text>
                        </Td>
                        <Td>
                            <Text>{meta.counts.dbCount.value}</Text>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>
                            <Text>Secured controls</Text>
                        </Td>
                        <Td>
                            <Text>{meta.counts.securedControlsCount.value}</Text>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>
                            <Text>Admin users</Text>
                        </Td>
                        <Td>
                            <Text>{meta.counts.adminUsersCount.value}</Text>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>
                            <Text>Admin roles</Text>
                        </Td>
                        <Td>
                            <Text>{meta.counts.adminRolesCount.value}</Text>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </CardBody>
    </Card>)
}

function DatabaseConnections() {
    const { meta, } = useSuperAdminDashboard()

    return (<Card colorScheme='blue' backgroundColor='twitter.900' color='white' variant='outline' >
        <CardHeader>
            <Heading size='md'>Database connections</Heading>
        </CardHeader>
        <CardBody pt={0}>
            <Table variant='unstyled' size='sm'>
                <Tbody>
                    <Tr>
                        <Td>
                            <Text>Active</Text>
                        </Td>
                        <Td>
                            <Text>{meta.connections.active.value}</Text>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>
                            <Text>Idle</Text>
                        </Td>
                        <Td>
                            <Text>{meta.connections.idle.value}</Text>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>
                            <Text>Total</Text>
                        </Td>
                        <Td>
                            <Text>{meta.connections.total.value}</Text>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </CardBody>
    </Card>)
}


