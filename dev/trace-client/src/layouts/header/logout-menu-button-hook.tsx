import { doLogout, appStore, UserTypesEnum, SideMenuTypesEnum, useDialogs, AppConstants } from '@src/features'
import { AccountsIcon, AdminMenuIcon, ChangePasswordIcon, ChangeUidIcon, LogoutIcon, MenuItem, } from '@src/libs'
import { UidChange } from './uid-change'
import { PasswordChange } from './password-change'
function useLogoutMenuButton() {
    const userType = appStore.login.userType.value
    const { showModalDialogA } = useDialogs()
    function getAdminMenuItems() {
        return (
            [
                <LogoutMenuItem itemText='Change uid' key='1' handleOnClick={handleChangeUid} MenuIcon={ChangeUidIcon} />,
                <LogoutMenuItem itemText='Change password' key='2' handleOnClick={handleChangePassword} MenuIcon={ChangePasswordIcon} />,
                <LogoutMenuItem itemText='Show admin menu' key='3' handleOnClick={handleSetAdminMenu} MenuIcon={AdminMenuIcon} />,
                <LogoutMenuItem itemText='Show accounts menu' handleOnClick={handleSetAccountsMenu} key='4' MenuIcon={AccountsIcon} />,
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

    function handleChangeUid() {
        showModalDialogA({
            title: 'Change uid',
            body: UidChange
        })
    }

    function handleChangePassword() {
        showModalDialogA({
            title: 'Change password',
            body: PasswordChange
        })
    }

    function handleLogoutOnClick() {
        doLogout()
    }

    function handleSetAccountsMenu() {
        appStore.content.title.value = `${appStore.login.buName.value} accounts`
        appStore.layouts.sideMenuType.value = SideMenuTypesEnum.accountsMenu
    }

    function handleSetAdminMenu() {
        appStore.content.title.value = `${appStore.login.buName.value} administration`
        appStore.layouts.sideMenuType.value = SideMenuTypesEnum.adminMenu
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
