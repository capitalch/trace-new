import clsx from "clsx"
import { useState } from "react"

function CustomTabs() {
    const [activeTabIndex, setActiveTabIndex] = useState(1)

    const activeTabClassName = 'border-b-2 border-blue-400 '


    return (
        <div>
            <ul className="flex flex-wrap gap-4">
                <li className="flex flex-col">
                    <button onClick={() => selectTab(1)} className={clsx('px-2 pb-2', getClassName(1))}>Tab 1</button>

                </li>
                <li className="flex flex-col">
                    <button onClick={() => selectTab(2)} className={clsx('px-2 pb-2', getClassName(2))}>Tab 2</button>

                </li>
                <li className="flex flex-col">
                    <button onClick={() => selectTab(3)} className={clsx('px-2 pb-2', getClassName(3))}>Tab 3</button>
                </li>
            </ul>
            <div className="mt-2">
                <div className={getContentClassName(1)}>
                    Content 1
                </div>
                <div className={getContentClassName(2)}>
                    Content 2
                </div>
                <div className={getContentClassName(3)}>
                    Content 3
                </div>
            </div>
        </div>
    )


    function getClassName(idx: number) {
        const clsName = (idx === activeTabIndex) ? activeTabClassName : ''
        return (clsName)
    }

    function getContentClassName(idx: number) {
        const clsName = (idx === activeTabIndex) ? '' : 'hidden'
        return (clsName)
    }



    function selectTab(idx: number) {
        setActiveTabIndex(idx)
    }


}
export { CustomTabs }