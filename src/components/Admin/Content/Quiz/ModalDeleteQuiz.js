import { toast } from "react-toastify";
import { deleteQuiz } from "../../../../services/apiService";
import Modal from "react-bootstrap/Modal";
import Button from 'react-bootstrap/Button';

const ModalDeleteQuiz = (props) => {
    const { show, setShow, dataDelete } = props

    const handleClose = () => {
        setShow(!show);
    }

    const handleSubmitDeleteQuiz = async () => {
        console.log(dataDelete);
        let res = await deleteQuiz(dataDelete.id);
        console.log("check res", res);
        if (res && res.EC === 0) {
            toast.success("Delete quiz suscced")
            handleClose();
            await props.fetchListQuiz();
        }

        if (res && res.EC !== 0) {
            toast.error(res.EM);
        }
    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
            backdrop="static"
        >
            <Modal.Header closeButton>
                <Modal.Title>Confirm Delete the Quiz?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure to delete this quiz. name:  <b>{
                dataDelete && dataDelete.name ? dataDelete.name : ""
            }</b> </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={() => handleSubmitDeleteQuiz()}
                >
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default ModalDeleteQuiz;