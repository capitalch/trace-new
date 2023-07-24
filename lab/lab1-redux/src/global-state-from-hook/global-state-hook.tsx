import { useState } from "react"

function useGlobalState() {
    const [count, setCount] = useState(0)

    return ({count, setCount })
}
export { useGlobalState }