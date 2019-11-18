import React from 'react';
import _get from 'lodash/get';
import Modal from 'react-bootstrap/Modal';
import TransactionForm from '@/components/pages/Transaction/Index/TransactionForm';

class TransactionModal extends React.Component {
    constructor (props) {
        super(props);

        this.isEdit = this.isEdit.bind(this);
        this.isVisible = this.isVisible.bind(this);
    }

    isVisible () {
        return this.props.transaction !== null;
    }

    isEdit () {
        return _get(this.props, 'transaction.id', null) !== null;
    }

    render () {
        return (
            <Modal size="lg" show={this.isVisible()} onHide={this.props.close}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.isEdit() ? 'Edit' : 'Create'} Transaction</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <TransactionForm
                        transaction={this.props.transaction}
                        saved={this.props.saved}
                    />
                </Modal.Body>
            </Modal>
        );
    }
};

export default TransactionModal;