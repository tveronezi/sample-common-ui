import injectSheet from "react-jss";
import {darkGrey, fadeStyles} from "./CommonStyles";

const styles = (theme) => ({
  root: {
    backgroundColor: darkGrey,
    display: "grid",
    gridTemplateColumns: "60px auto",
    gridTemplateRows: "auto",
    "& > div": {
      height: "100%",
      display: "flex",
      alignItems: "center"
    }

  },
  icon: {
    justifyContent: "center",
    flexDirection: "column",
    color: theme.palette.text.secondary,
    "& ~ div": {
      width: "100%",
      height: "100%",
      position: "relative"
    }
  },
  content: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    ...fadeStyles,
    display: "flex",
    alignItems: "center"
  }
});

export default ((cls) => injectSheet(styles)(cls));
