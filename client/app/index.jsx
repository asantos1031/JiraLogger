import React from "react";
import { render } from "react-dom";
import Content from './components/content'

import { applyPolyfills, defineCustomElements } from "@ignite/web-components/dist/loader";


require("./app.scss");

render(
  <div>
    <usg-nav-header heading="Hello, Name"></usg-nav-header>
    <Content></Content>
  </div>,
  document.getElementById("app")
);

applyPolyfills().then(() => {
  defineCustomElements(window);
});
