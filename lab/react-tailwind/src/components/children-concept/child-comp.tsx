import clsx from "clsx"
import * as React from 'react'
import {ComponentProps, FC,  HTMLProps, HTMLAttributes, JSX, DetailedHTMLProps, ReactElement, ReactNode} from 'react'

function ChildComp(props: any){
return(<div className={clsx(props.className, 'bg-zinc-300')}>
    {props.children}
</div>)
}
export {ChildComp}

type ChildCompType = {
    // className: string
    // props: HTMLProps
}

function ChildComp1(props:any):any{
    return(<div className={clsx( 'bg-zinc-300')}>
    {props.children}
</div>)
}
export {ChildComp1}