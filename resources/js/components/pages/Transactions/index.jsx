import React from 'react';
import api from '@/lib/api';
import moment from 'moment';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import DatePicker from '@/components/common/DatePicker';
import PaymentMethodSelector from '@/components/common/PaymentMethodSelector';
import TransactionsTable from '@/components/pages/Transactions/TransactionsTable';
import EditTransactionModal from '@/components/pages/Transactions/EditTransactionModal';
import DeleteTransactionModal from '@/components/pages/Transactions/DeleteTransactionModal';

class Transactions extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            transactions: [],
            editingTransaction: null,
            deletingTransaction: null,
            searchForm: {
                purchased_since: moment().startOf('year').format('YYYY-MM-DD'),
                purchased_until: moment().endOf('year').format('YYYY-MM-DD'),
                payment_method: 0
            }
        };

        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
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

    onSearchChange (e) {
        let { searchForm } = this.state;
        searchForm[e.target.name] = e.target.value;
        this.setState({ searchForm });
    }

    onSearchSubmit (e) {
        console.log(this.state.searchForm);
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

                {/* <Row>
                    <Col>
                        <h2>Search</h2>
                    </Col>
                </Row> */}

                <Form>
                    <Form.Group as={Row}>
                        <Form.Label column>Purchased since</Form.Label>

                        <Col>
                            <DatePicker
                                name="purchased_since"
                                value={this.state.searchForm.purchased_since}
                                onChange={this.onSearchChange}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column>Purchased until</Form.Label>

                        <Col>
                            <DatePicker
                                name="purchased_until"
                                value={this.state.searchForm.purchased_until}
                                onChange={this.onSearchChange}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column>Payment Method</Form.Label>

                        <Col>
                            <PaymentMethodSelector
                                name="payment_method"
                                value={this.state.searchForm.payment_method}
                                onChange={this.onSearchChange}
                                allowEmpty={true}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col>
                            <Button variant="primary" onClick={this.onSearchSubmit}>Search</Button>
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