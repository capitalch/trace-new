import { Button, HStack, Tooltip, useDialogs, useMediaQuery } from '@src/features'
import { SuperAdminEditNewAdminUser } from './super-admin-edit-new-admin-user'

function SuperAdminNewAdminUserButton(){
    const { showModalDialogA } = useDialogs()
    return (
        <Button size='sm' colorScheme={'blue'} onClick={handleNewAdminUser}>
            New admin user
        </Button>
    )

    function handleNewAdminUser() {
        showModalDialogA({
            title: 'New admin user',
            body: SuperAdminEditNewAdminUser
        })
    }
}

export {SuperAdminNewAdminUserButton}