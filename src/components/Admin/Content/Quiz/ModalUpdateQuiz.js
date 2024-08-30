import { useEffect, useState } from "react";
import Select from "react-select";
import { FcPlus } from "react-icons/fc";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import './../Quiz/ManageQuiz.scss'
import { putUpdateQuiz } from "../../../../services/apiService";
import _ from "lodash";
import { toast } from "react-toastify";


const ModalUpdateQuiz = (props) => {


    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [type, setType] = useState("EASY");
    const [image, setImage] = useState(null);
    const [previewImage, setPreviewImage] = useState("");

    const { show, setShow, dataUpdate, resetUpdateData, fetchListQuiz } = props;

    const handleClose = () => {
        setShow(!show);
        setName("");
        setDescription("");
        setType("EASY");
        setImage(null);
        setPreviewImage(null);
        resetUpdateData();
    }

    useEffect(() => {
        if (!_.isEmpty(dataUpdate)) {
            setName(dataUpdate.name);
            setDescription(dataUpdate.description);
            setType(dataUpdate.difficulty);
            setImage("")
            if (dataUpdate.image) {
                setPreviewImage(`data:image/jpeg;base64,${dataUpdate.image}`)
            }
        }
        console.log("check", dataUpdate)
    }, [dataUpdate])



    const handleChangeFile = (event) => {
        if (event.target && event.target.files && event.target.files[0]) {
            setPreviewImage(URL.createObjectURL(event.target.files[0]));
            setImage(event.target.files[0]);
        }
    }

    const handleSubmitUpdateQuiz = async () => {
        if (!name || !description) {
            toast.error("Name/Description is required");
            return;
        }

        if (!previewImage) {
            toast.error("Image is required");
            return;
        }

        if (!type) {
            toast.error("Type is required");
            return;
        }

        const res = await putUpdateQuiz(dataUpdate.id, description, name, type, image)
        if (res && res.EC === 0) {
            toast.success("Update quiz succeed");
            handleClose();
            await fetchListQuiz();

        }

        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            size='xl'
            backdrop="static"
            className='modal-update-quiz'
        >
            <Modal.Header closeButton>
                <Modal.Title>Add new quiz</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className="row g-3">
                    <div className="col-md-6">
                        <label className="form-label">Name</label>
                        <input type="text"
                            className="form-control"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                        />
                    </div>
                    <div className="col-md-6">
                        <label className="form-label">Description</label>
                        <input type="text"
                            className="form-control"
                            value={description}
                            onChange={(event) => setDescription(event.target.value)}
                        />
                    </div>
                    <div className="col-md-4">
                        <label className="form-label">Difficulty</label>
                        <select className="form-select" onChange={(event) => setType(event.target.value)} value={type}>
                            <option value="EASY">EASY</option>
                            <option value="MEDIUM">MEDIUM</option>
                            <option value="HARD">HARD</option>
                        </select>
                    </div>
                    <div className='col-md-12'>
                        <label className='label-upload mb-2' htmlFor="labelUpload">
                            <FcPlus className='add-icon' />
                            Upload Image
                        </label>
                        <input
                            type='file'
                            hidden
                            id='labelUpload'
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
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSubmitUpdateQuiz()}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalUpdateQuiz;