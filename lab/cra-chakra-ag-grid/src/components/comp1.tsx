import { useEffect, useState } from "react";
import { Box, Button, space } from "@chakra-ui/react";
import { faker } from "@faker-js/faker";
import { AgGridReact,  } from "ag-grid-react";
import {ColDef,} from 'ag-grid-community'
import "ag-grid-community/styles/ag-grid.css"; // Core grid CSS, always needed
import "ag-grid-community/styles/ag-theme-alpine.css"; // Optional theme CSS
import "ag-grid-community/styles/ag-theme-material.css"; // Optional theme CSS
import "ag-grid-community/styles/ag-theme-balham.css"; // Optional theme CSS
function Comp1() {
  const [rowData, setRowData]: any = useState([]);

  useEffect(() => {
    const rows: any[] = createRows();
    setRowData(rows);
  }, []);
  
  const columnDefs: ColDef[] = [
    {
      field: "id",
      cellRenderer: myRenderer
    },
    {
      field: "title",
      width: 100,
      editable: true,
      filter: "agTextColumnFilter",
      cellEditorPopup: true,
      cellEditorPopupPosition: "under",
    },
    { field: "client" ,checkboxSelection: true},
    { field: "area" },
    { field: "country" },
    {
      field: "contact",
      editable: true,
      cellEditor: "agLargeTextCellEditor",
      cellEditorPopup: true,
    },
    { field: "assignee" },
    { field: "progress" },
    { field: "startTimestamp" },
    { field: "endTimestamp" },
    { field: "budget" },
    { field: "transaction" },
    { field: "account" },
    { field: "version" },
    { field: "available" },
  ];

  return (
    <Box
      className="ag-theme-balham"
      style={{
        height: "500px",
        width: "100%",
      }}
    >
      <Button
        size="xs"
        onClick={() => {
          const rows: any[] = createRows();
          setRowData(rows);
        }}
      >
        Refresh
      </Button>
      <AgGridReact
        animateRows={true}
        rowData={rowData}
        // rowHeight={50}

        columnDefs={columnDefs}
        rowSelection="multiple"
      />
    </Box>
  );
}
export { Comp1 };

function myRenderer(p: any) {
  return <span>{p.value}</span>;
}

function createRows() {
  const now = Date.now();
  const rows = [];

  for (let i = 0; i < 1000; i++) {
    rows.push({
      id: i,
      title: `Task #${i + 1}`,
      client: faker.company.name(),
      area: faker.name.jobArea(),
      country: faker.address.country(),
      contact: faker.internet.exampleEmail(),
      assignee: faker.name.fullName(),
      progress: Math.random() * 100,
      startTimestamp: now - Math.round(Math.random() * 1e10),
      endTimestamp: now + Math.round(Math.random() * 1e10),
      budget: 500 + Math.random() * 10500,
      transaction: faker.finance.transactionType(),
      account: faker.finance.iban(),
      version: faker.system.semver(),
      available: Math.random() > 0.5,
    });
  }

  return rows;
}
