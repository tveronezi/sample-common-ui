import App from "./layout/App";
import LoadingMarkerReducer from "./services/LoadingMarkerReducer";
import {getInstance} from "./services/Rest";

export {
  App,
  LoadingMarkerReducer,
  getInstance as getRestInstance
};
