import { Box, HStack, VStack } from "@chakra-ui/react";
import { Button } from "antd";
import {useCallback, useMemo, useState } from "react";

function Comp2Memo() {
  const [count, setCount] = useState(0);
  const [toDoCount, setToDoCount] = useState(0);
  const myVal:any = useCallback(() => myFunc, [count]);
  return (
    <Box>
      <VStack>
        <HStack>Value is: {myVal()}</HStack>
        <span>{toDoCount}</span>
        <Button
          onClick={() => {
            setCount(count + 1);
          }}
        >
          Click
        </Button>
        <Button
          onClick={() => {
            setToDoCount(toDoCount + 1);
          }}
        >
          To do
        </Button>
      </VStack>
    </Box>
  );


  function myFunc() {
    // newStyleDelay()
    setToDoCount(toDoCount + 1);
    let ret = 0;
    for (let i = 0; i < 1000; i++) {
      ret++;
    }
    // return ret;
  }
}
export { Comp2Memo };

// async function newStyleDelay() {
//   await setTimeout(() => {
//     setToDoCount(toDoCount + 1)
//   }, 10000);
//   console.log("It will be printed 3-rd with delay");
// }