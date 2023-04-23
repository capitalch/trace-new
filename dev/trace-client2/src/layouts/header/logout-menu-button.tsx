import {
    AppStoreType,
    Button, ChevronDownIcon, Menu, MenuButton, MenuList, PersonIcon, State, appStore, useHookstate
} from '@src/features'
import { useLogoutMenuButton } from './logout-menu-button-hook'

function LogoutMenuButton() {
    const store: State<AppStoreType> = useHookstate<AppStoreType>(appStore)

    const { getMenuItems, } = useLogoutMenuButton()
    return (
        <Menu>
            <MenuButton ml='auto' mr={2}
                as={Button}
                _hover={{
                    background: "blue.500",
                    color: "gray.50",
                }}
                _active={{
                    transform: 'scale(0.98)',
                }}
                _expanded={{ bg: 'amber' }}
                size='sm'
                aria-label='Logout'
                leftIcon={<PersonIcon fontSize='1.2rem' />}
                rightIcon={<ChevronDownIcon fontSize='1.2rem' />}
                variant='ghost'>{store.login.uidEmail.get()}</MenuButton>
            <MenuList p={0} borderRadius={8}>
                {getMenuItems()}
            </MenuList>
        </Menu>
    )
}
export { LogoutMenuButton }