import { useDispatch, useSelector } from "react-redux"
import { increment1, increment2, increment3, incrementNestedA, incrementNestedB } from "../../features/multi-counter/multi-counter-slice"

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

function NestedCounterA(){
    const countA = useSelector((state:any)=>state.multiCounter.nested.level1.level2.level3.countA)
    return (
        <div className="bg-slate-200 p-1 px-5">
            <label className="border-l-amber-400">Nested counter A</label>
            <div className="text-center">{countA}</div>
        </div>)
}

export {NestedCounterA}

function NestedCounterB(){
    const countB = useSelector((state:any)=>state.multiCounter.nested.level1.level2.level3.countB)
    return (
        <div className="bg-slate-200 p-1 px-5">
            <label className="border-l-amber-400">Nested counter B</label>
            <div className="text-center">{countB}</div>
        </div>)
}

export {NestedCounterB}

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

function NestedIncrementA(){
    const dispatch = useDispatch()
    return(<button onClick={handleClick} className="bg-green-400 p-2 "> Nested A Increment 1 time</button>)

    function handleClick(){
        dispatch(incrementNestedA(1))
    }
}
export {NestedIncrementA}

function NestedIncrementB(){
    const dispatch = useDispatch()
    return(<button onClick={handleClick} className="bg-green-400 p-2 ">Nested B Increment 1 time</button>)

    function handleClick(){
        dispatch(incrementNestedB(1))
    }
}
export {NestedIncrementB}