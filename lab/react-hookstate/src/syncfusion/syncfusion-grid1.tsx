import { Box, Text } from "@chakra-ui/react"
import { GridComponent, ColumnDirective, ColumnsDirective, CheckboxSelectionType, SelectionSettingsModel, Inject, Toolbar, Group, AggregatesDirective, AggregateDirective, AggregateColumnsDirective, AggregateColumnDirective, Aggregate } from "@syncfusion/ej2-react-grids";
import { fdata } from "./fakedata";
import { useEffect, useRef } from "react";
import dayjs from "dayjs";

// grid.current.selectRows(numbers[]) selects the rows programatically
// grid.current.getSelectedRecords gets all selected rows
// grid.persistSelection persists selection in all operations
function SyncfusionGrid1() {
    const id = crypto.randomUUID()
    const model: SelectionSettingsModel = { checkboxMode: "Default" }
    const grid: any = useRef({})
    // const toolbarOptions = ['Expand', 'Collapse']
    const toolbarTemplate: any = () => (
        <Box display='flex' flexDirection='column'>
            <label>Toolbar</label>
            <Text onChange={handleToolbarTextChanged} />
        </Box>
    )
    const footerCount = (props: any) => {
        return (<span>Count: {props.Count}</span>)
    }
    useEffect(() => {
        grid.current.selectRows([0,3,6])
    }, [])

    const dateFormatter = (field:string, data:any, column:any) => {
        // return data[field]
        return(dayjs(data[field])).format("MMM D, YYYY hh:mm A")
        // return('01/01/2023')
    }

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
        // toolbar={toolbarTemplate}
        >
            <ColumnsDirective>
                <ColumnDirective type='checkbox' width='50' />
                <ColumnDirective field='id' width='100' textAlign="Right" headerText="Order ID" />
                <ColumnDirective field='first_name' width='100' headerText="First name" />
                <ColumnDirective field='last_name' width='100' textAlign="Right" headerText="Last name ID" />
                <ColumnDirective field='email' width='100' format="C2" textAlign="Left" headerText="Email" />
                <ColumnDirective field='gender' width='50' headerText="Gender" valueAccessor={undefined} />
                <ColumnDirective field='dob' width='60' headerText='DOB' valueAccessor={dateFormatter} />
                {/* <ColumnDirective field='car' width='50' headerText="Car" /> */}
            </ColumnsDirective>
            <AggregatesDirective>
                <AggregateDirective>
                    <AggregateColumnsDirective>
                        <AggregateColumnDirective field="id" type='Count' footerTemplate={footerCount} />
                    </AggregateColumnsDirective>
                </AggregateDirective>
            </AggregatesDirective>
            <Inject services={[Aggregate, Toolbar, Group]} />
        </GridComponent>
    </Box>

    function handleToolbarTextChanged(e: any) {
        console.log(e.target.value)
    }
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