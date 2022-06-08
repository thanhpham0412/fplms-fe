import { useState } from 'react';

import { ToastContainer } from 'react-toastify';

import { RouterComponent } from './routes';

import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [isAuth, setAuth] = useState(false);

    return (
        <>
            <ToastContainer />
            <RouterComponent isAuth={isAuth} setAuth={setAuth} />
        </>
    );
}

export default App;
