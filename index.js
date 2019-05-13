import App from "./src/layout/App";
import LoadingMarkerReducer from "./src/services/LoadingMarkerReducer";
import {getInstance} from "./src/services/Rest";

export {
  App,
  LoadingMarkerReducer,
  getInstance as getRestInstance
};
