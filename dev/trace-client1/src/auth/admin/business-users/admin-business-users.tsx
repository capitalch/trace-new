import { AgGridReact, AppGridToolbar, RowDataUpdatedEvent, appStore, Flex, appStaticStore, } from '@src/features'
import { useAdminBusinessUsers } from './admin-business-users-hook'
import { AdminNewBusinessUserButton } from './admin-new-business-user-button'

function AdminBusinessUsers() {
    const { gridApiRef, gridOptions } = useAdminBusinessUsers()
    return (<Flex h='100%' direction='column' className="ag-theme-balham" >
        <AppGridToolbar appStoreObject={appStore.admin.businessUsers} appStaticStoreObject={appStaticStore.admin.businessUsers} title='Business users view'
            CustomControl={AdminNewBusinessUserButton}
            toShowLastNoOfRows={true} gridApiRef={gridApiRef}
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
            rowData={appStore.admin.businessUsers.filteredRows.value}
            suppressScrollOnNewData={true}
        />
    </Flex>)
}
export { AdminBusinessUsers }