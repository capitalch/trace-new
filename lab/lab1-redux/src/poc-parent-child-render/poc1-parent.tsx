import { useEffect, useState } from "react"

function Poc1Parent() {
    let count = 0
    const [param1Obj, setParam1Obj] = useState({
        values: [],
        count: 0
    })

    return (<div>
        <div >Parent</div>
        <button onClick={handleIncr} className="btn btn-primary btn-sm">Incr</button>
        <button onClick={handleChangeParam} className="btn btn-dark btn-sm">Change param</button>

        <Poc1Child count={count} param1={param1Obj} />
    </div>)
    function handleIncr() {
        count = count + 1
    }
    function handleChangeParam() {
        setParam1Obj((state: any) => {
            // state.value = state.value + 1
            state.count = state.count + 0
            return ({...state})
        })
        // param1Obj.count  = param1Obj.count + 1
    }
}
export { Poc1Parent }

function Poc1Child({ count, param1 }: any) {
    const [, setRefresh] = useState({})

    useEffect(() => {
        console.log(param1.count)

    }, [param1.count])

    return (<div>
        <span>Child</span>
        <h2>{count}</h2>
        <button onClick={() => setRefresh({})} className="btn btn-success btn-sm">Refresh</button>
    </div>)
}
export { Poc1Child }