import { useDispatch, useSelector } from "react-redux"
import { increment1, increment2, increment3, incrementNested } from "../../features/multi-counter/multi-counter-slice"

function Counter() {
    const count = useSelector((state:any)=>state.multiCounter.count)
    return (
        <div className="bg-slate-200 p-1 px-5">
            <label className="border-l-amber-400">Main counter</label>
            <div className="text-center">{count}</div>
        </div>)
}
export { Counter }

function Counter1(){
    const count = useSelector((state:any)=>state.multiCounter.count1)
    return (
        <div className="bg-slate-200 p-1 px-5">
            <label className="border-l-amber-400">Counter1</label>
            <div className="text-center">{count}</div>
        </div>)
}

export {Counter1}

function Counter2(){
    const count = useSelector((state:any)=>state.multiCounter.count2)
    return (
        <div className="bg-slate-200 p-1 px-5">
            <label className="border-l-amber-400">Counter2</label>
            <div className="text-center">{count}</div>
        </div>)
}

export {Counter2}

function Counter3(){
    const count = useSelector((state:any)=>state.multiCounter.count3)
    return (
        <div className="bg-slate-200 p-1 px-5">
            <label className="border-l-amber-400">Counter3</label>
            <div className="text-center">{count}</div>
        </div>)
}

export {Counter3}

function NestedCounter(){
    const count = useSelector((state:any)=>state.multiCounter.nested.level1.level2.level3.count)
    return (
        <div className="bg-slate-200 p-1 px-5">
            <label className="border-l-amber-400">Nested counter</label>
            <div className="text-center">{count}</div>
        </div>)
}

export {NestedCounter}

function Increment1(){
    const dispatch = useDispatch()
    return(<button onClick={handleClick} className="bg-green-400 p-2 ">Increment 1 time</button>)

    function handleClick(){
        dispatch(increment1(1))
    }
}
export {Increment1}

function Increment2(){
    const dispatch = useDispatch()
    return(<button onClick={handleClick} className="bg-green-400 p-2 ">Increment 2 times</button>)

    function handleClick(){
        dispatch(increment2(2))
    }
}
export {Increment2}

function Increment3(){
    const dispatch = useDispatch()
    return(<button onClick={handleClick} className="bg-green-400 p-2 ">Increment 3 times</button>)

    function handleClick(){
        dispatch(increment3(3))
    }
}
export {Increment3}

function NestedIncrement(){
    const dispatch = useDispatch()
    return(<button onClick={handleClick} className="bg-green-400 p-2 ">Increment 1 time</button>)

    function handleClick(){
        dispatch(incrementNested(1))
    }
}
export {NestedIncrement}