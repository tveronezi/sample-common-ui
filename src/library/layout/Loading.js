import React from "react";
import {connect} from "react-redux";
import LinearProgress from "@material-ui/core/LinearProgress/LinearProgress";
import jss from "./jss/Loading.jss";

const Loading = ({loading, classes}) => {
  if (!loading) {
    return null;
  }
  return (
    <LinearProgress className={classes.root} value={100} variant={"indeterminate"}/>
  );
};

const mapStateToProps = state => {
  return {
    loading: state.loading.loadingMarkers.length > 0
  };
};
export default connect(mapStateToProps)(jss(Loading));
