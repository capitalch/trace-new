import { appValidators, Box, Button, Center, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, HStack, Input, Messages, Text, useEffect, useForm , useRef} from '@src/features'
import { useAppLogin } from './app-login-hook'
import { If, Then, Fallback } from '@src/features'

function AppLogin() {
    const cond = true
    const { handleOnSubmit, handleTestSubmit, meta, } = useAppLogin()
    const { handleSubmit, register, formState: { errors } }: any = useForm()
    const { checkPwd, checkUidEmail } = appValidators()
    const buttonRef:any = useRef()
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

    useEffect(()=>{
        const dt = buttonRef.current.attributes
        const xx = dt.getNamedItem('data-arb').value
        console.log(xx)
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
                    <Input value='test@test.com' id='uidEmail' autoFocus autoComplete='username' size='md' type='text' placeholder='test@test.com' {...registerUidEmail} />
                    {(!!errors.uidEmail)
                        ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.uidEmail.message}</FormErrorMessage>
                        : <FormHelperText fontSize='xs' color='gray.400'> 4 chars+ | no space | no special char</FormHelperText>
                    }
                </FormControl>

                {/* Password */}
                <FormControl mt={4} isInvalid={!!errors.pwd}>
                    <FormLabel color='blue.500'>Password</FormLabel>
                    <Input value='ssss@2222' id='pwd' autoComplete='current-password' type="password" size='md' placeholder="*******" {...registerPwd} />
                    {(!!errors.pwd)
                        ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.pwd.message}</FormErrorMessage>
                        : <FormHelperText color='gray.400' fontSize='xs'>8 chars+ | 1 digit | 1 special char</FormHelperText>
                    }
                </FormControl>

                {/* Forgot password */}
                <HStack justifyContent='right'>
                    <Button size='xs' variant='ghost' colorScheme='blue' >Forgot password</Button>
                </HStack>

                {/* Submit */}

                <Button ref = {buttonRef} data-arb='My test' type='submit' variant='solid' colorScheme='blue' width="full" mt={4} data-id='xxx'>
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
