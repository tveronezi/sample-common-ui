import injectSheet from "react-jss";
import {highlighed, transitionDuration} from "./CommonStyles";

const animationLength = 2;
const styles = (theme) => ({
  root: {
    display: "flex",
    textDecoration: "none",
    color: theme.palette.text.primary,
    borderRadius: 20,
    margin: `${theme.spacing.unit}px 0`,
    padding: theme.spacing.unit,
    "&:hover": {
      cursor: "pointer",
      backgroundColor: highlighed,
      "& .arrow": {
        animation: `arrow ${transitionDuration * 2}ms 1`
      }
    },
  },
  endpoint: {
    "& .arrow": {
      display: "none"
    },
  },
  endpointSelected: {
    cursor: "default",
    backgroundColor: highlighed,
    "&:hover": {
      cursor: "default"
    },
  },
  '@keyframes arrow': {
    "0%": {
      transform: "translate(0px, 0px)"
    },
    "25%": {
      transform: `translate(-${animationLength}px, 0px)`
    },
    "50%": {
      transform: "translate(0px, 0px)"
    },
    "75%": {
      transform: `translate(${animationLength}px, 0px)`
    },
    "100%": {
      transform: "translate(0px, 0px)"
    }
  },
  panelCollapsed: {
    borderRadius: 0,
  },
  icon: {
    display: "flex",
    alignItems: "center",
  },
  details: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    margin: `0 0 0 ${theme.spacing.unit}px`,
    overflow: "hidden",
    "& > div": {
      display: "flex",
      alignItems: "center",
    }
  },
  text: {
    whiteSpace: "nowrap"
  },
  itemDisabled: {
    "& span": {
      color: theme.palette.text.disabled
    },
    "&:hover": {
      cursor: "default",
      backgroundColor: "inherit",
      "& .arrow": {
        animation: "none",
        "& svg": {
          color: theme.palette.text.disabled,
        }
      }
    },
  }
});

export default ((cls) => injectSheet(styles)(cls));
