import { Box } from "@chakra-ui/react";
import DataGrid from "react-data-grid";

function Comp1() {
  return (
    <Box>
      return(
      <DataGrid columns={columns} rows={rows} rowHeight={(r:any)=>25} />)
    </Box>
  );
}
export { Comp1 };

const columns = [
  { key: "id", name: "ID" },
  { key: "title", name: "Title" },
];

const rows = [
  { id: 0, title: "example" },
  { id: 1, title: "Demo" },
];
