import { Box } from "@chakra-ui/react"
import { GridComponent, ColumnDirective, ColumnsDirective, CheckboxSelectionType, SelectionSettingsModel } from "@syncfusion/ej2-react-grids";
import { fdata } from "./fakedata";
import { useRef } from "react";

// grid.current.selectRows(numbers[]) selects the rows programatically
function SyncfusionGrid1() {
    const model: SelectionSettingsModel = { checkboxMode: "Default" }
    const grid: any = useRef({})
    return <Box m={10} >
        <GridComponent
            ref={grid}
            dataSource={fdata}
            height={500}
            selectionSettings={model}
            rowSelected={(row: any) => {
                console.log(row.data)
                console.log(grid.current.getSelectedRecords())
            }}
            rowDeselected={(row: any) => {
                console.log(row.data)
                console.log(grid.current.getSelectedRecords())
            }}
        >
            <ColumnsDirective>
                <ColumnDirective type='checkbox' width='50' />
                <ColumnDirective field='id' width='100' textAlign="Right" headerText="Order ID" />
                <ColumnDirective field='first_name' width='100' headerText="First name" />
                <ColumnDirective field='last_name' width='100' textAlign="Right" headerText="Last name ID" />
                <ColumnDirective field='email' width='100' format="C2" textAlign="Left" headerText="Email" />
                <ColumnDirective field='gender' width='50' headerText="Gender" />
                <ColumnDirective field='car' width='50' headerText="Car" />
            </ColumnsDirective>
        </GridComponent>
    </Box>
}
export { SyncfusionGrid1 }

const data = [
    {
        OrderID: 10248, CustomerID: 'VINET', EmployeeID: 5, OrderDate: new Date(8364186e5),
        ShipName: 'Vins et alcools Chevalier', ShipCity: 'Reims', ShipAddress: '59 rue de l Abbaye',
        ShipRegion: 'CJ', ShipPostalCode: '51100', ShipCountry: 'France', Freight: 32.38, Verified: !0
    },
    {
        OrderID: 10249, CustomerID: 'TOMSP', EmployeeID: 6, OrderDate: new Date(836505e6),
        ShipName: 'Toms Spezialitäten', ShipCity: 'Münster', ShipAddress: 'Luisenstr. 48',
        ShipRegion: 'CJ', ShipPostalCode: '44087', ShipCountry: 'Germany', Freight: 11.61, Verified: !1
    },
    {
        OrderID: 10250, CustomerID: 'HANAR', EmployeeID: 4, OrderDate: new Date(8367642e5),
        ShipName: 'Hanari Carnes', ShipCity: 'Rio de Janeiro', ShipAddress: 'Rua do Paço, 67',
        ShipRegion: 'RJ', ShipPostalCode: '05454-876', ShipCountry: 'Brazil', Freight: 65.83, Verified: !0
    }
];