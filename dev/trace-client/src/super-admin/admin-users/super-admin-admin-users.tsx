import { AgGridReact, AppGridToolbar, RowDataUpdatedEvent, appStore, Flex, appStaticStore, } from '@src/features'
import { useSuperAdminAdminUsers } from './super-admin-admin-users-hook'
import { SuperAdminNewAdminUserButton } from './super-admin-new-admin-user-button'

function SuperAdminAdminUsers() {
    const { gridApiRef, gridOptions } = useSuperAdminAdminUsers()
    return (<Flex h='100%' w='100%' direction='column' className="ag-theme-balham" >
    <AppGridToolbar appStoreObject={appStore.superAdmin.securedControls} appStaticStoreObject={appStaticStore.superAdmin.securedControls} title='Super admin users'
        CustomControl={SuperAdminNewAdminUserButton}
        toShowLastNoOfRows={true}
    />
    <AgGridReact
        gridOptions={gridOptions}
        onRowDataUpdated={(ev: RowDataUpdatedEvent<any>) => {
            const api = gridApiRef.current.api
            const model: any = api.getModel()
            const visibleRows: any[] = model.rowsToDisplay
            api.setPinnedBottomRowData([{ controlName: 'Rows:', controlNo: visibleRows.length }])
        }}
        onFilterChanged={(ev: any) => {
            const api = gridApiRef.current.api
            const model: any = api.getModel()
            const visibleRows: any[] = model.rowsToDisplay
            api.setPinnedBottomRowData([{ controlName: 'Rows:', controlNo: visibleRows.length }])
        }}
        ref={gridApiRef}
        rowData={appStore.superAdmin.adminUsers.filteredRows.value}
        suppressScrollOnNewData={true}
    />
</Flex>)
}
export { SuperAdminAdminUsers }