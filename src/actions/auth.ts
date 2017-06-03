
interface IAuthContext {
    login(): any,
    logOut(): any
}

interface IAuthWindow extends Window {
    authContext: IAuthContext;
}

export const login = () => {
    (window as IAuthWindow).authContext.login();
}

export const logout = () => {
    (<IAuthWindow> window).authContext.logOut();
}
