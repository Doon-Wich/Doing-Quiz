import Select from 'react-select';
import { useEffect, useState } from 'react';
import { getAllQuizForAdmin, getAllUsers, postAssignQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import _ from 'lodash';

const AssignQuiz = (props) => {

    const [selectedQuiz, setSelectedQuiz] = useState({});
    const [listQuiz, setListQuiz] = useState([]);

    const [selectedUser, setSelectedUser] = useState({});
    const [listUser, setListUser] = useState([]);


    useEffect(() => {
        fetchListQuiz();
        fetchListUser();
    }, [])

    const fetchListQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            let newQuiz = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.description}`
                }
            })
            setListQuiz(newQuiz);
        }
    }

    const fetchListUser = async () => {
        let res = await getAllUsers();
        if (res && res.EC === 0) {
            let newUser = res.DT.map(item => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.username} - ${item.email}`
                }
            })
            setListUser(newUser);
        }
    }

    const handleAssignQuiz = async () => {
        // validate
        if (_.isEmpty(selectedQuiz)) {
            toast.error("Please choose a Quiz");
            return;
        }

        if (_.isEmpty(selectedUser)) {
            toast.error("Please choose a User");
            return;
        }
        // Assign quiz
        const res = await postAssignQuiz(selectedQuiz.value, selectedUser.value);
        if (res && res.EC === 0) {
            toast.success("Assign the Quiz to current User Succeed");
            setSelectedQuiz({});
            setSelectedUser({});
        }

        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    }

    return (
        <div className="assign-quiz-container  row">
            <div className='col-5 form-group'>
                <label className='mb-1'>Select Quiz:</label>
                <Select
                    defaultValue={selectedQuiz}
                    onChange={setSelectedQuiz}
                    options={listQuiz}
                />
            </div>
            <div className='col-5 form-group'>
                <label className='mb-1'>Select User:</label>
                <Select
                    defaultValue={selectedUser}
                    onChange={setSelectedUser}
                    options={listUser}
                />
            </div>
            <div>
                <button onClick={() => handleAssignQuiz()} className='btn btn-warning mt-3'>Assign</button>
            </div>
        </div>
    )
}

export default AssignQuiz;