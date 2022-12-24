import { Box, Button, Flex, FormControl, FormLabel, Heading, HStack, Input } from '@src/features'
function AppLogin() {
    return (<Flex width='full' height='full' align='center' justifyContent='center'>
        <Box p={6} maxWidth='500px' borderWidth={1} borderRadius={8} boxShadow='lg'>
            <HStack justifyContent='center'>
                <Heading>Login</Heading>
            </HStack>
            <Box mt={6} mb={1} textAlign='left'>
                <form>
                    <FormControl isRequired>
                        <FormLabel>User id / Email</FormLabel>
                        <Input type='email' placeholder='test@test.com' />
                    </FormControl>
                    <FormControl mt={6} isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" placeholder="*******" />
                    </FormControl>
                    <Flex justifyContent='flex-end'>
                        <Button size='xs' variant='ghost' colorScheme='blue'>Forgot password</Button>
                    </Flex>
                    <Button variant='solid' colorScheme='blue' width="full" mt={4} type="submit">
                        Sign In
                    </Button>
                    
                </form>
            </Box>
        </Box>
    </Flex>)
}
export { AppLogin }