import { useState } from 'react';

import { RouterComponent } from './routes';

function App() {
    const [isAuth, setAuth] = useState(true);

    return <RouterComponent isAuth={isAuth} setAuth={setAuth} />;
}

export default App;
