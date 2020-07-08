import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import * as Sentry from '@sentry/browser';
import {mainRoutes} from "./routes";

Sentry.init({dsn: SENTRY_DSN, environment: ENVIRONMENT});

if (window.location.href.includes('exception-3')) {
  /*** exception 3 - app crash ***/
  const myObject = undefined;
  myObject.appBucket;
}

ReactDOM.render((
  <BrowserRouter>
    {renderRoutes(mainRoutes)}
  </BrowserRouter>
), document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}
