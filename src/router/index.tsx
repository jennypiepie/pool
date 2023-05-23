import App from '../App'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../components/login';
import AuthRoute from '../components/AuthRoute';

const BaseRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<AuthRoute><App /></AuthRoute>}></Route>
            <Route path='/login' element={<Login />}></Route>
        </Routes>
    </BrowserRouter>
)

export default BaseRouter;
