import { AgGridReact, AppGridToolbar, RowDataUpdatedEvent, appStore, Flex, appStaticStore, } from '@src/features'
import { SuperAdminNewRoleButton } from './super-admin-new-role-button'
import {useSuperAdminRoles } from './super-admin-roles-hook'

function SuperAdminRoles() {
    const { gridApiRef, gridOptions, } = useSuperAdminRoles()

    return (<Flex h='100%' w='100%' direction='column' className="ag-theme-balham" >
        <AppGridToolbar appStoreObject={appStore.superAdmin.roles} appStaticStoreObject={appStaticStore.superAdmin.roles} title='Super admin roles view'
            CustomControl={SuperAdminNewRoleButton}
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
export { SuperAdminRoles }