import {appStore, useDeepSignal } from '@src/features'
function useAppLogin() {
    const meta: any = useDeepSignal({
        serverError: '',
    })

    function handleOnSubmit(data: any) {
        appStore.login.isLoggedIn.value = true
    }

    return ({  handleOnSubmit, meta })
}
export { useAppLogin }