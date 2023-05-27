import { _, axios, Box, Button, Center, FormControl, FormLabel, FormErrorMessage, Input, Text, useForm, useState, urlJoin } from '@src/libs'
import { AppRequiredAstrisk, appStore, appValidators, getHostUrl, Messages, useDialogs, useFeedback } from '@src/features'

function AppForfotPassword() {
    const { handleSubmit, register, formState: { errors } }: any = useForm({ mode: 'onTouched' })
    const { checkValidEmail } = appValidators()
    const [serverError, setServerError] = useState('')
    const { showAppLoader, showError } = useFeedback()
    const { closeModalDialogA } = useDialogs()
    const registerUserEmail = register('userEmail', {
        required: Messages.errRequired
        , validate: {
            validEmail: (val: string) => checkValidEmail(val)
        }
    })

    return (<Box>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.userEmail}>
                <FormLabel color='blue.500'>Email address to send password reset link <AppRequiredAstrisk /></FormLabel>
                <Input mt={4} name='userEmail' autoFocus autoComplete='off' size='md' type='text' placeholder='test@test.com'
                    {...registerUserEmail} />
                {(!!errors.userEmail) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.userEmail.message}</FormErrorMessage>
                    : <>&nbsp;</>
                }
            </FormControl>

            {/* Submit */}
            <Button type='submit' variant='solid' colorScheme='blue' width="full" mt={3} isDisabled={(!_.isEmpty(errors))} >
                Submit
            </Button>
            <Center>
                <Text mt={1} as='b' fontSize='small' color='red.400'>{serverError}</Text>
            </Center>
        </form>
    </Box>)

    async function onSubmit(values: any) {
        const email = values?.userEmail
        const hostUrl = getHostUrl()
        const url = urlJoin(hostUrl, 'forgot-pwd')
        // const url = 'http://localhost:8000/forgot-pwd'
        try {
            showAppLoader(true)
            await axios({
                method: 'post',
                url: url,
                data: {
                    email: email
                },
                headers: {
                    'content-type': 'application/json'
                }
            })
            showAppLoader(false)
            closeModalDialogA()
            // appStore.modalDialogA.isOpen.value = false
        } catch (e: any) {
            showAppLoader(false)
            setServerError(Messages.errGenericServerError)
            showError(e.message)
        }
    }
}
export { AppForfotPassword }