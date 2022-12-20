import {Comp1, Comp11, Comp111} from '@features1/features'
import { Comp2 } from '@features1/features1/comp2'
// import {Comp2} from '@features1/*'

function AppMain() {
    return (
        <div>
            <Comp1 />
            <Comp11 />
            <Comp2 />
            <Comp111 />
        </div>
    )
}

export { AppMain }