import { combineReducers } from "redux";
import { apiSlice } from "../../endpoints/apislice";

const rootReducer = combineReducers({
    [apiSlice.reducerPath]: apiSlice.reducer,
})

export default rootReducer