import { _, axios, Box, Button, FormControl, FormLabel, FormErrorMessage, FormHelperText, Input, useForm } from '@src/libs'
import { AppRequiredAstrisk, appValidators, Messages } from '@src/features'

function AppForfotPassword() {
    const { handleSubmit, register, formState: { errors } }: any = useForm({ mode: 'onTouched' })
    const { checkValidEmail } = appValidators()

    const registerUserEmail = register('userEmail', {
        required: Messages.errRequired
        , validate: {
            validEmail: (val: string) => checkValidEmail(val)
        }
    })

    return (<Box>
        <form onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={!!errors.userEmail}>
                <FormLabel mt={1} color='blue.500'>Email address to send password reset link <AppRequiredAstrisk /></FormLabel>
                <Input mt={4} name='userEmail' autoFocus autoComplete='off' size='md' type='text' placeholder='test@test.com'
                    {...registerUserEmail} />
                {(!!errors.userEmail) ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.userEmail.message}</FormErrorMessage>
                    : <>&nbsp;</>
                }
            </FormControl>

            {/* Submit */}
            <Button type='submit' variant='solid' colorScheme='blue' width="full" mt={8} isDisabled={(!_.isEmpty(errors))} >
                Submit
            </Button>
        </form>
    </Box>)

    async function onSubmit(values: any) {
        const email = values?.userEmail
        const url = 'http://localhost:8000/forgot-pwd'
        try {
            const ret = await axios({
                method: 'post',
                url: url,
                data: {
                    email: email
                },
                headers: {
                    'content-type': 'application/json'
                }
            })
        } catch (e: any) {
            console.log(e)
        }
    }
}
export { AppForfotPassword }