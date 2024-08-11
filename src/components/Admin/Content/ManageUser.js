import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss'
import { FcPlus } from "react-icons/fc";
import TableUser from './TableUser';
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiService";

const ManageUser = (props) => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);

    const [listUsers, setListUser] = useState([])

    useEffect(() => {
        fetchListUsers();
    }, []);

    const fetchListUsers = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUser(res.DT)
        }
    }

    return (
        <div className="manage-user-container">
            <div className="title">
                Manage User
            </div>
            <div className="users-content">
                <div className='btn-add-new'>


                    <button onClick={() => setShowModalCreateUser(true)} className='btn btn-primary'> <FcPlus /> Add new users</button>
                </div>
                <div className='table-users-container'>
                    <TableUser listUsers={listUsers} />
                </div>
            </div>

            <ModalCreateUser
                show={showModalCreateUser}
                setShow={setShowModalCreateUser}
                fetchListUsers={fetchListUsers}
            />
        </div>
    )
}

export default ManageUser