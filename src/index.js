// index.js
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './configureStore'
import Routes from "./Routes";

const pollResults = require("./data/poll.json");
console.log(pollResults);

const store = configureStore({
  polls: pollResults/* provide initial state if any */
})
 
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ConnectedRouter history={history}> { /* place ConnectedRouter under Provider */ }
        <Routes />
      </ConnectedRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
)
