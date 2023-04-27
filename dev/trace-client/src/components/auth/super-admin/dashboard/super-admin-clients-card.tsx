import { Card, CardBody, CardHeader, Heading, Table, Tbody, Td, Text, Tr, } from '@src/libs'
import { useSuperAdminDashboard } from './super-admin-dashboard-hook'

function SuperAdminClientsCard() {
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

export {SuperAdminClientsCard}