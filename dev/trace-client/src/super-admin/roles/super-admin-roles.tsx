import { AgGridReact, AppGridToolbar, ColDef, DeleteIcon, EditIcon, GridOptions, GridReadyEvent, RowDataUpdatedEvent, useComponentHistory, useAgGridUtils, useFeedback, useAppGraphql, useGranularEffect, useRef, Box, appStore, Flex, HStack, GridApi, appStaticStore, Button, IconButton, CloseIcon, Tooltip, useState, useDialogs, appGraphqlStrings, Messages, GraphQlQueryResultType } from '@src/features'
import { useSuperAdminRoles } from './super-admin-roles-hook'

function SuperAdminRoles() {
    const { handleAndGetQueryResult } = useAppGraphql()
    const { showError } = useFeedback()
    const { getAlternateColorStyle, getPinnedRowStyle, swapId } = useAgGridUtils()
    const { appGraphqlStrings, queryGraphql, } = useAppGraphql()
    const { componentNames, isNotInComponentHistory } = useComponentHistory()
    const { addToComponentHistory } = useComponentHistory()
    // const gridApiRef: any = useRef(null)
    const { columnDefs, defaultColDef, gridApiRef, gridOptions, onGridReady, } = useSuperAdminRoles()

    return (<Flex h='100%' w='100%' direction='column' className="ag-theme-balham" >
        <AppGridToolbar appStoreObject={appStore.superAdmin.roles} appStaticStoreObject={appStaticStore.superAdmin.roles} title='Super admin roles view'
        // CustomControl={SuperAdminNewClientButtons}
        />
        <AgGridReact
            gridOptions={gridOptions}
            onRowDataUpdated={(ev: RowDataUpdatedEvent<any>) => {
                const api = gridApiRef.current.api
                const model: any = api.getModel()
                const visibleRows: any[] = model.rowsToDisplay
                api.setPinnedBottomRowData([{ id1: 'Rows:', clientCode: visibleRows.length }])
            }}
            onFilterChanged={(ev: any) => {
                const api = gridApiRef.current.api
                const model: any = api.getModel()
                const visibleRows: any[] = model.rowsToDisplay
                api.setPinnedBottomRowData([{ id1: 'Rows:', clientCode: visibleRows.length }])
            }}
            ref={gridApiRef}
            rowData={appStore.superAdmin.roles.filteredRows.value}
            suppressScrollOnNewData={true}
        />
    </Flex>)


}
export { SuperAdminRoles }