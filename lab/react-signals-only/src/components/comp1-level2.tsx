import { Box, Button, Text } from '@chakra-ui/react'
import { appStore } from '../app-store'
import { CompA } from './compa'
import { produce } from 'immer'
import { useSignal } from '@preact/signals-react'

function Comp1Level2() {
    const meta: any = {
        admin: {
            user: {
                name: useSignal('abc'),
                address: useSignal('')
            }
        }
    }

    return (<Box>
        Comp1 level2
        <Box>{meta.admin.user.name.value}</Box>
        <Button onClick={handleChangeAddress}>Change Address</Button>
    </Box>)

    function handleChangeAddress() {
        meta.admin.user.name.value = meta.admin.user.name.value + '1'
    }
}
export { Comp1Level2 }