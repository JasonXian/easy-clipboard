import { render } from "react-dom";
import { Provider } from "react-redux";
import * as React from "react";
import { Store } from "webext-redux";
import App from "./App";

const store = new Store({
  portName: "easy-clipboard",
});

store.ready().then(() => {
  const mountNode = document.createElement("div");
  mountNode.id = "root";
  document.body.appendChild(mountNode);
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    mountNode
  );
});
