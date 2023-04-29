import { AppGridToolbar,  AppStoreType, appStore,  appStaticStore, } from '@src/features'
import {AgGridReact, RowDataUpdatedEvent,Flex,State,useHookstate} from '@src/libs'
import { AppNewRoleButton } from './app-new-role-button'
import { useAppRoles } from './app-roles-hook'

function AppRoles() {
    const store: State<AppStoreType> = useHookstate<AppStoreType>(appStore)
    const { gridApiRef, gridOptions, } = useAppRoles()

    return (<Flex h='100%' direction='column' className="ag-theme-balham" >
        <AppGridToolbar appStoreObject={appStore.superAdmin.roles} appStaticStoreObject={appStaticStore.superAdmin.roles} title='Super admin roles view'
            CustomControl={AppNewRoleButton}
            toShowLastNoOfRows={false} gridApiRef={gridApiRef}
        />
        <AgGridReact
            gridOptions={gridOptions}
            onRowDataUpdated={(ev: RowDataUpdatedEvent<any>) => {
                const api = gridApiRef.current.api
                const model: any = api.getModel()
                const visibleRows: any[] = model.rowsToDisplay
                api.setPinnedBottomRowData([{ roleName: 'Rows:', descr: visibleRows.length }])
            }}
            onFilterChanged={(ev: any) => {
                const api = gridApiRef.current.api
                const model: any = api.getModel()
                const visibleRows: any[] = model.rowsToDisplay
                api.setPinnedBottomRowData([{ roleName: 'Rows:', descr: visibleRows.length }])
            }}
            ref={gridApiRef}
            // rowData={store.superAdmin.roles.filteredRows.value}
            suppressScrollOnNewData={true}
        />
    </Flex>)


}
export { AppRoles }