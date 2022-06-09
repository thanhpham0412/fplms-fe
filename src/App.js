import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './contexts/auth';
import { RouterComponent } from './routes';

function App() {
    return (
        <AuthProvider>
            <ToastContainer />
            <RouterComponent />
        </AuthProvider>
    );
}

export default App;
