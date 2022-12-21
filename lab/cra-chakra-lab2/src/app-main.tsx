import {Comp1, Comp11, Comp111} from '@src/features'
import { Comp2 } from '@src/features1/comp2'
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