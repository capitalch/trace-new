import { useEffect } from 'react'
import { emit, filterOn } from '../utils/ibuki'

function IbukiParent() {

    useEffect(() => {
        const subs1 = filterOn('SEND-TO-PARENT').subscribe((d: any) => {
            console.log(d.data)
        })
        return (() => {
            subs1.unsubscribe()
        })
    }, [])

    return (<>
        <div>Parent</div>
        <button onClick={handleSendMessage} className='btn btn-success'>Send to child</button>
        <IbukiChild />
    </>)

    function handleSendMessage() {
        emit('SEND-TO-CHILD', { name: 'sushant' })
    }
}

export { IbukiParent }

function IbukiChild() {
    useEffect(() => {
        const subs1 = filterOn('SEND-TO-CHILD').subscribe((d: any) => {
            console.log(d.data)
        })

        return (() => {
            subs1.unsubscribe()
        })
    }, [])

    return (<>
        <div>child</div>
        <button className='btn  btn-dark' onClick={handleSendMessage}>Send to parent</button>
    </>)

    function handleSendMessage() {
        emit('SEND-TO-PARENT', { name: 'Sourabh' })
    }
}

export { IbukiChild }

