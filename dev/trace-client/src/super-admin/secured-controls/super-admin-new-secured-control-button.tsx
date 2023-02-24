import { Button, HStack, Tooltip, useDialogs, useMediaQuery } from '@src/features'
import { SuperAdminEditNewSecuredControl } from './super-admin-edit-ne-secured-control'

function SuperAdminNewSecuredControlButton(){
    const { showModalDialogA } = useDialogs()
    return (
        <Button size='sm' colorScheme={'blue'} onClick={handleNewSecuredControl}>
            New secured control
        </Button>
    )

    function handleNewSecuredControl() {
        showModalDialogA({
            title: 'New super admin role',
            body: SuperAdminEditNewSecuredControl
        })
    }
}

export {SuperAdminNewSecuredControlButton}