import { AccountsIcon, AdminMenuIcon, appStore, ChangePasswordIcon, ChangeUidIcon, LogoutIcon, MenuItem, resetAppStore, UserTypesEnum } from '@src/features'

function useLogoutMenuButton() {
    const userType = appStore.login.userType.value

    function getAdminMenuItems() {
        return (
            [
                <LogoutMenuItem itemText='Change uid' key='1' MenuIcon={ChangeUidIcon} />,
                <LogoutMenuItem itemText='Change password' key='2' MenuIcon={ChangePasswordIcon} />,
                <LogoutMenuItem itemText='Show admin menu' key='3' MenuIcon={AdminMenuIcon} />,
                <LogoutMenuItem itemText='Show accounts menu' key='4' MenuIcon={AccountsIcon} />,
                <LogoutMenuItem itemText='Logout' handleOnClick={handleLogoutOnClick} key='5' MenuIcon={LogoutIcon} />,
            ]
        )
    }

    function getSuperAdminMenuItems() {
        return (
            [
                <LogoutMenuItem itemText='Logout' handleOnClick={handleLogoutOnClick} key='1' MenuIcon={LogoutIcon} />,
            ]
        )
    }

    function getBusinessUserMenuItems() {
        return (
            [
                <LogoutMenuItem itemText='Change uid' key='1' MenuIcon={ChangeUidIcon} />,
                <LogoutMenuItem itemText='Change password' key='2' MenuIcon={ChangePasswordIcon} />,
                <LogoutMenuItem itemText='Logout' handleOnClick={handleLogoutOnClick} key='3' MenuIcon={LogoutIcon} />,
            ]
        )
    }

    function getMenuItems() {
        let ret: any = undefined
        if (userType === UserTypesEnum.SUPER_ADMIN) {
            ret = getSuperAdminMenuItems
        } else if (userType === UserTypesEnum.ADMIN) {
            ret = getAdminMenuItems
        } else {
            ret = getBusinessUserMenuItems
        }
        return (ret())
    }

    function handleLogoutOnClick() {
        resetAppStore()
    }

    return ({ getMenuItems, handleLogoutOnClick })
}

export { useLogoutMenuButton }

function LogoutMenuItem({ handleOnClick, MenuIcon, itemText }: any) {
    return (<MenuItem as='button'
        // transition='all 0.5s cubic-bezier(.08,.52,.52,1)'
        bg='gray.50'
        borderWidth='1px'
        borderColor='gray.200'
        color='blue.700'
        icon={<MenuIcon fontSize='1.2rem' />}
        _hover={{ bg: 'gray.100' }}
        _active={{
            transform: 'scale(0.98)',
            borderColor: 'gray.500',
            bg: 'gray.400',
            color: 'black'
        }}
        onClick={handleOnClick}
    >{itemText}</MenuItem>)
}