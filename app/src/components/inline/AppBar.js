import React, {Component} from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";

import {withStyles} from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import BackIcon from "@material-ui/icons/ArrowBack";
import MenuIcon from "@material-ui/icons/Menu";
import Typography from "@material-ui/core/Typography";

import {getCurrentRouteParams} from "routes";


const styles = theme => ({
  appBar: {
    position: "fixed",
  },
  backLink: {
    textDecoration: "none",
    color: "inherit",
    height: 24,  // TODO: find where this value is kept in BackIcon and use it
  },
  pageTitle: {
    width: "100%",
    textAlign: "center",
    paddingRight: 60,  // TODO: sum of menu icon + left padding of icon
    color: "white",
  }
});


class CustomAppBar extends Component {

  render() {
    const {classes} = this.props;
    const {routeTitle, backRoute} = getCurrentRouteParams();
    return (
      <AppBar className={classes.appBar}>
        <Toolbar>
          {backRoute &&
            <IconButton
              className={classes.backArrowIcon}
              color="inherit" >
              <Link to={backRoute} className={classes.backLink}>
                <BackIcon color="inherit"/>
              </Link>
            </IconButton>
          }
          <Typography className={classes.pageTitle} variant="h5" color="inherit" noWrap>
            {routeTitle}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}


CustomAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CustomAppBar);
