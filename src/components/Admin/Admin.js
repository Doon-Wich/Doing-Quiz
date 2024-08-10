import SideBar from "./SideBar";
import './../Admin/Admin.scss';
import { FaBars } from 'react-icons/fa';
import { useState } from "react";
import { Outlet, Link } from "react-router-dom";

const Admin = (props) => {
    const [collapsed, setCollapsed] = useState(false)

    return (
        <div className="admin-container">
            <div className="admin-sidebar">
                <SideBar collapsed={collapsed} />
            </div>
            <div className="admin-content">
                <div className="admin-header">
                    <FaBars onClick={() => setCollapsed(!collapsed)} className="fabar" />
                </div>
                <div className="admin-main">
                    <Outlet></Outlet>
                </div>
            </div>
        </div >
    )
}

export default Admin;