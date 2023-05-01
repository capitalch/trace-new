import {  useDialogs, appStore, } from '@src/features'
import {Button, TableContainer, Table, Thead, Tr, Th, Tbody, Td, } from '@src/libs'
import { ModalAssignBranches } from './modal-assign-branches'

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
                    <Button size='xs' variant='outline' colorScheme='teal' onClick={() => handleAssignBranches(x)}>Assign branches</Button>
                </td>
            </Tr>
        ))

        function handleAssignBranches(x: any) {
            showModalDialogB({
                title: `Select branches for user ${userName} and business unit ${x.buCode}`,
                body: ModalAssignBranches,
                defaultData: {
                    userName: userName,
                    buCode: x.buCode,
                    userBuXId: x.id,
                    branchIds: x.branchIds
                },
                size: 'sm'
            })
        }
        return (buList)
    }
}
export { ModalDisplayBues }