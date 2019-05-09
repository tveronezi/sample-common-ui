import injectSheet from "react-jss";
import {collapsedLeftSize, expandedLeftSize, headerSize, transitionDuration} from "./CommonStyles";

const styles = (theme) => ({
  "@global": {
    "body": {
      fontFamily: theme.typography.fontFamily,
      margin: 0,
      padding: 0,
      height: "100vh",
    },
    "#root": {
      height: "100vh",
    },
  },
  root: {
    height: "100vh",
    overflow: "hidden",
    display: "flex",
    "&.fade-appear": {
      opacity: 0
    },
    "&.fade-appear-active": {
      transition: `opacity ${transitionDuration * 2}ms linear`,
      opacity: 1
    },
    "& .left": {
      position: "relative",
      transition: `width ${transitionDuration}ms linear`,
      width: expandedLeftSize,
    },
    "& .right": {
      flexGrow: 1
    },
    "&.hidden-enter, &.hidden-enter-active, &.hidden-enter-done": {
      "& .left": {
        overflow: "hidden",
        width: 0
      },
    },
  },
  hiddenPanel: {},
  collapsedPanel: {
    "& .left": {
      position: "relative",
      width: collapsedLeftSize,
    },
  },
  top: {
    height: headerSize,
  },
  collapseBtn: {
    position: "absolute",
    top: headerSize,
    right: -17,
    padding: 0,
    minWidth: "auto",
    zIndex: 1000,
    height: 35,
    width: 35,
    "&:hover": {
      cursor: "pointer"
    }
  }
});

export default ((cls) => injectSheet(styles)(cls));
