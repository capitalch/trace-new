import { FC } from '@src/libs'
import { AppLogin, AppPayments, AppSales, EmptyComponent } from '@src/components'
import { AppDashboard } from './app-dashboard'
import { AppJournals } from './accounts/vouchers/journals/app-journals'

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

export { appSelectComponent, getComponent }

type AppSelectComponentType = {
    [name: string]: FC
}