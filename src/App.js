import { ToastContainer } from 'react-toastify';

import { AuthProvider } from './contexts/auth';
import { RouterComponent } from './routes';

import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <AuthProvider>
            <ToastContainer />
            <RouterComponent />
        </AuthProvider>
    );
}

export default App;
