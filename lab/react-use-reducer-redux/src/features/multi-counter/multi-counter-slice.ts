import { Slice, createSlice } from '@reduxjs/toolkit'

const multiCounterSlice: Slice = createSlice({
  name: 'multiCounter',
  initialState: {
    count: 0,
    count1: 0,
    count2: 0,
    count3: 0,
    nested: {
      level1: {
        level2: {
          level3: {
            countA: 0,
            countB: 0
          }
        }
      }
    }
  },
  reducers: {
    increment1: (state: any, obj: any) => {
      state.count = state.count + obj.payload
      state.count1 = state.count1 + obj.payload
    },
    increment2: (state: any, obj: any) => {
      state.count = state.count + obj.payload
      state.count2 = state.count2 + obj.payload
    },
    increment3: (state: any) => {
      state.count = state.count + 3
      state.count3 = state.count3 + 3
    },
    incrementNestedA: (state: any) => {
      state.nested.level1.level2.level3.countA += 1
    },
    incrementNestedB: (state: any) => {
      state.nested.level1.level2.level3.countB += 1
    },

    decrement1: (state: any) => {
      state.count = state.count - 1
      state.count1 = state.count1 - 1
    },
    decrement2: (state: any) => {
      state.count = state.count - 2
      state.count2 = state.count - 2
    },
    decrement3: (state: any) => {
      state.count = state.count - 3
      state.count3 = state.count3 - 3
    },
    decrementNested: (state: any) => {
      state.nested.level1.level2.level3.countA -= 1
    }
  }
})

const { reducer } = multiCounterSlice
const {
  increment1,
  increment2,
  increment3,
  incrementNestedA,
  incrementNestedB
} = multiCounterSlice.actions

export {
  reducer as multiCounterReducer,
  increment1,
  increment2,
  increment3,
  incrementNestedA,
  incrementNestedB
}
