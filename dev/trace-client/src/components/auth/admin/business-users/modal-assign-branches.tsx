import {  useFeedback, useAppGraphql,useDialogs, appStore, Messages, GraphQlQueryResultType,SqlObjectType } from '@src/features'
import {Button, useGranularEffect, Box, Text, HStack, Checkbox, Flex, useSignal, useState, } from '@src/libs'
function ModalAssignBranches() {
    const { closeModalDialogA, closeModalDialogB } = useDialogs()
    const [isSubmitDisabled, setIsSubmitDisabled] = useState(false)
    const meta: any = {
        branches: useSignal([])
    }
    const defaultData = appStore.modalDialogB.defaultData.value
    // const buCode = defaultData.buCode
    const userBuXId = defaultData.userBuXId
    const branchIds: string = defaultData.branchIds || ''
    const { appGraphqlStrings, handleAndGetQueryResult, handleUpdateResult, mutateGraphql, queryGraphql, } = useAppGraphql()
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
            <Button mt={8} mb={1} size='md' width='full' colorScheme='blue' isDisabled={isSubmitDisabled} onClick={handleSubmit}>Submit</Button>
        </Box>
    )

    async function handleSubmit() {
        const branches: BranchType[] = meta.branches.value
        const enabledBranches = branches.filter((x: BranchType) => (x.isEnabled))
        const enabledIds = enabledBranches.map((x: BranchType) => (x.id))
        const idsAsString = enabledIds.join()
        const sqlObj: SqlObjectType = {
            tableName: 'UserBuX',
            xData: {
                id: userBuXId,
                branchIds: idsAsString
            }
        }
        const q = appGraphqlStrings['genericUpdate'](sqlObj, 'traceAuth')
        try {
            setIsSubmitDisabled(true)
            showAppLoader(true)
            const result: GraphQlQueryResultType = await mutateGraphql(q)
            handleUpdateResult(result, () => {
                closeModalDialogB()
                closeModalDialogA()
                appStore.admin.businessUsers.doReload()
                appStore.admin.bues.doReload()
            }, 'genericUpdate')
        } catch (e: any) {
            showError(Messages.errUpdatingData)
            console.log(e.message)
        } finally {
            showAppLoader(false)
            setIsSubmitDisabled(false)
        }
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
                const selectedBranchIds: any[] = branchIds.split(',')
                const rows1: BranchType[] = rows.map((x: any) => ({
                    ...x, isEnabled: selectedBranchIds.find((y: any) => (+y) === x.id) ? true : false
                }))

                meta.branches.value = rows1
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

export {ModalAssignBranches}