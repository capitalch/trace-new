import {
    appStore, Button, ChevronDownIcon, Menu, MenuButton, MenuList, MenuItem, PersonIcon, resetAppStore,
} from '@src/features'

function LogoutMenuButton() {
    return (
        <Menu>
            <MenuButton ml='auto' mr={2}
                _hover={{
                    background: "blue.500",
                    color: "gray.800",
                }}
                _active={{
                    transform: 'scale(0.98)',
                }}
                _expanded={{ bg: 'amber' }}
                // _focus={{boxShadow:'outline', }}
                size='sm'
                as={Button}
                aria-label='Logout'
                leftIcon={<PersonIcon fontSize='1.2rem' />}
                rightIcon={<ChevronDownIcon fontSize='1.2rem' />}
                variant='ghost'>{appStore.login.uidEmail}</MenuButton>
            <MenuList >
                <MenuItem bg='white' color='gray.800' >Change uid</MenuItem>
                <MenuItem bg='white' color='gray.800'>Change password</MenuItem>
                <MenuItem as='button'
                    // transition='all 0.2s cubic-bezier(.08,.52,.52,1)'
                    bg='gray.200'
                    borderColor='red.400'
                    color='blue.400'
                    _hover={{ bg: 'yellow', transform: 'scale(0.98)', }}
                    _active={{
                        // bg: 'red',
                        transform: 'scale(0.98)',
                        // borderColor: 'red',
                    }}
                    // _focus={{
                    //     boxShadow:
                    //         '0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)',
                    // }}

                    onClick={handleLogoutOnClick}
                >Logout</MenuItem>
            </MenuList>
        </Menu>
    )

    function handleLogoutOnClick() {
        resetAppStore()
    }
}
export { LogoutMenuButton }