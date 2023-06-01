import { useImmer } from 'use-immer'

function Immer1() {
    const [counter, setCounter] = useImmer({
        box1: {
            box2:{
                count: 0
            }
        }
    })
    return (<div style={{ display: 'flex', margin:'10px' }}>
        <span>Counter: {counter.box1.box2.count}</span>
        <button onClick={handleIncr}>Incr</button>
    </div>)

    function handleIncr(){
        setCounter((draft:any)=>{
            draft.box1.box2.count++
        })
    }
}
export { Immer1 }