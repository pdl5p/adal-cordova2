import * as React from 'react';

const config = {
    //reg in 5pdev
    authority: "https://login.windows.net/common",
    redirectUri: "http://adal-cordova2",
    //redirectUri: "http://MyDirectorySearcherApp",
    resourceUri: "https://graph.windows.net",
    clientId: "9c2a4a03-1842-4be7-b2ce-18616dc3c23b",
    //clientId: "a5d92493-ae5a-4a9f-bcbf-9f1d354067d3",
    graphApiVersion: "2013-11-08"
}

function login() {

    const ax = new Microsoft.ADAL.AuthenticationContext(config.authority);

    ax.acquireTokenSilentAsync(config.resourceUri, config.clientId, null)
        .then((authResult) => {
            alert("silent ok " + authResult.accessToken);
        },
        () => {
            ax.acquireTokenAsync(config.resourceUri, config.clientId, config.redirectUri)
                .then((authResult) => {
                    alert("loud ok " + authResult.accessToken);
                },
                (err) => {
                    alert("error: " + err);
                });
        });
}

function logout() {

    const ax = new Microsoft.ADAL.AuthenticationContext(config.authority);
    ax.tokenCache.clear();
    alert("logged out");
}

export default function Login() {
    return (
        <div className="" style={{ paddingTop: '100px' }}>
            <button onClick={login}>Login cordova</button>
            <button onClick={logout}>Logout cordova</button>
        </div>
    )
}