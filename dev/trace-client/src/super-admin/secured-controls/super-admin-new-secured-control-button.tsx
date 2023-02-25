import { Button, HStack, Tooltip, useDialogs, useMediaQuery } from '@src/features'
import { SuperAdminEditNewSecuredControl } from './super-admin-edit-new-secured-control'

function SuperAdminNewSecuredControlButton(){
    const { showModalDialogA } = useDialogs()
    return (
        <Button size='sm' colorScheme={'blue'} onClick={handleNewSecuredControl}>
            New secured control
        </Button>
    )

    function handleNewSecuredControl() {
        showModalDialogA({
            title: 'New secured control',
            body: SuperAdminEditNewSecuredControl
        })
    }
}

export {SuperAdminNewSecuredControlButton}