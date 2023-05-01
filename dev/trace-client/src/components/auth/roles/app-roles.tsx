import {  AppGridToolbar, appStore,  } from '@src/features'
import {AgGridReact,RowDataUpdatedEvent, Flex,} from '@src/libs'
import { AppNewRoleButton } from './app-new-role-button'
import { useAppRoles } from './app-roles-hook'

function AppRoles() {
    const { gridApiRef, gridOptions, } = useAppRoles()

    return (<Flex h='100%' direction='column' className="ag-theme-balham" >
        <AppGridToolbar appStoreObject={appStore.superAdmin.roles} title='Super admin roles view'
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
            rowData={appStore.superAdmin.roles.filteredRows.value}
            suppressScrollOnNewData={true}
        />
    </Flex>)


}
export { AppRoles }