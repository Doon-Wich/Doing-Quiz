import './../Quiz/ManageQuiz.scss';
import Select from 'react-select';
import { FcPlus } from "react-icons/fc";
import { useEffect, useState } from 'react';
import { postCreateNewQuiz } from '../../../../services/apiService';
import { toast } from 'react-toastify';
import TableQuiz from './TableQuiz';
import Accordion from 'react-bootstrap/Accordion';
import ModalUpdateQuiz from './ModalUpdateQuiz';
import { getAllQuizForAdmin } from "../../../../services/apiService";
import ModalDeleteQuiz from './ModalDeleteQuiz';

const options = [
    { value: 'EASY', label: 'EASY' },
    { value: 'MEDIUM', label: 'MEDIUM' },
    { value: 'HARD', label: 'HARD' },
];

const ManageQuiz = (props) => {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [type, setType] = useState('');
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState("");
    const [showModalUpdateQuiz, setShowModalUpdateQuiz] = useState(false);
    const [showModalDeleteQuiz, setShowModalDeleteQuiz] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataDelete, setDataDelete] = useState({});
    const [listQuiz, setlistQuiz] = useState([]);

    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    }

    useEffect(() => {
        fetchListQuiz();
    }, [])

    const fetchListQuiz = async () => {
        let res = await getAllQuizForAdmin();
        if (res && res.EC === 0) {
            setlistQuiz(res.DT);
        }
    }

    const handleSubmitQuiz = async () => {
        if (!name || !description) {
            toast.error("Name/Description is required");
            return;
        }

        if (!image) {
            toast.error("Image is required");
            return;
        }

        if (!type) {
            toast.error("Type is required");
            return;
        }

        const res = await postCreateNewQuiz(description, name, type?.value, image);
        if (res && res.EC === 0) {
            toast.success("Create quiz succeed");
            setName('');
            setDescription('');
            setType('');
            setPreviewImage('');
            setImage(null);
            document.getElementById('labelupload').value = null;
        }
        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    }

    const hanldeClickBtnUpdate = (quiz) => {
        setShowModalUpdateQuiz(true);
        setDataUpdate(quiz);
    }

    const hanldeClickBtnDelete = (quiz) => {
        setShowModalDeleteQuiz(true);
        setDataDelete(quiz);
    }

    const resetUpdateData = () => {
        setDataUpdate({})
    }

    return (
        <div className="quiz-container">
            <Accordion defaultActiveKey="0">
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Manage Quizzes</Accordion.Header>
                    <Accordion.Body>
                        <div className="add-new">
                            <fieldset className="border rounded-3 p-3">
                                <legend className="float-none w-auto px-3">Add new Quiz</legend>
                                <div class="form-floating mb-3">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder='Your quiz name'
                                        value={name}
                                        onChange={(event) => setName(event.target.value)}
                                    />
                                    <label>Name</label>
                                </div>
                                <div class="form-floating">
                                    <input
                                        type="text"
                                        class="form-control"
                                        placeholder='Description'
                                        value={description}
                                        onChange={(event) => setDescription(event.target.value)}
                                    />
                                    <label >Description</label>
                                </div>
                                <div className='my-3'>
                                    <Select
                                        value={type}
                                        // onChange={}
                                        defaultValue={type}
                                        onChange={setType}
                                        options={options}
                                        placeholder={"Quiz type"}
                                    />
                                </div>

                                <div className='more-options form-group'>
                                    <label className='label-upload mb-2'>
                                        <FcPlus className='add-icon' />
                                        Upload Image
                                    </label>
                                    <input
                                        className='form-control'
                                        type='file'
                                        id='labelupload'
                                        onChange={(event) => handleChangeFile(event)}
                                    />
                                    <div className='img-preview'>
                                        {previewImage ?
                                            <img src={previewImage} />
                                            :
                                            <span>Preview Image</span>
                                        }
                                    </div>
                                </div>
                                <div className='mt-3'>
                                    <button className='btn btn-warning'
                                        onClick={() => handleSubmitQuiz()}
                                    >
                                        Save
                                    </button>
                                </div>
                            </fieldset>
                        </div>
                    </Accordion.Body>
                </Accordion.Item>
            </Accordion>

            <div className="list-detail">
                <TableQuiz
                    listQuiz={listQuiz}
                    hanldeClickBtnUpdate={hanldeClickBtnUpdate}
                    hanldeClickBtnDelete={hanldeClickBtnDelete}
                />
            </div>
            <ModalUpdateQuiz
                show={showModalUpdateQuiz}
                setShow={setShowModalUpdateQuiz}
                dataUpdate={dataUpdate}
                resetUpdateData={resetUpdateData}
                fetchListQuiz={fetchListQuiz}
            />
            <ModalDeleteQuiz
                show={showModalDeleteQuiz}
                setShow={setShowModalDeleteQuiz}
                dataDelete={dataDelete}
                fetchListQuiz={fetchListQuiz}
            />
        </div>
    )
}

export default ManageQuiz;