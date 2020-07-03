import React, {Component} from "react";
import PropTypes from "prop-types";

import {Link} from "react-router-dom";

import Paper from "@material-ui/core/Paper";
import {withStyles} from "@material-ui/core/styles";
import {getSearch} from "@example/dep";

import Progress from "./inline/Progress";

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


class Home extends Component {

  state = {
  }

  componentDidMount() {
  }

  callApiWithError = () => {
    return new Promise((resolve, reject) => {
      reject('Error from API');
    })
  }

  render () {

    const {classes} = this.props;

    if (window.location.href.includes('exception-1')) {
      /*** exception 1 - page crash ***/
      const myObject = undefined;
      console.log(myObject.bucket);
    }

    if (window.location.href.includes('exception-2')) {
      /*** exception 2 - unhandled error from promise ***/
      this.callApiWithError().then(() => {
        console.log('API success');
      });
    }

    /*** unexpected error ***/
    console.error('Unexepected case happened');

    const config = {1:'AB', 2: 'CD', 3: 'EG'};

    if (window.location.href.includes('warn-console')) {
      console.warn('This is test warning', config);
    }

    if (window.location.href.includes('warn-with-sentry-scope')) {
      Sentry.withScope(function(scope) {
        scope.setExtra("config", config);
        console.warn('This is test warning');
      });
    }

    getSearch();

    return (
      <div className={classes.homeRoot}>
        <Paper elevation={4} className={classes.greetings}>
          <div>
            Home page content
          </div>
          <div>
            <Link to="/page-one">Page One</Link>
          </div>
        </Paper>
      </div>
    );
  }
}

Home.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
