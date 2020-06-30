import React from "react";
import PropTypes from "prop-types";
import {withStyles} from "@material-ui/core/styles";
import CircularProgress from '@material-ui/core/CircularProgress';

const styles = () => ({
  progress: {
    margin: "auto",
    display: "block",
    zIndex: 10000,
  }
});

const Progress = ({classes}) => {
  return <CircularProgress className={classes.progress} />;
};

Progress.propTypes = {
  classes: PropTypes.object.isRequired,
};


export default withStyles(styles)(Progress);
