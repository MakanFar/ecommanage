import {configureStore} from  "@reduxjs/toolkit"
import userReducer from "./user"
import invoiceReducer from "./invoice"

export const business = configureStore({
    reducer: {
      user: userReducer,
      invoice: invoiceReducer  
    }
})