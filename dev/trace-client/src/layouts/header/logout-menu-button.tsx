import {
    appStore, Button, ChevronDownIcon, Menu, MenuButton, MenuList, MenuItem, PersonIcon, resetAppStore,
} from '@src/features'
import { useLogoutMenuButton } from './logout-menu-button-hook'

function LogoutMenuButton() {
    const {getMenuItems, handleLogoutOnClick } = useLogoutMenuButton()
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
            <MenuList  p={0} borderRadius={8}>
                {getMenuItems()}
            </MenuList>
        </Menu>
    )
}
export { LogoutMenuButton }