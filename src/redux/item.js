import { createSlice} from '@reduxjs/toolkit'

export const itemSlice = createSlice({
  name: 'item',
  initialState : {
    value: {
      itemrName: "",
      itemrCost: "",
      itemSold: "",
      itemrRate: "",
      itemrPaid: "",
      itemrQuantity: ""
      
    }
  },
  reducers: {
    setItem: (state, action) => {
      state.value = action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setItem} = itemSlice.actions

export default itemSlice.reducer