import { ChildComp, ChildComp1 } from "./child-comp"

function ParentComp(){
return(<div className="m-4">
    <ChildComp className='mx-4'>
        <button className="bg-slate-200 border-l-pink-800">This is button1 passed from parent to child in children</button>
        <button className="bg-slate-200 border-l-pink-800">This is button2 passed from parent to child in children</button>
    </ChildComp>
    <ChildComp1>
        <span>Child component 1</span>
    </ChildComp1>
</div>)
}
export {ParentComp}