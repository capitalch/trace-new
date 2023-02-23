import { Button, HStack, Tooltip, useDialogs, useMediaQuery } from '@src/features'
import { SuperAdminEditNewRole } from './super-admin-edit-new-role'

function SuperAdminNewRoleButton() {
    const { showModalDialogA } = useDialogs()
    return (
        <Button size='sm' colorScheme={'blue'} onClick={handleNewRole}>
            New role
        </Button>
    )

    function handleNewRole() {
        showModalDialogA({
            title: 'New super admin role',
            body: SuperAdminEditNewRole
        })
    }
}
export { SuperAdminNewRoleButton }