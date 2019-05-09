import {combineReducers} from "redux";
import {LoadingMarkerReducer as loading} from "./library";

const rootReducer = combineReducers({
    loading,
});

export default rootReducer;
