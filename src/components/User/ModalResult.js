import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import _ from 'lodash';

const ModalResult = (props) => {

    const { show, setShow, dataModalResult } = props

    const handleClose = () => {
        setShow(!show)
    }

    return (
        <>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
            >
                <Modal.Header closeButton>
                    <Modal.Title>Your result</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div>
                        Total Questions: <b>{dataModalResult.countTotal}</b>
                    </div>
                    <div>
                        Total Correct Answers: <b>{dataModalResult.countCorrect}</b>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" >
                        Show answers
                    </Button>
                    <Button
                        variant="primary"
                        onClick={() => handleClose()}
                    >
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}


export default ModalResult;
