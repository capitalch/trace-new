import { _, appValidators, Box, Button, Center, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, HStack, Input, Messages, Text, } from '@src/features'
import { useForm } from 'react-hook-form'

function SuperAdminNewClient() {
    const { handleSubmit, register, formState: { errors } }: any = useForm({ mode: 'onTouched' })
    const registerClientCode = register('clientCode', {
        required: Messages.errRequired
        , minLength: { value: 4, message: Messages.errAtLeast4Chars }
    })
    const registerClientName = register('clientName', {
        required: Messages.errRequired
    })
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.clientCode}>
                <FormLabel>Client code</FormLabel>
                <Input id='clientCode' autoFocus size='sm' type='text' {...registerClientCode} />
                {(!!errors.clientCode) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.clientCode.message}</FormErrorMessage>
                    : <FormHelperText fontSize='xs' color='gray.400'>{Messages.messNoSpecialSpace4Plus}</FormHelperText>
                }
            </FormControl>
            <FormControl isInvalid={!!errors.clientName}>
                <FormLabel>Client name</FormLabel>
                <Input id='clientName' size='sm' type='text' {...registerClientName} />
                {(!!errors.clientName) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.clientName.message}</FormErrorMessage>
                    : <FormHelperText fontSize='xs' color='gray.400'>{Messages.messNoSpecial4Plus}</FormHelperText>
                }
            </FormControl>
            <HStack justifyContent='flex-end'>
                <Button mt={4} colorScheme='teal' type='submit' disabled={!_.isEmpty(errors)} >
                    Submit
                </Button>
            </HStack>

        </form>
    )
    function onSubmit() {
        console.log('submit')
    }
}
export { SuperAdminNewClient }