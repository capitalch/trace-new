import { AgGridReact, AppGridToolbar, RowDataUpdatedEvent, appStore, Flex, appStaticStore, } from '@src/features'
import { SuperAdminNewSecuredControlButton } from './super-admin-new-secured-control-button'
import { useSuperAdminSecuredControls } from './super-admin-secured-controls-hook'

function SuperAdminSecuredControls() {
    const { gridApiRef, gridOptions } = useSuperAdminSecuredControls()
    return (<Flex h='100%' w='100%' direction='column' className="ag-theme-balham" >
    <AppGridToolbar appStoreObject={appStore.superAdmin.securedControls} appStaticStoreObject={appStaticStore.superAdmin.securedControls} title='Super admin secured controls view'
        CustomControl={SuperAdminNewSecuredControlButton}
        toShowLastNoOfRows={false} gridApiRef={gridApiRef}
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
        rowData={appStore.superAdmin.securedControls.filteredRows.value}
        suppressScrollOnNewData={true}
    />
</Flex>)
}
export { SuperAdminSecuredControls }