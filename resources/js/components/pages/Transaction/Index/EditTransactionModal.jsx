import React from 'react';
import _get from 'lodash/get';
import Modal from 'react-bootstrap/Modal';
import EditTransactionForm from '@/components/pages/Transaction/Index/EditTransactionForm';

class EditTransactionModal extends React.Component {
    constructor (props) {
        super(props);

        this.isVisible = this.isVisible.bind(this);
    }

    isVisible () {
        return _get(this.props, 'transaction.id', null) !== null;
    }

    render () {
        return (
            <Modal size="lg" show={this.isVisible()} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Transaction</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <EditTransactionForm
                        transaction={this.props.transaction}
                        edited={this.props.edited}
                    />
                </Modal.Body>
            </Modal>
        );
    }
};

export default EditTransactionModal;