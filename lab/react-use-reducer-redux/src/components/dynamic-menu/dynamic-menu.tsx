import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchDynamicMenu, selectAllDynamicMenus } from "../../features/dynamic-menu/dynamic-menu-slice"

function DynamicMenu() {
    const dispatch = useDispatch()

    const menuItems = useSelector((state:any)=> state.dynamicMenu)
    console.log(menuItems)

    return (<div className="m-10 flex">
        <button onClick={handleLoadMenu} className="bg-slate-200 hover:bg-slate-300 rounded-md p-1 px-2">Load menu</button>
    </div>)
    
    function handleLoadMenu() {
        dispatch(fetchDynamicMenu())
    }
}
export { DynamicMenu }