import { Button, HStack, Tooltip, useDialogs, useMediaQuery } from '@src/features'
import { AdminEditNewBusinessUnit } from './admin-edit-new-business-unit'

function AdminNewBusinessUnitButton(){
    const { showModalDialogA } = useDialogs()
    return (
        <Button size='sm' colorScheme={'blue'} onClick={handleNewBusinessUnit}>
            New business unit
        </Button>
    )

    function handleNewBusinessUnit() {
        showModalDialogA({
            title: 'New business unit',
            body: AdminEditNewBusinessUnit
        })
    }
}

export {AdminNewBusinessUnitButton}