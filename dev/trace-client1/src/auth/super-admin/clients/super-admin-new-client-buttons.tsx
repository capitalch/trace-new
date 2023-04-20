import { Button, HStack, Tooltip, useDialogs, useMediaQuery } from '@src/features'
import { SuperAdminEditNewClient } from './super-admin-edit-new-client'
import { SuperAdminEditNewClientExtDatabase } from './super-admin-edit-new-client-ext-database'

function SuperAdminNewClientButtons() {
    const { showModalDialogA } = useDialogs()
    const [isLargerThan992] = useMediaQuery("(min-width: 992px)", { ssr: false })
    return (
        <HStack wrap='wrap'>
            {isLargerThan992 && <HStack>
                <Tooltip label='Create a new client with external database'>
                    <Button size="sm" colorScheme="blue" onClick={handleNewClientExternalDatabase}>
                        New client with external database
                    </Button>
                </Tooltip>
                <Tooltip label='Create a new client'>
                    <Button size="sm" colorScheme="blue" onClick={handleNewClient}>
                        New client
                    </Button>
                </Tooltip>
            </HStack>}
        </HStack>
    )

    function handleNewClient() {
        showModalDialogA({
            title: 'New client',
            body: SuperAdminEditNewClient,
        })
    }

    function handleNewClientExternalDatabase() {
        showModalDialogA({
            title: 'New client with external database',
            body: SuperAdminEditNewClientExtDatabase,
        })
    }
}

export { SuperAdminNewClientButtons }