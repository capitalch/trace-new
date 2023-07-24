import { useCallback, useEffect, useMemo, useState } from "react"
import {dummyFunc} from '../utils/dummy-func'

function CheckUseEffectComponent({filter}:any) {
    const [flag, setFlag] = useState(true)

    // const myCallback = useCallback(dummyFunc, [])
    const myObj:any = {
        name: 'Sush'
    }
    // myMemo:any = useMemo(()=>({
    //     name: 'Sush'
    // }),[])

    useEffect(() => {
        console.log('useEffect executed')
        if(dummyFunc()){
            console.log('Inside if')
        }
        if(filter){
            console.log(filter)
        }
        console.log(myObj)
        
    }, [filter, myObj])

    return (<div>
        <span>
            This checks the useEffect hook
        </span>
        <div>
            <button onClick={handleOnClick}>Changes state</button>
        </div>
    </div>)

    // function dummyFunc() {
    //     console.log('dummy func does not do anything')
    // }



    function handleOnClick() {
        setFlag(!flag)
    }
}

export { CheckUseEffectComponent }