import injectSheet from "react-jss";
import {
  collapsedLeftSize,
  expandedLeftSize,
  grey,
  noAnimationStyles,
  slideBackwardStyles,
  slideStyles
} from "./CommonStyles";

const styles = (theme) => ({
  root: {
    position: "relative",
    overflow: "hidden",
    "& .content": {
      position: "absolute",
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      width: expandedLeftSize,
      transition: `width ${theme.transitions.easing.easeInOut} ${theme.transitions.duration.standard}ms`,
      backgroundColor: grey,
      display: "flex",
      alignItems: "center",
      padding: theme.spacing.unit,
    },
    "&.not-animated": {
      "& .content": {
        ...noAnimationStyles
      },
    },
    "&.animated": {
      "& .content": {
        ...slideStyles
      },
      "&.backward": {
        "& .content": {
          ...slideBackwardStyles
        },
      }
    }
  },
  icon: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    padding: theme.spacing.unit,
  },
  detailsCollapsed: {
    display: "none"
  },
  panelCollapsed: {
    width: collapsedLeftSize
  },
});

export default ((cls) => injectSheet(styles)(cls));
