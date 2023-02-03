import { AgGridReact, AgGridReactType, AgGridReactProps, ColDef, useEffect, useFeedback, useAppGraphql, useMemo, useRef, Box, appStore, Flex, HStack, GridApi } from '@src/features'
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "ag-grid-community/styles/ag-theme-material.css"; // Optional theme CSS
import "ag-grid-community/styles/ag-theme-balham.css"; // Optional theme CSS
import { useCallback } from 'react';

function SuperAdminClientsView() {
    const { appGraphqlStrings, queryGraphql } = useAppGraphql()
    const { showAppLoader } = useFeedback()
    const gridApiRef: any = useRef(null)

    useEffect(() => {
        // loadData()
    }, [])

    const onGridReady = useCallback((params: any) => {
        loadData()
    }, [])

    // useMemo(loadData, [])
    const columnDefs: ColDef[] = [
        {
            field: 'id',
            width: 20
        },
        {
            field: 'clientCode',
            width: 100
        },
        {
            field: 'clientName',
            width: 200,
            resizable: true,
        },
        {
            field: 'dbName',
            width: 150
        },
        {
            field: 'isActive',
            width: 50
        }
    ]
    return (
        <Box h = 'calc( 100% - 42px )'  w='100%' className="ag-theme-balham" mt={1}>
            <AgGridReact
                animateRows={true}
                ref={gridApiRef}
                columnDefs={columnDefs}
                onGridReady={onGridReady}
                rowData={appStore.superAdmin.rowData.value}

            />
        </Box>
    )

    // async function onGridReady(params: any) {
    //     gridApiRef.current.api = params.api
    // }

    async function loadData() {
        const val = {
            sqlId: 'get_all_clients',
            // sqlArgs: {}
        }
        const q = appGraphqlStrings['genericQuery'](val, 'traceAuth')

        // gridApiRef.current.api.hideOverlay()
        // showAppLoader(true)
        // appStore.appLoader.isOpen.value = true

        gridApiRef.current.api.showLoadingOverlay()
        const st = new Date().getTime()
        const ret = await queryGraphql(q)
        const en = (new Date()).getTime()
        console.log(en - st, ret)
        const rows: [] = ret?.data?.genericQuery
        if (rows && (rows.length > 0)) {
            appStore.superAdmin.rowData.value = rows
        }

        gridApiRef.current.api.hideOverlay()
        showAppLoader(false)
        // gridApiRef.current.api.showLoadingOverLay()
        // appStore.appLoader.isOpen.value = false
        // console.log(ret)
    }
}

export { SuperAdminClientsView }