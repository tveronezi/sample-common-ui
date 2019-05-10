const init = {
  loadingMarkers: [],
};

const ADD_LOADING_MARKER = "ADD_LOADING_MARKER";
const REMOVE_LOADING_MARKER = "REMOVE_LOADING_MARKER";

const reducer = (state = init, action) => {
  switch (action.type) {
    case ADD_LOADING_MARKER: {
      return {
        ...state,
        loadingMarkers: state.loadingMarkers.concat([action.payload])
      }
    }
    case REMOVE_LOADING_MARKER: {
      return {
        ...state,
        loadingMarkers: state.loadingMarkers.filter((marker) => marker !== action.payload)
      }
    }
    default: {
      return state;
    }
  }
};

export {
  ADD_LOADING_MARKER,
  REMOVE_LOADING_MARKER,
};
export default reducer;
