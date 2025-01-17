import ModalCreateUser from './ModalCreateUser';
import './ManageUser.scss'
import { FcPlus } from "react-icons/fc";
import TableUser from './TableUser';
import { useEffect, useState } from "react";
import { getAllUsers, getUserWithPaginate } from "../../../services/apiService";
import ModalUpdateUser from './ModalUpdateUser';
import ModalDeleteUser from './ModalDeleteUser';
import TableUserPaginate from './TableUserPaginate';


const ManageUser = (props) => {

    const LIMIT_USER = 3

    const [pageCount, setPageCount] = useState(0)

    const [currentPage, setCurrentPage] = useState(1);

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);

    const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);

    const [showModalDeleteUser, setShowModalDeleteUser] = useState(false);

    const [dataUpdate, setDataUpdate] = useState({})

    const [dataDelete, setDataDelete] = useState({})

    const [listUsers, setListUser] = useState([])

    useEffect(() => {
        // fetchListUsers();
        fetchListUsersWithPaginate(1);
    }, []);

    const fetchListUsers = async () => {
        let res = await getAllUsers();
        if (res.EC === 0) {
            setListUser(res.DT)
        }
    }

    const fetchListUsersWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        console.log(res)
        if (res.EC === 0) {
            setListUser(res.DT.users)
            setPageCount(res.DT.totalPages)
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
                    {/* <TableUser
                        listUsers={listUsers}
                        hanldeClickBtnUpdate={hanldeClickBtnUpdate}
                        hanldeClickBtnDelete={hanldeClickBtnDelete}
                    /> */}
                    <TableUserPaginate
                        listUsers={listUsers}
                        hanldeClickBtnUpdate={hanldeClickBtnUpdate}
                        hanldeClickBtnDelete={hanldeClickBtnDelete}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
            </div>

            <ModalCreateUser
                show={showModalCreateUser}
                setShow={setShowModalCreateUser}
                fetchListUsers={fetchListUsers}
                fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <ModalUpdateUser
                show={showModalUpdateUser}
                setShow={setShowModalUpdateUser}
                dataUpdate={dataUpdate}
                fetchListUsers={fetchListUsers}
                resetUpdateData={resetUpdateData}
                fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
            <ModalDeleteUser
                show={showModalDeleteUser}
                setShow={setShowModalDeleteUser}
                dataDelete={dataDelete}
                fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
            />
        </div>
    )
}

export default ManageUser