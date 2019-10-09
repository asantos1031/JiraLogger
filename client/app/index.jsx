import React from "react";
import { render } from "react-dom";
import Content from './components/content'
import MainPage from './components/mainPage'

import { applyPolyfills, defineCustomElements } from "@ignite/web-components/dist/loader";


require("./app.scss");

render(
  <MainPage></MainPage>,
  document.getElementById("app")
);

applyPolyfills().then(() => {
  defineCustomElements(window);
});
