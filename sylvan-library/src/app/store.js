import { configureStore } from '@reduxjs/toolkit'
import { thunk } from 'redux-thunk'; //be careful, chatGPT insists that this should be a default export.
import counterReducer from '../features/counter/counterSlice'
import basketReducer from '../features/basket/basketSlice'
import searchReducer from '../features/search/searchSlice'
import userReducer from '../features/user/userSlice'
import lenderReducer from '../features/lender/lenderSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    basket: basketReducer,
    search: searchReducer,
    user: userReducer,
    lender: lenderReducer
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({thunk}) // Include Thunk in the middleware
});