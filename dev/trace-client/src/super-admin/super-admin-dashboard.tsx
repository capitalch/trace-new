import { Box, DataGridPro } from '@src/features'

function SuperAdminDashboard() {
    return (<Box>
        <DataGridPro
            checkboxSelection={true}
            columns={columns}
            disableColumnMenu={true}
            getRowHeight={() => 'auto'}
            rows={rows}
            showCellRightBorder={true}
            showColumnRightBorder={true}
        />
    </Box>)
}
export { SuperAdminDashboard }

const columns = [
    {
        headerName: '#',
        headerClassName: 'header-class',
        description: 'Index',
        field: 'id',
        width: 60,
    },
    {
        headerName: 'Pr code',
        headerClassName: 'header-class',
        description: 'Product code',
        field: 'productCode',
        width: 80,
    },
]

const rows= [
    {
        id:'1',
        productCode: '1'
    },
    {
        id:'2',
        productCode: '2'
    }
]