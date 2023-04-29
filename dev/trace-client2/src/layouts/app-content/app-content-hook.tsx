import { FC } from '@src/libs'
import { AppDashboard, AppJournals, AppLogin, AppPayments, AppSales, EmptyComponent, SuperAdminDashboard } from '@src/components'

function useAppContent() {
    const selectComponent: AppSelectComponentType = {
        appDashboard: AppDashboard,
        appJournals: AppJournals,
        appLogin: AppLogin,
        appPayments: AppPayments,
        appSales: AppSales,
        emptyComponent: EmptyComponent,
        superAdminDashboard: SuperAdminDashboard,
        // superAdminClients: SuperAdminClients,
    }

    function getComponent(compName: string) {
        return (selectComponent[compName])
    }

    return ({ getComponent })
}
export { useAppContent }

type AppSelectComponentType = {
    [name: string]: FC
}
