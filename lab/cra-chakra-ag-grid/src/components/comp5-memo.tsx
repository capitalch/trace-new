import { Box, Button, Spacer, Text } from "@chakra-ui/react";
import { memo, useCallback, useState } from "react";
// import {MemoisedChild} from './comp-memo-child'

function CompMemo() {
  const [, setRefresh] = useState({});
  const myFunc =  () => console.log("Func passed from parent");
  const wrapMyFunc = useCallback(myFunc, [])
  return (
    <Box>
      <Text>This is Parent component</Text>
      <Spacer />
      <Button onClick={setRefresh}>Refresh</Button>
      <MemoisedChild fn={wrapMyFunc} />
    </Box>
  );
}
export { CompMemo };

function CompMemoChild({ fn }: any) {
  console.log("memo child rendered");
  fn()
  return (
    <Box>
      <Text>This is memo child component</Text>
    </Box>
  );
}

const MemoisedChild = memo(CompMemoChild);
export { MemoisedChild };
