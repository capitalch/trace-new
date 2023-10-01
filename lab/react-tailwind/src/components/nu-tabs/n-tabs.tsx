import clsx from 'clsx'
import { useState } from 'react'
function NTabs({ className, children }: { className?: string, children: any }) {
    const [activeTabLabel, setActiveTabLabel] = useState(children[0].props.label)

    return (<div className={clsx(className, 'flex flex-col')}>
        {getTabHeader()}
        {getTabContents()}
    </div>)

    function getActiveClassName(child: any): string {
        const clsName = (activeTabLabel === child.props.label) ? 'border-b-2 border-blue-400 font-medium' : 'text-slate-400'
        return (clsName)
    }

    function getTabContents() {
        const tabContents: any[] = children.map((child: any) =>
            (child.props.label === activeTabLabel) && child.props.children
        )
        return (<div className=''>{tabContents}</div>)
    }

    function getTabHeader() {
        const tabLabels: any[] = children.map((child: any,) => {
            return (
                <button key={child.props.label} className={clsx(getActiveClassName(child), 'py-2 px-4 mb-4')}
                    onClick={(e: any) => handleClick(e, child.props.label)}>
                    {child.props.label}
                </button>
            )
        })
        return (<div className='flex gap-2'>{tabLabels}</div>)
    }

    function handleClick(e: any, newActiveTabLabel: string) {
        e.preventDefault()
        setActiveTabLabel(newActiveTabLabel)
    }

}
export { NTabs }

function NTab({ label, children }: { label: string, children: any }) {
    return (<div className="hidden">
        {children}
    </div>)
}
export { NTab }