import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss'
import { FcPlus } from "react-icons/fc";
import { useState } from 'react';

const ManageUser = (props) => {

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);

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
                    table users

                </div>
            </div>

            <ModalCreateUser show={showModalCreateUser} setShow={setShowModalCreateUser} />
        </div>
    )
}

export default ManageUser