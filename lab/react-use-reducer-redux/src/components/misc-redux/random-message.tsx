import { useDispatch, useSelector } from "react-redux"
import { sendRandomMessageAction } from "../../features/misc-redux/misc-redux-slice"

function RandomMessageViewer() {
    const view = useSelector((state: any) =>
        state.miscRedux.randomMessage
    )
    return (<div className="m-10">{view}</div>)
}
export { RandomMessageViewer }

function RandomMessageEmitter(){
    const dispatch = useDispatch()
    return(<button className="mx-10 bg-slate-300 p-1 px-3 hover:bg-slate-400" onClick={handleClick}>Random message emit</button>)

    function handleClick(){
        const rnd = Math.random()* 100
        dispatch(sendRandomMessageAction(rnd.toString()))
    }
}
export{RandomMessageEmitter}