import injectSheet from "react-jss";
import {grey, headerSize, noAnimationStyles, padding, slideBackwardStyles, slideStyles} from "./CommonStyles";

const styles = () => ({
  root: {
    backgroundColor: grey,
    position: "relative",
    width: "100%",
    height: `calc(100% - ${headerSize})`,
    "& .content": {
      position: "absolute",
      top: 15,
      bottom: padding,
      left: padding,
      right: padding,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
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
  }
});

export default ((cls) => injectSheet(styles)(cls));
