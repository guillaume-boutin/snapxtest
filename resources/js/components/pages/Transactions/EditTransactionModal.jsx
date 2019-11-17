import React from 'react';
import _get from 'lodash/get';
import Modal from 'react-bootstrap/Modal';

class EditTransactionModal extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            transaction: props.transaction,
            close: props.close
        }

        this.isVisible = this.isVisible.bind(this);
    }

    isVisible () {
        return _get(this.props, 'transaction.id', null) !== null;
    }

    render () {
        return (
            <Modal show={this.isVisible()} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Transaction</Modal.Title>

                    <Modal.Body>
                        Form goes here
                    </Modal.Body>
                </Modal.Header>
            </Modal>
        );
    }
};

export default EditTransactionModal;