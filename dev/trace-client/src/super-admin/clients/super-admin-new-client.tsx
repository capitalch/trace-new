import { appValidators, Box, Button, Center, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, HStack, Input, Messages, Text, useForm } from '@src/features'

function SuperAdminNewClient() {
    const { handleSubmit, register, formState: { errors } }: any = useForm()
    const registerClientCode = register('clientCode', {
        required: Messages.errRequired
        , minLength: { value: 4, message: Messages.errAtLeast4Chars }
    })
    const registerClientName = register('clientName', {
        required: Messages.errRequired
    })
    return (
        <Box  maxWidth={600}>
            <form>
                <FormControl isInvalid={!!errors.clientCode} maxWidth={400}>
                    <FormLabel>Client code</FormLabel>
                    <Input value='' id='clientCode' autoFocus size='sm' type='text' {...registerClientCode} />
                    {(!!errors.clientCode) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.clientCode.message}</FormErrorMessage>
                        : <FormHelperText fontSize='xs' color='gray.400'>{Messages.messNoSpecialSpace4Plus}</FormHelperText>
                    }
                </FormControl>
                <FormControl isInvalid={!!errors.clientName}>
                    <FormLabel>Client name</FormLabel>
                    <Input value='' id='clientName' autoFocus size='sm' type='text' {...registerClientName} />
                    {(!!errors.clientName) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.clientName.message}</FormErrorMessage>
                        : <FormHelperText fontSize='xs' color='gray.400'>{Messages.messNoSpecial4Plus}</FormHelperText>
                    }
                </FormControl>
            </form>
        </Box>
    )
}
export { SuperAdminNewClient }