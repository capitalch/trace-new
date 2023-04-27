import { Card, CardBody, CardHeader, Heading, Table, Tbody, Td, Text, Tr, } from '@src/libs'

import { useSuperAdminDashboard } from './super-admin-dashboard-hook'

function SuperAdminDbConnectionsCard() {
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

export { SuperAdminDbConnectionsCard }