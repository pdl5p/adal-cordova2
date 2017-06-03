import { AppContainer } from 'react-hot-loader'
import { applyMiddleware, compose, createStore } from 'redux'
import { createBrowserHistory } from 'history'
import { routerMiddleware, connectRouter } from 'connected-react-router'
import { Provider } from 'react-redux'


import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import Login from './components/Login';

import { loadUser } from './actions/userActions';


import 'whatwg-fetch';
import Promise from 'promise-polyfill';

import rootReducer from './reducers'

if(!window.Promise){
  window.Promise = Promise;
}
var browser = require("detect-browser");
console.log("Browser", browser);

function startUpWhenNotLoggedIn() {

  const renderLogin = () => {
    ReactDOM.render(
      <Login />,
      document.getElementById('react-root')
    )
  }
  renderLogin();

  if (module.hot) {
    module.hot.accept('./components/Login', () => {
      renderLogin()
    });
  }
}

function startUpWhenLoggedIn() {

  const history = createBrowserHistory()
  const logger = createLogger();

  const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
  const store = createStore(
    connectRouter(history)(rootReducer),
    composeEnhancer(
      applyMiddleware(
        thunk,
        //logger,
        routerMiddleware(history),
      ),
    ),
  )

  loadUser(store.dispatch);

  const render = () => {
    ReactDOM.render(
      <AppContainer>
        <Provider store={store}>
          <App history={history} />
        </Provider>
      </AppContainer>,
      document.getElementById('react-root')
    )
  }

  render()

  if (module.hot) {
    module.hot.accept('./App', () => {
      render()
    })
    module.hot.accept('./reducers', () => {
      store.replaceReducer(connectRouter(history)(rootReducer))
    })
  }
}

var authContext = new AuthenticationContext(window.config);
window.authContext = authContext;

var isCallback = authContext.isCallback(window.location.hash);

if (isCallback) {
  authContext.handleWindowCallback();
  var loginError = authContext.getLoginError();
  if (isCallback && !loginError) {
    window.location = authContext._getItem(authContext.CONSTANTS.STORAGE.LOGIN_REQUEST);
  }
  if(loginError){
    //alert(loginError);
    console.log("loginError", loginError);
  }
}
else {

  var user = authContext.getCachedUser();

  if (user) {
    startUpWhenLoggedIn();
  } else {
    startUpWhenNotLoggedIn();
  }
}