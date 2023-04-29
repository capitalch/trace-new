import { useDialogs } from '@src/features'
import { Button } from '@src/libs'
import { AppEditNewRole } from './app-edit-new-role'

function AppNewRoleButton() {
    const { showModalDialogA } = useDialogs()
    return (
        <Button size='sm' colorScheme={'blue'} onClick={handleNewRole}>
            New role
        </Button>
    )

    function handleNewRole() {
        showModalDialogA({
            title: 'New super admin role',
            body: AppEditNewRole
        })
    }
}
export { AppNewRoleButton }