import { FC } from '@src/libs'
import { AppLogin, AppPayments, AppSales, EmptyComponent } from '.'
import { AppDashboard } from './app-dashboard'
import { AppJournals } from './accounts/vouchers/journals/app-journals'

function useAppSelectComponent() {
    const appSelectComponent: AppSelectComponentType = {
        appDashboard: AppDashboard,
        appJournals: AppJournals,
        appLogin: AppLogin,
        appPayments: AppPayments,
        appSales: AppSales,
        emptyComponent: EmptyComponent,
    }

    function getComponent(compName: string) {
        return (appSelectComponent[compName])
    }

    return ({ appSelectComponent, getComponent })
}




export { useAppSelectComponent, }

type AppSelectComponentType = {
    [name: string]: FC
}