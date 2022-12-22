import React from "react";
import * as BS from "react-bootstrap";

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const DeleteModal = ({handleClose, show, onDeleteData}: any): JSX.Element => {
    return (
        <BS.Modal
            show={show}
            onHide={() => handleClose(false)}
            dialogClassName="modal-40w delete-modal"
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <BS.Modal.Header closeButton>
                <BS.Modal.Title id="example-modal-sizes-title-lg">
                    Are you sure you want to delete?
                </BS.Modal.Title>
            </BS.Modal.Header>
            <BS.Modal.Footer>
                <BS.Button variant="secondary" className="btn-md-w" onClick={() => handleClose(false)}>
                    Cancel
                </BS.Button>
                <BS.Button
                    variant="primary"
                    className="btn-md-w"
                    onClick={ () => { onDeleteData();  handleClose(false) }}
                >
                    Yes
                </BS.Button>
            </BS.Modal.Footer>
        </BS.Modal>
    )
}

export default DeleteModal;