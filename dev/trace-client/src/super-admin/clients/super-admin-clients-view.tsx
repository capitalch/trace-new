import { AgGridReact, AgGridReactProps, ColDef, useEffect, useAppGraphql, useMemo, Box, appStore, Flex, HStack } from '@src/features'
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS

function SuperAdminClientsView() {
    const { appGraphqlStrings, queryGraphql } = useAppGraphql()

    // useEffect(() => {
    //     loadData()
    // }, [])

    useMemo(loadData, [])
    const columnDefs: ColDef[] = [
        {
          field:'id' ,
          width:20
        },
        {
            field:'clientCode',
            width: 100
        },
        {
            field:'clientName',
            width: 200,
            resizable:true,
        },
        {
            field:'dbName',
            width: 150
        },
        {
            field:'isActive',
            width: 50
        }
    ]
    return (
    <Box h='90%' w='100%'
      pl={10}>
        <AgGridReact
            animateRows={true}
            columnDefs={columnDefs}
            rowData = {appStore.superAdmin.rowData.value}

        />
    </Box>
        )

    async function loadData() {
        const val = {
            sqlId: 'get_all_clients',
            // sqlArgs: {}
        }
        const q = appGraphqlStrings['genericQuery'](val, 'traceAuth')
        appStore.appLoader.isOpen.value = true
        const ret = await queryGraphql(q)
        const rows:[] = ret?.data?.genericQuery
        if(rows && (rows.length > 0)){
            appStore.superAdmin.rowData.value = rows
        }
        appStore.appLoader.isOpen.value = false
        console.log(ret)
    }
}

export { SuperAdminClientsView }