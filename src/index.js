import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './views/App';
import reportWebVitals from './reportWebVitals';
import './styles/global.scss'
import 'bootstrap/dist/css/bootstrap.min.css';
import User from '../src/components/User/User';
import Admin from '../src/components/Admin/Admin';
import Login from './../src/components/Auth/Login'
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import HomePage from './components/Home/HomePage';
import ManageUser from './components/Admin/Content/ManageUser';
import DashBoard from './components/Admin/Content/DashBoard';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<App />}>
        `<Route index element={<HomePage />} />
        <Route path='users' element={<User />} />
      </Route>
      <Route path='/admins' element={<Admin />} >
        <Route index element={<DashBoard />} />
        <Route path='manage-users' element={<ManageUser />} />
      </Route>

      <Route path='/login' element={<Login />} />
    </Routes>
  </BrowserRouter>

  // <React.StrictMode>

  // </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
