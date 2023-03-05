import { appValidators, Box, Button, Center, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, HStack, Input, Messages, Text, useForm } from '@src/features'
import { useAppLogin } from './app-login-hook'

function AppLogin() {
    const { handleOnSubmit, handleTestSubmit, meta, } = useAppLogin()
    const { handleSubmit, register, formState: { errors } }: any = useForm({mode:'onTouched'})
    const { checkPwd, checkUidEmail } = appValidators()

    const registerUidEmail = register('uidEmail', {
        required: Messages.errRequired
        , validate: { checkUidEmail }
        , minLength: { value: 4, message: Messages.errAtLeast4Chars }
    })
    const registerPwd = register('pwd', {
        required: Messages.errRequired
        , validate: { checkPwd }
        , minLength: { value: 8, message: Messages.errAtLeast8Chars }
    })
    return (<Center h='100%' w='100%' bg='gray.200'>
        <Box p={6} pt={3} maxW='500px' borderWidth={3} borderColor='blue.400' borderRadius={14} boxShadow='lg' bg='white'>
            <Center>
                <Heading size='lg' color='blue.600'>Login</Heading>
            </Center>
            <form onSubmit={handleSubmit(handleOnSubmit)}>

                {/* uid email */}
                <FormControl isInvalid={!!errors.uidEmail}>
                    <FormLabel mt={3} color='blue.500'>User id / Email</FormLabel>
                    <Input id='uidEmail' autoFocus autoComplete='username' size='md' type='text' placeholder='test@test.com' {...registerUidEmail} />
                    {(!!errors.uidEmail)
                        ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.uidEmail.message}</FormErrorMessage>
                        : <FormHelperText fontSize='xs' color='gray.400'> {Messages.messNoSpecialSpace4Plus}</FormHelperText>
                    }
                </FormControl>

                {/* Password */}
                <FormControl mt={4} isInvalid={!!errors.pwd}>
                    <FormLabel color='blue.500'>Password</FormLabel>
                    <Input id='pwd' autoComplete='current-password' type="password" size='md' placeholder="*******" {...registerPwd} />
                    {(!!errors.pwd)
                        ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.pwd.message}</FormErrorMessage>
                        : <FormHelperText color='gray.400' fontSize='xs'>{Messages.messMin8Char1Digit1Special}</FormHelperText>
                    }
                </FormControl>

                {/* Forgot password */}
                <HStack justifyContent='right'>
                    <Button size='xs' variant='ghost' colorScheme='blue' >Forgot password</Button>
                </HStack>

                {/* Submit */}
                <Button type='submit' variant='solid' colorScheme='blue' width="full" mt={4} >
                    Sign In
                </Button>

                {/* Dummy for test */}
                <HStack>
                    <Button size='xs' variant='ghost' colorScheme='green' onClick={() => handleTestSubmit('superAdmin')} >Sign in S admin</Button>
                    <Button size='xs' variant='ghost' colorScheme='red' onClick={() => handleTestSubmit('admin')}>Sign in admin</Button>
                    <Button size='xs' variant='ghost' colorScheme='blue' onClick={() => handleTestSubmit('businessUser')} >Sign in business user</Button>
                </HStack>
                <Text as='b' fontSize='small' color='red.400'>{meta.serverError.value}</Text>
            </form>
        </Box>
    </Center>)
}
export { AppLogin }
