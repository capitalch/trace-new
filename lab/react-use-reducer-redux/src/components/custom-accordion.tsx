import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid"
import { useState } from "react"

function CustomAccordion() {
    const [isFilterVisible, setFilterVisible] = useState(false)
    const upIconClass = isFilterVisible ? 'block' : 'hidden'
    const downIconClass = isFilterVisible ? 'hidden' : 'block'
    return (<div className="flex flex-col gap-2 m-10">
        <div className="flex items-center">
            <ChevronUpIcon className={`${upIconClass} h-8 w-4 hover:cu`} onClick={handleUp} />
            <ChevronDownIcon className={`${downIconClass} h-8 w-4 hover:cursor-pointer`} onClick={handleUp} />
            <span className={`${downIconClass} ml-1`}>Filters</span>
        </div>
        <button className={`${upIconClass} w-24 h-8 bg-slate-100 px-2`}>Test button</button>
    </div>)

    function handleUp() {
        setFilterVisible(!isFilterVisible)
    }
}

export { CustomAccordion }