import * as React from 'react';

import { login } from './actions/auth';

export default function Login(){
    return (
        <div className="">
            <button onClick={login}>Login</button>
        </div>
    )
}