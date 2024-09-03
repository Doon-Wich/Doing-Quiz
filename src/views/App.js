import './App.scss';
import Header from '../components/Header/Header';
import { Outlet, Link } from "react-router-dom";
import PerfectScrollbar from 'react-perfect-scrollbar'

/**
 * có 2 loại component: class component / function component (function / arrow)
  */

const App = () => {
  // const App = () => {}
  return (
    <div className='app-container'>
      <div className='header-container'>
        <Header />
      </div>
      <div className='main-container'>
        <div className='sidenav-container'>

        </div>
        <div className='app-content'>
          <PerfectScrollbar>
            <Outlet></Outlet>
          </PerfectScrollbar>
        </div>
      </div>
    </div>
  );
}

export default App;
