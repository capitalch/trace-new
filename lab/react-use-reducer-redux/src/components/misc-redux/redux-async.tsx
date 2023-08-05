import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchContent } from "../../features/misc-redux/misc-redux-slice"
import { AnyAction, Dispatch } from "@reduxjs/toolkit"

function ReduxAsync() {
    const dispatch:any = useDispatch()
    useEffect(() => {
        dispatch(fetchContent())
    }, [dispatch])

    const contents = useSelector((state: any) => state.miscRedux.contents)
    const isLoading = useSelector((state: any) => state.miscRedux.isLoading)
    const error = useSelector((state: any) => state.miscRedux.error)

    if (isLoading) {
        return ('Loading...')
    }
    if (error) {
        return error
    }
    return (<div className='grid gap-2 grid-cols-2  md:grid-cols-4 lg:grid-cols-8  p-4'>
        {contents.map((content:any) => (
            <div key={content.id}>
                <img
                    src={`${content.thumbnailUrl}`}
                    alt={`${content.title}`}
                    className='w-full h-full rounded'
                />
            </div>
        ))}
    </div>)
}
export { ReduxAsync }