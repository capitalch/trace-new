import { Card, CardBody, CardHeader, Heading, Table, Tbody, Td, Text, Tr, } from '@src/libs'
import { useSuperAdminDashboard } from './super-admin-dashboard-hook'

function SuperAdminCountsCard() {
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

export {SuperAdminCountsCard}