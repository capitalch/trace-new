import { SystemStyleObject } from '@chakra-ui/react';
import { Box, Flex, useComponentHistory, VStack } from '@src/features'
import { SuperAdminClientsToolbar } from './super-admin-clients-toolbar'
import { SuperAdminClientsView } from './super-admin-clients-view';

function SuperAdminClients() {

  return <Flex h='100%' w='100%' direction='column'>
    <SuperAdminClientsToolbar />
    <SuperAdminClientsView />
  </Flex>
}

export { SuperAdminClients };

const clientsStyle: SystemStyleObject = {
  '.header': {
    color: 'gray',
    backgroundColor: 'dodgerBlue'
  }
}