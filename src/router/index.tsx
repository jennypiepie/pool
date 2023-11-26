import App from '../pages/app/App'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/login';
import AuthRoute from '../components/authRoute';
import Site from '../pages/site';

const BaseRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<AuthRoute><App /></AuthRoute>}></Route>
            <Route path='/login' element={<Login />}></Route>
            <Route path='/site' element={<Site />}></Route>
        </Routes>
    </BrowserRouter>
)

export default BaseRouter;
