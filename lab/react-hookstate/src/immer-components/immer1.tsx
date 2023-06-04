import { useImmer } from 'use-immer'

function Immer1() {
    const [counter, setCounter] = useImmer({
        box1: {
            box2: {
                count: 0,
            }
        },
        box3: {
            count1: 0,
            count2: 0,
            count3: 0
        }
    })

    return (<div style={{ display: 'flex', margin: '10px', flexDirection: 'column' }}>
        <span>Counter: {counter.box1.box2.count}</span>
        <span>Counter1: {counter.box3.count1}</span>
        <span>Counter2: {counter.box3.count2}</span>
        <span className='w-500'>Counter3: {counter.box3.count3}</span>
        <button className='btn btn-primary btn-sm' style={{ width: '60px', marginTop: '10px' }} onClick={handleIncr}>Incr</button>
        <div className="container">
        </div>
    </div>)

    function handleIncr() {
        setCounter((draft: any) => {
            draft.box1.box2.count++
            draft.box3.count1++
            draft.box3.count2++
            draft.box3.count3++
        })
    }
}
export { Immer1 }