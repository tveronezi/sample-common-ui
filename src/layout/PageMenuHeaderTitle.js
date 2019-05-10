import React from 'react';
import jss from "./jss/PageMenuHeaderTitle.jss";
import Typography from "@material-ui/core/Typography";

const PageMenuHeaderTitle = ({classes, text}) => (
  <Typography variant="h5" className={classes.root}>{text}</Typography>);

export default jss(PageMenuHeaderTitle);
