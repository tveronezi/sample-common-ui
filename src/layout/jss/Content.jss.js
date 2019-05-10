import injectSheet from "react-jss";
import {fadeStyles, headerSize, lightGrey} from "./CommonStyles";

const styles = () => ({
  root: {
    backgroundColor: lightGrey,
    width: "100%",
    height: `calc(100% - ${headerSize})`,
    position: "relative"
  },
  content: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    ...fadeStyles
  }
});

export default ((cls) => injectSheet(styles)(cls));
