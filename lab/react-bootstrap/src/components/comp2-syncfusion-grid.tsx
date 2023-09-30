import { GridComponent, ColumnDirective, ColumnsDirective, Inject, Page, Selection, Resize, Sort } from "@syncfusion/ej2-react-grids"
import { mockData } from './mock-data'
// import '../App.css'

function Comp2SyncfusionGrid() {
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
    // console.log(mockData)
    return (
        <GridComponent
            dataSource={data}
            // height='calc(100vh - 380px)' 
            height={200}
            // width={600}
            // allowPaging={true}
            // allowSelection={true}
            // gridLines='Both'
            // allowResizing={true}
            // dataBound={onDataBound}
            // rowSelected={onRowSelected}
            // rowDeselected={onRowDeSelected}
            // actionBegin={onActionBegin}
            // actionComplete={onActionComplete}
            // dataStateChange={onDataStateChanged}

            // pageSettings={{
            //     currentPage: 1,
            //     pageSize: 20,
            //     pageSizes: ['5', '10', '20', '50', '100'],
            // }}
        >
            <ColumnsDirective>
                <ColumnDirective type='checkbox' width={20} />
                <ColumnDirective field='id' headerText="ID" isPrimaryKey={true} width={20} />
                <ColumnDirective  field='first_name' headerText="First name" width={30} />
                <ColumnDirective  field='last_name' headerText="Last name" width={30} />
                <ColumnDirective field='email' headerText="Email" width={40} />
                <ColumnDirective field='gender' headerText="Sexe" width={10} />
                <ColumnDirective field='ip_address' headerText="IP" width={40} />
            </ColumnsDirective>
            <Inject services={[Page, Resize, Selection]} />
        </GridComponent>
    
    )

    function onActionBegin(e: any) {
        console.log(e)
    }

    function onActionComplete(e:any){
        console.log(e)
    }

    function onDataBound(e: any) {
        console.log(e)
    }

    function onDataStateChanged(e: any) {
        console.log(e)
    }

    function onRowSelected(e: any) {
        console.log(e)
    }

    function onRowDeSelected(e: any) {
        console.log(e)
    }
}
export { Comp2SyncfusionGrid }

//  {/* <ColumnsDirective>
//                 <ColumnDirective field='OrderID' width='100' textAlign="Right" />
//                 <ColumnDirective field='CustomerID' width='100' />
//                 <ColumnDirective field='EmployeeID' width='100' textAlign="Right" />
//                 <ColumnDirective field='Freight' width='100' format="C2" textAlign="Right" />
//                 <ColumnDirective field='ShipCountry' width='100' />
//             </ColumnsDirective> */}