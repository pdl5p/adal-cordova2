import * as React from 'react';

import { logout } from './actions/auth';

export default function App(){
    return (
        <div className="">
            <button onClick={logout}>Logout</button>
        </div>
    )
}