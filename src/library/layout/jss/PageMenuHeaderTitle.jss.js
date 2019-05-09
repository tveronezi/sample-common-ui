import injectSheet from "react-jss";

const styles = () => ({
  root: {
    fontWeight: 500
  }
});

export default ((cls) => injectSheet(styles)(cls));
