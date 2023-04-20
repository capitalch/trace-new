import { Card, CardBody, CardHeader, Heading, Table, Tbody, Td, Text, Tr, } from '@src/features'
import { useAdminDashboard } from './admin-dashboard-hook'

function AdminCounts() {
    const { meta, } = useAdminDashboard()
    return (<Card colorScheme='blue' backgroundColor='twitter.900' color='white' variant='outline' >
        <CardHeader>
            <Heading size='md'>Counts</Heading>
        </CardHeader>
        <CardBody pt={0}>
            <Table variant='unstyled' size='sm'>
                <Tbody>
                    <Tr>
                        <Td>
                            <Text>Business units</Text>
                        </Td>
                        <Td>
                            <Text>{meta.counts.buesCount.value}</Text>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>
                            <Text>Roles</Text>
                        </Td>
                        <Td>
                            <Text>{meta.counts.rolesCount.value}</Text>
                        </Td>
                    </Tr>
                    <Tr>
                        <Td>
                            <Text>Business users</Text>
                        </Td>
                        <Td>
                            <Text>{meta.counts.businessUsersCount.value}</Text>
                        </Td>
                    </Tr>
                </Tbody>
            </Table>
        </CardBody>
    </Card>)
}

export {AdminCounts}