import { Box, Button, Text } from "@chakra-ui/react";
import { useMemo, useEffect, useState } from "react";

function Comp3Memo() {
  const [, setRefresh] = useState({});
  const [count, setCount] = useState(0);
  useMemo(heavyFunc, [count]);

  return (
    <Box>
      <Button onClick={setRefresh}>Re-render</Button>
      <Button onClick={() => setCount(count + 1)}>Add count</Button>
    </Box>
  );

  function heavyFunc() {
    let ret = 0;
    for (let i = 0; i < 100000; i++) {
      ret++;
    }
    setRefresh({});
    return ret;
  }
}
export { Comp3Memo };

// const heavyFunc = () => {

// };
