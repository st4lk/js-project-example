import React from "react";
import ReactDOM from "react-dom";
import {BrowserRouter} from "react-router-dom";
import {renderRoutes} from "react-router-config";
import {mainRoutes} from "./routes";

/*** exception 3 - app crash ***/
// const myObject = undefined;
// console.log(myObject.bucket);

ReactDOM.render((
  <BrowserRouter>
    {renderRoutes(mainRoutes)}
  </BrowserRouter>
), document.getElementById("app"));

if (module.hot) {
  module.hot.accept();
}
