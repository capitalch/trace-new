import clsx from "clsx"
import _ from 'lodash'

function ObjectHierarchy() {
    const cls = 'bg-slate-200 w-20 p-1 pl-2 rounded-md hover:bg-slate-300'
    return (<div className="m-10 flex ">
        <button onClick={handleSetValue} className={clsx(cls, 'mr-4')}>Set value</button>
        <button onClick={handleGetValue} className={clsx(cls)}>Get value</button>
    </div>)

    function handleSetValue() {
        _.set(ObjectStore, 'level1.level2.level3', 'Sushant')
    }
    function handleGetValue() {
        const gt = _.get(ObjectStore, 'level1.level2.level3')
        console.log(gt)
    }
}
export { ObjectHierarchy }

const ObjectStore = {

}