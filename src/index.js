import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';
import Login from './Login';

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

function startUpWhenNotLoggedIn(){
    const render = () => {
        ReactDOM.render(<Login />, document.querySelector("#app-root"))
    }
    render();
    if(module.hot){
        module.hot.accept('./Login', render);
    }
}

function startUpWhenLoggedIn(){
    const render = () => {
        ReactDOM.render(<App />, document.querySelector("#app-root"))
    }
    render();
    if(module.hot){
        module.hot.accept('./App', render);
    }
}

