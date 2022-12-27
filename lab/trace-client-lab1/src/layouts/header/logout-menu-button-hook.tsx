import { MenuItem, resetAppStore } from '@src/features'
function useLogoutMenuButton() {

    function handleLogoutOnClick() {
        resetAppStore()
    }

    function getMenuItems() {
        return (
            [
                <MenuItem bg='white' color='gray.800' >Change uid</MenuItem>,
                <MenuItem bg='white' color='gray.800'>Change password</MenuItem>
            ]
        )
    }

    return ({ getMenuItems, handleLogoutOnClick })
}

export { useLogoutMenuButton }