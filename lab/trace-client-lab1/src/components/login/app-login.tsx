import { appStaticStore, appStore, appValidators, Box, Button, Center, Flex, FormControl, FormErrorMessage, FormHelperText, FormLabel, Heading, HStack, Input, Messages, Text, useForm } from '@src/features'
import { useAppLogin } from './app-login-hook'

function AppLogin() {
    const { meta, handleOnSubmit, } = useAppLogin()
    const { handleSubmit, register, formState: { errors } }: any = useForm()
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
                <FormControl isInvalid={!!errors.uidEmail}>
                    <FormLabel mt={3} color='blue.500'>User id / Email</FormLabel>
                    <Input id='uidEmail' autoFocus autoComplete='username' size='md' type='text' placeholder='test@test.com' {...registerUidEmail} />
                    {(!!errors.uidEmail)
                        ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.uidEmail.message}</FormErrorMessage>
                        : <FormHelperText fontSize='xs' color='gray.400'> 4 chars+ | no space | no special char</FormHelperText>
                    }
                </FormControl>
                <FormControl mt={4} isInvalid={!!errors.pwd}>
                    <FormLabel color='blue.500'>Password</FormLabel>
                    <Input id='pwd' autoComplete='current-password' type="password" size='md' placeholder="*******" {...registerPwd} />
                    {(!!errors.pwd)
                        ? <FormErrorMessage color='red.400' fontSize='xs'>{errors.pwd.message}</FormErrorMessage>
                        : <FormHelperText color='gray.400' fontSize='xs'>8 chars+ | 1 digit | 1 special char</FormHelperText>
                    }
                </FormControl>
                <HStack justifyContent='right'>
                    <Button size='xs' variant='ghost' colorScheme='blue' >Forgot password</Button>
                </HStack>
                <Text as='b' fontSize='small' color='red.400'>{meta.serverError.value}</Text>
                <Button type='submit' variant='solid' colorScheme='blue' width="full" mt={4} >
                    Sign In
                </Button>
            </form>
            <Button onClick={() => {
                appStaticStore.doReload()
            }}>Reload</Button>
        </Box>
    </Center>)
}
export { AppLogin }
