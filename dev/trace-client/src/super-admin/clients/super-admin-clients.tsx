import {Box} from '@src/features'
import { SuperAdminClientsToolbar } from './super-admin-clients-toolbar'

function SuperAdminClients() {
  return <Box h='100%' w='100%' p={2} bgColor='gray.100'>
    <SuperAdminClientsToolbar />
  </Box>
}

export { SuperAdminClients };
