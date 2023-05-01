import { AppGridToolbar, appStore, } from '@src/features'
import { AgGridReact, RowDataUpdatedEvent, Flex, Box, } from '@src/libs'
import { useAdminBusinessUnits } from './admin-business-units-hook'
import { AdminNewBusinessUnitButton } from './admin-new-business-unit-button'

function AdminBusinessUnits() {
    const { gridApiRef, gridOptions, } = useAdminBusinessUnits()
    return (<Flex h='100%' direction='column' className="ag-theme-balham" >
        <AppGridToolbar appStoreObject={appStore.admin.businessUnits}
            // appStaticStoreObject={appStaticStore.admin.businessUnits}
            title='Admin business units view'
            CustomControl={AdminNewBusinessUnitButton}
            gridApiRef={gridApiRef}
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
            rowData={appStore.admin.businessUnits.filteredRows.value}
            suppressScrollOnNewData={true}
        />
    </Flex>)
}
export { AdminBusinessUnits }