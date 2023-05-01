import { useDialogs, } from '@src/features'
import { Button } from '@src/libs'
import { SuperAdminEditNewSecuredControl } from './super-admin-edit-new-secured-control'

function SuperAdminNewSecuredControlButton() {
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

export { SuperAdminNewSecuredControlButton }