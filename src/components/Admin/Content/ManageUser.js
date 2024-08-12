import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss'
import { FcPlus } from "react-icons/fc";
import TableUser from './TableUser';
import { useEffect, useState } from "react";
import { getAllUsers } from "../../../services/apiService";
import ModalUpdateUser from './ModalUpdateUser';
import ModalDeleteUser from './ModalDeleteUser';


const ManageUser = (props) => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);

    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({})

    const [dataDelete, setDataDelete] = useState({})

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

    const hanldeClickBtnUpdate = (user) => {
        setShowModalUpdateUser(true);
        setDataUpdate(user)
    }

    const hanldeClickBtnDelete = (user) => {
        setShowModalDeleteUser(true);
        setDataDelete(user)
    }
    const resetUpdateData = () => {
        setDataUpdate({})
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
                    <TableUser
                        listUsers={listUsers}
                        hanldeClickBtnUpdate={hanldeClickBtnUpdate}
                        hanldeClickBtnDelete={hanldeClickBtnDelete}
                    />
                </div>
            </div>

            <ModalCreateUser
                show={showModalCreateUser}
                setShow={setShowModalCreateUser}
                fetchListUsers={fetchListUsers}
            />
            <ModalUpdateUser
                show={showModalUpdateUser}
                setShow={setShowModalUpdateUser}
                dataUpdate={dataUpdate}
                fetchListUsers={fetchListUsers}
                resetUpdateData={resetUpdateData}
            />
            <ModalDeleteUser
                show={showModalDeleteUser}
                setShow={setShowModalDeleteUser}
                email={dataUpdate.email}
                dataDelete={dataDelete}
                fetchListUsers={fetchListUsers}
            />
        </div>
    )
}

export default ManageUser