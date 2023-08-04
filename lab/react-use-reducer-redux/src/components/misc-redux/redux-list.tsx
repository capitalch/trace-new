import { useDispatch, useSelector } from "react-redux"
import { changeItemsAction, populateItemsAction, resetItemsAction } from "../../features/misc-redux/misc-redux-slice"

function ReduxList() {
    const items = useSelector((state: any) => state.miscRedux.items)
    return (<div>
        <select >
            {getOptions()}
        </select>
    </div>)

    function getOptions() {
        const options = items.map((item: any, index: number) => {
            return (<option key={index}>{item.name}</option>)
        })
        return (options)
    }
}
export { ReduxList }

function ButtonAddRandomData() {
    const dispatch = useDispatch()
    return (<button className="px-5 bg-slate-200 hover:bg-slate-300" onClick={handleClick}>Add item</button>)

    function handleClick() {
        dispatch(populateItemsAction({ name: Math.random() * 100, value: Math.random() * 1000 }))
    }
}
export { ButtonAddRandomData }

function ButtonChangeRandomData() {
    const dispatch = useDispatch()
    return (<button className="px-5 bg-slate-200 hover:bg-slate-300" onClick={handleClick}>Change list</button>)
    function handleClick() {
        const obj = [{ name: Math.random() * 100, value: Math.random() * 1000 },
        { name: Math.random() * 100, value: Math.random() * 1000 },
        { name: Math.random() * 100, value: Math.random() * 1000 },
        { name: Math.random() * 100, value: Math.random() * 1000 },
        { name: Math.random() * 100, value: Math.random() * 1000 }
        ]
        dispatch(changeItemsAction(obj))
    }
}
export { ButtonChangeRandomData }

function ButtonResetRandomData() {
    const dispatch = useDispatch()
    return (<button className="px-5 bg-slate-200 hover:bg-slate-300 rounded-lg" onClick={handleClick}>Reset</button>)

    function handleClick() {
        dispatch(resetItemsAction({}))
    }
}
export { ButtonResetRandomData }