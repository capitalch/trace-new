import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit"
import { FC } from "react"

export type DynamicMenuType = {
    id: string
    component?: FC | null
    title: string
    viewOrder: number | 0
}

export const dynamicMenuAdapter = createEntityAdapter<DynamicMenuType>()
const initialState = dynamicMenuAdapter.getInitialState()

export const fetchDynamicMenu: any = createAsyncThunk('dynamicMenu', async ()=>{
    return [...dynamicMenuData]
})

export const {
    selectAll: selectAllDynamicMenus,
    selectById: selectDynamicMenuById,
    selectEntities: selectAllDynamicMenusEntities,
    selectIds: selectDynamicMenuIds,
} = dynamicMenuAdapter.getSelectors()

export const dynamicMenuSlice = createSlice({
    name: 'dynamicMenu',
    initialState,
    reducers: {},
    extraReducers: (builder:any)=> {
        builder.addCase(fetchDynamicMenu.fulfilled, dynamicMenuAdapter.setAll)
    },
})

const dynamicMenuReducer = dynamicMenuSlice.reducer
export {dynamicMenuReducer}

const dynamicMenuData: DynamicMenuType[] = [
    {
        id: '1',
        title: 'Files',
        viewOrder: 1
    },
    {
        id: '2',
        title: 'Edit',
        viewOrder: 1
    },
    {
        id: '3',
        title: 'Delete',
        viewOrder: 1
    },
]