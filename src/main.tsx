import * as React from "react";
import * as ReactDOM from "react-dom";
import { Provider } from "mobx-react";

import { createHashHistory } from "history";
// import {TodoModel} from 'app/models';
import { createStores } from "app/stores";
import { App } from "app";

import "typeface-roboto";

// default fixtures for TodoStore
// const defaultTodos = [
//   new TodoModel('Use Mobx'),
//   new TodoModel('Use React', true),
// ];

// prepare MobX stores
const history = createHashHistory();
const rootStore = createStores(history, []);

// render react DOM
ReactDOM.render(
  <Provider {...rootStore}>
    <App history={history} />
  </Provider>,
  document.getElementById("root")
);
