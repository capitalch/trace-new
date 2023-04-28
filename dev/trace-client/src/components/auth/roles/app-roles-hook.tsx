import { Checkbox, } from '@chakra-ui/react'
import { AppGridSearchBox, AppStoreType, useAgGridUtils, useFeedback, useAppGraphql, useCellRenderers, appStore, appStaticStore, useDialogs, Messages, GraphQlQueryResultType, } from '@src/features'
import { _, ColDef, GridOptions, State, GridReadyEvent, useHookstate, useGranularEffect, useRef, Button, AgGridReact, Flex, HStack, useState } from '@src/libs'
import { AppEditNewRole } from './app-edit-new-role'

function useAppRoles() {
    const store: State<AppStoreType> = useHookstate<AppStoreType>(appStore)
    const { showError } = useFeedback()
    const { getRowStyle, } = useAgGridUtils()
    const { appGraphqlStrings, queryGraphql, handleAndGetQueryResult } = useAppGraphql()
    // const { componentNames, isNotInComponentHistory } = useComponentHistory()
    // const { addToComponentHistory } = useComponentHistory()
    const gridApiRef: any = useRef(null)
    const { DeleteCellRenderer, EditCellRenderer, HideCellRenderer }
        = useCellRenderers({
            dbName: 'traceAuth'
            , tableName: 'RoleM'
            , appStoreObject: store.superAdmin.roles
            , appStaticStoreObject: appStaticStore.superAdmin.roles
            , EditBodyComponent: AppEditNewRole
            , editTitle: 'Edit super admin role'
        })

    useGranularEffect(() => {
        appStaticStore.superAdmin.roles.doReload = loadData
    }, [], [loadData])

    const onGridReady = (params: GridReadyEvent) => {
        loadData()
        // if (isNotInComponentHistory(componentNames.superAdminRoles)) {
        // loadData()
        // addToComponentHistory(componentNames.superAdminRoles)
        // }
    }

    const columnDefs: ColDef[] = [
        {
            headerName: '#',
            field: 'id',
            width: 60
        },
        {
            field: 'roleName',
            headerName: 'Role name',
            headerClass: 'header',
            width: 150
        },
        {
            field: 'descr',
            headerName: 'Description',
            width: 300,
            flex: 1
        },
        {
            cellRenderer: PermissionCellRenderer,
        },
        {
            field: 'rank',
            headerName: 'Rank',
            width: 100
        },
        {
            cellRenderer: DeleteCellRenderer,
            cellStyle: { padding: 0, margin: 0 },
            width: 20
        },
        {
            cellRenderer: HideCellRenderer,
            cellStyle: { padding: 0, margin: 0 },
            width: 20
        },
        {
            cellRenderer: EditCellRenderer,
            cellStyle: { padding: 0, margin: 0 },
            width: 20
        },
    ]

    const defaultColDef: ColDef = {
        resizable: true,
        width: 100,
        filter: true,
    }

    const gridOptions: GridOptions = {
        animateRows: true,
        columnDefs: columnDefs,
        defaultColDef: defaultColDef,
        getRowStyle: getRowStyle,
        onGridReady: onGridReady,
        rowSelection: 'single'
    }

    async function loadData() {
        const args = {
            sqlId: 'get_roles',
            sqlArgs: {
                clientId: appStaticStore.login.clientId || 0
            }
        }
        const q = appGraphqlStrings['genericQuery'](args, 'traceAuth')
        gridApiRef.current.api.showLoadingOverlay()
        try {
            const result: GraphQlQueryResultType = await queryGraphql(q)
            const rows: [] = handleAndGetQueryResult(result, 'genericQuery')
            if (rows) {
                store.superAdmin.roles.rows.set(rows)
                appStaticStore.superAdmin.roles.doFilter()
            }
        } catch (e: any) {
            showError(e.message || Messages.errFetchingData)
            console.log(e.message)
        } finally {
            gridApiRef?.current?.api?.hideOverlay()
        }
    }

    return { columnDefs, defaultColDef, gridApiRef, gridOptions, onGridReady, }
}

export { useAppRoles }

function PermissionCellRenderer(params: any) {
    const rank = params?.data?.rank || (params?.data?.rank === 0)
    const { showModalDialogA } = useDialogs()

    return ((!rank) && (params.data.id) && <Button onClick={handlePermissionClick} size='xs' variant='link' colorScheme='blue'>Permission</Button>)

    function handlePermissionClick() {
        showModalDialogA({
            size: '2xl',
            title: 'Control permissions',
            body: () => <SecuredControlsWithPermissions roleId={params.data.id1} />,
            toShowCloseButton: false,
            defaultData: {}
        })
    }
}

