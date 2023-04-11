import { Button, ColDef, GridOptions, GridReadyEvent, moment, useComponentHistory, useAgGridUtils, useFeedback, useAppGraphql, useCellRenderers, useGranularEffect, useDialogs, useRef, appStore, appStaticStore, Messages, GraphQlQueryResultType, TableContainer, Table, TableCaption, Thead, Tr, Th, Tbody, Td, Box, Text, HStack, Checkbox, VStack, Flex, appGraphqlStrings, useEffect, useDeepSignal, useState } from '@src/features'
import { AdminEditNewBusinessUser } from './admin-edit-new-business-user'
// import { SuperAdminEditNewAdminUser } from './super-admin-edit-new-admin-user'

function useAdminBusinessUsers() {
    const { showError } = useFeedback()
    const { getRowStyle } = useAgGridUtils()
    const { appGraphqlStrings, handleAndGetQueryResult, queryGraphql, } = useAppGraphql()
    const { addToComponentHistory, componentNames, isNotInComponentHistory } = useComponentHistory()
    const gridApiRef: any = useRef(null)

    useGranularEffect(() => {
        appStaticStore.admin.businessUsers.doReload = loadData
    }, [], [loadData])

    const { DeleteCellRenderer, EditCellRenderer, HideCellRenderer }
        = useCellRenderers({
            dbName: 'traceAuth'
            , tableName: 'UserM'
            , appStoreObject: appStore.admin.businessUsers
            , appStaticStoreObject: appStaticStore.admin.businessUsers
            , EditBodyComponent: AdminEditNewBusinessUser
            , editTitle: 'Edit business user'
        })

    const columnDefs: ColDef[] = [
        {
            headerName: '#',
            field: 'id',
            width: 60
        },
        {
            field: 'roleName',
            headerName: 'Role name',
            width: 200
        },

        {
            field: 'uid',
            headerName: 'Uid',
            width: 150
        },
        {
            field: 'userName',
            headerName: 'User name',
            width: 180
        },
        {
            field: 'mobileNo',
            headerName: 'Mobile',
            width: 90
        },
        {
            field: 'userEmail',
            headerName: 'Email',
            width: 200,
        },
        {
            field: 'descr',
            headerName: 'Desc',
            width: 200,
            minWidth: 80,
            flex: 1
        },
        {
            field: 'businessUnits',
            headerName: 'Business units',
            width: 250,
        },
        {
            headerName: 'Branches',
            cellRenderer: BranchCellRenderer
        },
        {
            field: 'isActive',
            headerName: 'Active',
            width: 80,
        },
        {
            field: 'timestamp',
            headerName: 'Timestamp',
            valueFormatter: (params: any) => {
                const dateTime = params.value ? moment(params.value).format('YYYY/MM/DD hh:mm:ss') : ''
                return (dateTime)
            },
            width: 140
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
        headerClass: 'header',
        resizable: true,
        width: 100,
        suppressSizeToFit: true,
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
            sqlId: 'get_business_users',
            sqlArgs: {
                clientId: appStaticStore.login.clientId
            }
        }
        const q = appGraphqlStrings['genericQuery'](args, 'traceAuth')
        gridApiRef.current.api.showLoadingOverlay()
        try {
            const result: GraphQlQueryResultType = await queryGraphql(q)
            const rows: [] = handleAndGetQueryResult(result, 'genericQuery')
            if (rows) {
                appStore.admin.businessUsers.rows.value = rows
                appStaticStore.admin.businessUsers.doFilter()
            }
        } catch (e: any) {
            showError(e.message || Messages.errFetchingData)
            console.log(e.message)
        } finally {
            gridApiRef?.current?.api?.hideOverlay()
        }
    }

    function onGridReady(params: GridReadyEvent) {
        if (isNotInComponentHistory(componentNames.adminBusiinessUsers)) {
            loadData()
            addToComponentHistory(componentNames.adminBusiinessUsers)
        }
    }

    return { gridApiRef, gridOptions, }
}
export { useAdminBusinessUsers }

function BranchCellRenderer(params: any) {
    const { showModalDialogA } = useDialogs()
    return (
        <Button onClick={handleBranchesClick} size='xs' variant='link' colorScheme='blue'>Branches</Button>
    )

    function handleBranchesClick() {
        const userName = params?.data?.userName || ''
        const buIdsJson = params?.data?.buIdsJson || {}
        showModalDialogA({
            title: `Business units and respective branches for ${userName}`,
            body: ModalDisplayBues,
            defaultData: {
                userName: userName,
                buIdsJson: buIdsJson
            },
            size: 'lg'
        })
    }
}

