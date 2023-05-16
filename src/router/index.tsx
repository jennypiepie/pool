import App from '../App'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Scene from '../r3f/scene';
// import Login from '../components/login';

const BaseRouter = () => (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<App />}></Route>
            <Route path='/scene' element={<Scene />}></Route>
            {/* <Route path='/login' element={<Login />}></Route> */}
        </Routes>
    </BrowserRouter>
)

export default BaseRouter;