function SecuredControlsWithPermissions({ roleId }: { roleId: number }) {
    const store: State<AppStoreType> = useHookstate<AppStoreType>(appStore)
    // const meta: any = useDeepSignal({ rows: [], filteredRows: [] })
    const { showAppLoader, showError, } = useFeedback()
    const { closeModalDialogA, } = useDialogs()
    const { getRowStyle, } = useAgGridUtils()
    const gridApiRef: any = useRef(null)
    const { appGraphqlStrings, queryGraphql, handleAndGetQueryResult, handleUpdateResult, mutateGraphql } = useAppGraphql()
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)

    const onGridReady = (params: GridReadyEvent) => {
        loadData()
    }


    const columnDefs: ColDef[] = [
        {
            headerName: '#',
            field: 'id',
            width: 50
        },
        {
            field: 'controlName',
            headerName: 'Control name',
            headerClass: 'header',
            width: 300,
            flex: 1,
        },
        {
            field: 'controlType',
            headerName: 'Type',
            headerClass: 'header',
            width: 80
        },
        {
            editable: true,
            field: 'isEnabled',
            headerName: 'Enabled',
            headerClass: 'header',
            width: 70,
            cellRenderer: function (params: any) {
                return <Checkbox
                    border='1px solid grey' size='md' mt={1}
                    colorScheme='blue'
                    isChecked={params.node.data.isEnabled}
                    onChange={(e: any) => {
                        params.node.data.isEnabled = !params.value
                        const checked = params.node.data.isEnabled
                        let col = params.column.colId
                        params.node.setDataValue(col, checked)
                    }}
                />
            }
        },
    ]

    const gridOptions: GridOptions = {
        animateRows: true,
        columnDefs: columnDefs,

        getRowStyle: getRowStyle,
        onGridReady: onGridReady,
        rowSelection: 'single'
    }

    return (
        <Flex h={400} w='100%' className='ag-theme-balham' direction='column'>
            <HStack justifyContent='space-between' mb={5}>
                <InitPermissionButtons></InitPermissionButtons>
                <AppGridSearchBox appStaticStoreObject={appStaticStore.permissions} appStoreObject={store.permissions} />
            </HStack>

            <AgGridReact
                gridOptions={gridOptions}
                ref={gridApiRef}
                // rowData={store.permissions.filteredRows.value}
                suppressScrollOnNewData={true}
            />
            <HStack justifyContent='flex-end' mt={2}>
                <Button size='md' variant='solid' disabled={isSubmitDisabled} colorScheme='blue' onClick={onSubmit}>Submit</Button>
            </HStack>
        </Flex>
    )

    function getArrayFromObject(obj: any) {
        const arr: any[] = []
        for (const key of Object.keys(obj)) {
            const myObj: any = {}
            myObj.securedControlId = key
            myObj.controlType = obj[key].controlType
            myObj.controlName = obj[key].controlName
            myObj.isEnabled = obj[key].isEnabled
            if (obj[key].isEnabled == null) {// '==' and not '===' operator is used to check for null or undefined. For null or undefined, the value is true else unaltered
                myObj.isEnabled = true
            }
            myObj.id = obj[key].xId || undefined
            arr.push(myObj)
        }
        return (arr)
    }

    function getControlsObjectFromArray(securedControls: any[]) {
        const secObject: any = {}
        for (const control of securedControls) {
            const controlId: number = control.securedControlId
            secObject[controlId] = { controlType: control.controlType, controlName: control.controlName }
        }
        return (secObject)
    }

    async function loadData() {
        const args = {
            sqlId: 'get_secured_controls_with_permissions',
            sqlArgs: {
                roleId: roleId
            }
        }
        const q = appGraphqlStrings['genericQuery'](args, 'traceAuth')
        gridApiRef.current.api.showLoadingOverlay()
        try {
            const result: GraphQlQueryResultType = await queryGraphql(q)
            const rows: any[] = handleAndGetQueryResult(result, 'genericQuery')
            if (rows) {
                const jsonResult = rows[0]?.['jsonResult']
                const allSecuredControls: any[] = jsonResult?.securedControls || []
                const permissions: any[] = jsonResult?.permissions || []
                const securedControlsObject = getControlsObjectFromArray(allSecuredControls)
                for (const item of permissions) {
                    securedControlsObject[item.securedControlId].isEnabled = item.isEnabled
                    securedControlsObject[item.securedControlId].xId = item.id
                }

                const securedControls = getArrayFromObject(securedControlsObject)
                store.permissions.rows.set(securedControls)
                appStaticStore.permissions.doFilter()
            }
        } catch (e: any) {
            showError(e.message || Messages.errFetchingData)
            console.log(e.message)
        } finally {
            gridApiRef?.current?.api?.hideOverlay()
        }
    }

    async function onSubmit() {
        const fRows: any = store.permissions.filteredRows.value
        const submitArray: any[] = fRows.map((item: any) => {
            return (
                {
                    id: item.id1,
                    securedControlId: item.securedControlId,
                    roleId: roleId,
                    isEnabled: item.isEnabled
                }
            )
        })
        const sqlObj = {
            tableName: 'RoleSecuredControlX',
            xData: submitArray
        }
        const q = appGraphqlStrings['genericUpdate'](sqlObj, 'traceAuth')
        try {
            setIsSubmitDisabled(true)
            showAppLoader(true)
            const result: GraphQlQueryResultType = await mutateGraphql(q)
            handleUpdateResult(result, () => {
                closeModalDialogA()
                appStaticStore.superAdmin.roles.doReload()
            }, 'genericUpdate')
        } catch (e: any) {
            showError(Messages.errUpdatingData)
            console.log(e.message)
        } finally {
            showAppLoader(false)
            setIsSubmitDisabled(false)
        }
    }
}

function InitPermissionButtons() {
    const store: State<AppStoreType> = useHookstate<AppStoreType>(appStore)
    return (<HStack>
        <Button size='xs' colorScheme='blue' onClick={handleOnClickReader} variant='outline'>Start with reader</Button>
        <Button size='xs' colorScheme='blue' onClick={handleOnClickManager} variant='outline'>Start with manager</Button>
    </HStack>)

    function handleOnClickReader() {
        const filteredRows: any = _.cloneDeep(store.permissions.filteredRows.value) 
        filteredRows.forEach((item: any) => {
            item.isEnabled = false
        })
        store.permissions.filteredRows.set(filteredRows)
    }

    function handleOnClickManager() {
        const filteredRows: any = _.cloneDeep(store.permissions.filteredRows.value)
        filteredRows.forEach((item: any) => {
            item.isEnabled = true
        })
        store.permissions.filteredRows.set(filteredRows)
    }
}