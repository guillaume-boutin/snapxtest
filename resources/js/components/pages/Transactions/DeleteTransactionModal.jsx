import React from 'react';
import _get from 'lodash/get';
import api from '@/lib/api';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

class DeleteTransactionModal extends React.Component {
    constructor (props) {
        super(props);

        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    isVisible () {
        return _get(this.props, 'transaction.id', null) !== null;
    }

    onDeleteClick () {
        api('transaction.delete', {id: this.props.transaction.id})
        .then(this.props.deleted)
    }

    render () {
        return (
            <Modal show={this.isVisible()} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Transaction</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    Are you sure you want to delete this transaction?
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.close}>Cancel</Button>

                    <Button variant="danger" onClick={this.onDeleteClick}>Delete</Button>
                </Modal.Footer>
            </Modal>
        );
    }
};

export default DeleteTransactionModal;