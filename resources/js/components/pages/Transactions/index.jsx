import React from 'react';
import api from '@/lib/api';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import DatePicker from '@/components/common/DatePicker';
import TransactionsTable from '@/components/pages/Transactions/TransactionsTable';
import EditTransactionModal from '@/components/pages/Transactions/EditTransactionModal';
import DeleteTransactionModal from '@/components/pages/Transactions/DeleteTransactionModal';

class Transactions extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            transactions: [],
            editingTransaction: null,
            deletingTransaction: null
        };

        this.onEditTransactionClick = this.onEditTransactionClick.bind(this);
        this.onEditTransactionClose = this.onEditTransactionClose.bind(this);
        this.onTransactionEdited = this.onTransactionEdited.bind(this);
        this.onTransactionDeleted = this.onTransactionDeleted.bind(this);
        this.onDeleteTransactionClick = this.onDeleteTransactionClick.bind(this);
        this.onDeleteTransactionClose = this.onDeleteTransactionClose.bind(this);
    }

    componentDidMount() {
        this.fetchTransactions()
    }

    fetchTransactions () {
        return api('transaction.index')
            .then(({ data }) => {
                this.setState({ transactions: data });
            });
    }

    onEditTransactionClick (id) {
        this.setState({ editingTransaction: this.getTransaction(id) });
    }

    onEditTransactionClose () {
        this.setState({ editingTransaction: null });
    }

    onTransactionEdited () {
        this.setState({ editingTransaction: null });
        this.fetchTransactions();
    }

    onDeleteTransactionClick (id) {
        this.setState({ deletingTransaction: this.getTransaction(id) });
    }

    onTransactionDeleted () {
        this.setState({ deletingTransaction: null });
        this.fetchTransactions();
    }

    onDeleteTransactionClose () {
        this.setState({ deletingTransaction: null });
    }

    getTransaction(id) {
        return this.state.transactions.find(item => item.id == id);
    }

    tableItems () {
        return this.state.transactions.map(t => ({
            id: t.id,
            supplier: t.company.name,
            dateOfPurchase: t.date_of_purchase,
            subtotal: t.subtotal,
            tps: t.tps,
            tvq: t.tvq,
            paymentMethod: t.payment_method.name
        }));
    }

    render () {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>Transactions</h1>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <h2>Search</h2>
                    </Col>
                </Row>

                <Form>
                    <Form.Group as={Row} >
                        <Form.Label column>Purchased since</Form.Label>

                        <Col>
                            <DatePicker />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row} >
                        <Form.Label column>Purchased until</Form.Label>

                        <Col>
                            <DatePicker />
                        </Col>
                    </Form.Group>


                </Form>

                <Row>
                    <Col>
                        <TransactionsTable
                            items={this.tableItems()}
                            onEditTransactionClick={this.onEditTransactionClick}
                            onDeleteTransactionClick={this.onDeleteTransactionClick}
                        />
                    </Col>
                </Row>

                <EditTransactionModal
                    transaction={this.state.editingTransaction}
                    edited={this.onTransactionEdited}
                    close={this.onEditTransactionClose}
                />

                <DeleteTransactionModal
                    transaction={this.state.deletingTransaction}
                    deleted={this.onTransactionDeleted}
                    close={this.onDeleteTransactionClose}
                />
            </Container>
        );
    }
};

export default Transactions;