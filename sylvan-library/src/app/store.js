import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/counter/counterSlice'
import basketReducer from '../features/basket/basketSlice'
import searchReducer from '../features/search/searchSlice'

export default configureStore({
  reducer: {
    counter: counterReducer,
    basket: basketReducer,
    search: searchReducer
  }
})