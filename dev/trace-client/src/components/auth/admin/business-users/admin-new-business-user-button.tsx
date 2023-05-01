import { useDialogs, } from '@src/features'
import { Button } from '@src/libs'
import { AdminEditNewBusinessUser } from './admin-edit-new-business-user'

function AdminNewBusinessUserButton() {
    const { showModalDialogA } = useDialogs()
    return (
        <Button size='sm' colorScheme={'blue'} onClick={handleNewAdminUser}>
            New business user
        </Button>
    )

    function handleNewAdminUser() {
        showModalDialogA({
            title: 'New business user',
            body: AdminEditNewBusinessUser
        })
    }
}

export { AdminNewBusinessUserButton }