function ModalDisplayBues() {
    const defaultData = appStore.modalDialogA.defaultData.value
    const { showModalDialogB } = useDialogs()
    const buIdsJson: any[] = defaultData.buIdsJson
    const userName: string = defaultData.userName
    return (<TableContainer minHeight={400} fontSize={12}>
        <Table variant='unstyled' colorScheme='gray' size='sm'>
            {/* <TableCaption>{`Business units for ${defaultData.userName}`}</TableCaption> */}
            <Thead>
                <Tr>
                    <Th pl={0}>Bu Id</Th>
                    <Th pl={0}>Bu code</Th>
                    <Th pl={0}>Branch ids</Th>
                    <Th pl={0}>Assign Branches</Th>
                </Tr>
            </Thead>
            <Tbody>
                {getBuList()}
            </Tbody>
        </Table>
    </TableContainer>)

    function getBuList() {
        const buList = buIdsJson.map((x: any, ind: number) => (
            <Tr key={ind + 1}>
                <Td>{x.buId}</Td>
                <td>{x.buCode}</td>
                <td>{x.branchIds}</td>
                <td>
                    <Button size='xs' variant='outline' colorScheme='teal' onClick={() => handleAssignBranches(x.buCode)}>Assign branches</Button>
                </td>
            </Tr>
        ))

        function handleAssignBranches(buCode: string) {
            showModalDialogB({
                title: `Select branches for user ${userName} and business unit ${buCode}`,
                // body: ModalDisplayBues,
                body: ModalAssignBranches,
                defaultData: {
                    userName: userName,
                    buCode: buCode
                },
                size: 'sm'
            })
        }
        return (buList)
    }
}
export { ModalDisplayBues }

function ModalAssignBranches() {
    const [, setRefresh] = useState({})
    const meta: any = useDeepSignal({
        branches: [],
        testIsChecked: false
    })
    const defaultData = appStore.modalDialogB.defaultData.value
    const buCode = defaultData.buCode
    const { appGraphqlStrings, handleAndGetQueryResult, queryGraphql, } = useAppGraphql()
    const { showAppLoader, showError } = useFeedback()

    useGranularEffect(() => {
        loadAllBranches()
    }, [], [loadAllBranches])

    return (
        <Box>
            <HStack pl={5} pr={5} fontSize={12}>
                <Text w={50} >Id</Text>
                <Text w={70}>Code</Text>
                <Text w='xl' flexWrap='wrap'>Branch name</Text>
                <Text>Selected</Text>
            </HStack>
            <Flex direction='column' maxHeight={350} overflowY='auto'>
                {getBranches()}
            </Flex>
            <Button mt={8} mb={1} size='md' width='full' colorScheme='blue' onClick={handleSubmit}>Submit</Button>
        </Box>
    )

    async function handleSubmit() {
        const branches: BranchType[] = meta.branches.value
        const enabledBranches  = branches.filter((x:BranchType)=>(x.isEnabled))
        const enabledIds = enabledBranches.map((x:BranchType)=>(x.id))
        const idsAsString = enabledIds.join()
        console.log(idsAsString)
    }

    async function loadAllBranches() {
        const args = {
            sqlId: 'get_all_branches',
            buCode: 'capitalchowringhee'
        }
        const q = appGraphqlStrings['genericQuery'](args, 'capital_test',)
        showAppLoader(true)
        try {
            const result: GraphQlQueryResultType = await queryGraphql(q)
            const rows: any[] = handleAndGetQueryResult(result, 'genericQuery')
            if (rows) {
                meta.branches.value = rows.map((x: any) => ({ ...x, isEnabled: false }))
            }
        } catch (e: any) {
            showError(e.message || Messages.errFetchingData)
            console.log(e.message)
        } finally {
            showAppLoader(false)
        }
    }

    function getBranches() {
        const branches: BranchType[] = meta.branches.value
        const branchesLayout = branches.map((branch: any, idx: number) => (
            <HStack fontSize={12} pl={5} pr={5} pt={1} pb={1} key={idx + 1} justifyContent='space-between'>
                <Text w={50} >{branch.id}</Text>
                <Text w={70}>{branch.branchCode}</Text>
                <Text w='xl' flexWrap='wrap'>{branch.branchName}</Text>
                <Checkbox isChecked={meta.branches?.value[idx]?.isEnabled || false} onChange={(e: any) => {
                    const branches: BranchType[] = meta.branches.value.map((x: BranchType) => ({ ...x }))
                    branches[idx].isEnabled = e.target.checked
                    meta.branches.value = branches.map((x: BranchType) => ({ ...x }))
                }} />
            </HStack>
        ))
        return (branchesLayout)
    }
    type BranchType = {
        id: number,
        branchCode: string,
        branchName: string,
        isEnabled?: any
    }
}

// const branchIds = [1, 2, 3, 4, 5, 6, 7, 8, 8, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20]
// const branches = branchIds.map((x: any, idx: number) => (
//     <HStack fontSize={12} pl={5} pr={5} pt={2} key={idx + 1} justifyContent='space-between'>
//         <Text w={50} >{idx}</Text>
//         <Text w='xl' flexWrap='wrap'>{`Branch ${idx + 1}`}</Text>
//         <Checkbox />
//     </HStack>
// ))