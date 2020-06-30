import React, {Component, Suspense} from 'react';
import PropTypes from "prop-types";

import {Link} from "react-router-dom";

import Button from "@material-ui/core/Button";
import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core/styles";

const HelpDialog = React.lazy(() => import(/* webpackChunkName: "help-dialog" */ "./inline/HelpDialog"));

const styles = theme => ({
  homeRoot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    top: "56px",
    [theme.breakpoints.up("sm")]: {
      top: "64px",
    },
  },
  greetings: {
    padding: "8px",
    margin: "8px",
    height: "calc(100% - 32px)",
  },
});


class PageOne extends Component {

  state = {
    isDialogOpen: false,
  }

  componentDidMount() {
  }

  handleDialogClose = () => {
    this.setState({isDialogOpen: false});
  }

  handleDialogOpen = () => {
    this.setState({isDialogOpen: true});
  }


  render () {
    const {classes} = this.props;
    const {isDialogOpen} = this.state;

    return (
      <div className={classes.homeRoot}>
        <Paper elevation={4} className={classes.greetings}>
          <div>
            Page One.
          </div>
          <Button color="primary" variant="contained" onClick={this.handleDialogOpen}>Help</Button>
          <div>
            <Link to="/">Back to Home</Link>
          </div>
          <Suspense fallback={<div>Loading...</div>}>
            <HelpDialog
              isOpen={isDialogOpen}
              handleClose={this.handleDialogClose} />
          </Suspense>
        </Paper>
      </div>
    );
  }
}

PageOne.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(PageOne);
