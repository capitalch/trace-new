import { Box, VStack } from "@chakra-ui/react";
import { Button } from "antd";
import { useMemo, useState } from "react";

function Comp2Memo() {
  const [count, setCount] = useState(0);
  const [toDoCount, setToDoCount] = useState(0)
  const myVal = useMemo(() => myFunc(), [count]);
  return (
    <Box>
      <VStack>
        <span>Value is: {myVal}</span>
        <span>{toDoCount}</span>
        <Button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Click
        </Button>
        <Button onClick={()=>{
            setToDoCount(toDoCount + 1)
        }} >To do</Button>
      </VStack>
    </Box>
  );

  function myFunc() {
    let ret = 0;
    for (let i = 0; i < 1000; i++) {
      ret++;
    }
    return ret;
  }
}
export { Comp2Memo };
