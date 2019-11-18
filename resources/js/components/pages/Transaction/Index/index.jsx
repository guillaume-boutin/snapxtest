import React from 'react';
import api from '@/lib/api';
import moment from 'moment';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import DatePicker from '@/components/common/DatePicker';
import CompanySelector from '@/components/common/CompanySelector';
import PaymentMethodSelector from '@/components/common/PaymentMethodSelector';
import TransactionModal from '@/components/pages/Transaction/Index/TransactionModal';
import TransactionsTable from '@/components/pages/Transaction/Index/TransactionsTable';
import DeleteTransactionModal from '@/components/pages/Transaction/Index/DeleteTransactionModal';

class TransactionIndex extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            transactions: [],
            companies: [],
            editingTransaction: null,
            deletingTransaction: null,
            searchForm: {
                company_id: 0,
                payment_method_id: 0,
                purchased_since: moment().startOf('year').format('YYYY-MM-DD'),
                purchased_until: moment().endOf('year').format('YYYY-MM-DD')
            },
            isSearchDisabled: true
        };

        this.onSearchChange = this.onSearchChange.bind(this);
        this.onSearchSubmit = this.onSearchSubmit.bind(this);
        this.onCreateTransactionClick = this.onCreateTransactionClick.bind(this);
        this.onEditTransactionClick = this.onEditTransactionClick.bind(this);
        this.onEditTransactionClose = this.onEditTransactionClose.bind(this);
        this.onTransactionSaved = this.onTransactionSaved.bind(this);
        this.onTransactionDeleted = this.onTransactionDeleted.bind(this);
        this.onDeleteTransactionClick = this.onDeleteTransactionClick.bind(this);
        this.onDeleteTransactionClose = this.onDeleteTransactionClose.bind(this);
    }

    componentDidMount() {
        this.fetchData()
    }

    fetchData () {
        this.setState({ isSearchDisabled: true });
        return Promise.all([
            api('transaction.index', this.state.searchForm),
            api('company.index')
        ])
        .then(responses => {
            this.setState({
                transactions: responses[0].data,
                companies: responses[1].data,
                isSearchDisabled: false
            });
        });
    }

    onSearchChange (e) {
        let { searchForm } = this.state;
        searchForm[e.target.name] = e.target.value;
        this.setState({ searchForm });
    }

    onSearchSubmit (e) {
        if (this.state.isSearchDisabled) return;

        this.setState({ isSearchDisabled: true });

        let { searchForm } = this.state;

        if (searchForm.company_id == 0) delete searchForm.company_id;
        if (searchForm.payment_method_id == 0) delete searchForm.payment_method_id;

        api('transaction.index', searchForm)
        .then(({ data }) => {
            this.setState({
                transactions: data,
                isSearchDisabled: false
            });
        })
    }

    onCreateTransactionClick () {
        this.setState({ editingTransaction: {} });
    }

    onEditTransactionClick (id) {
        this.setState({ editingTransaction: this.getTransaction(id) });
    }

    onEditTransactionClose () {
        this.setState({ editingTransaction: null });
    }

    onTransactionSaved () {
        this.setState({ editingTransaction: null });
        this.fetchData();
    }

    onDeleteTransactionClick (id) {
        this.setState({ deletingTransaction: this.getTransaction(id) });
    }

    onTransactionDeleted () {
        this.setState({ deletingTransaction: null });
        this.fetchData();
    }

    onDeleteTransactionClose () {
        this.setState({ deletingTransaction: null });
    }

    getTransaction(id) {
        return this.state.transactions.find(item => item.id == id);
    }

    render () {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>Transactions</h1>
                    </Col>
                </Row>

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
                        <Form.Label column>Supplier</Form.Label>

                        <Col>
                            <CompanySelector
                                name="company_id"
                                companies={this.state.companies}
                                value={this.state.searchForm.company_id}
                                onChange={this.onSearchChange}
                                allowEmpty={true}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Form.Label column>Payment Method</Form.Label>

                        <Col>
                            <PaymentMethodSelector
                                name="payment_method_id"
                                value={this.state.searchForm.payment_method_id}
                                onChange={this.onSearchChange}
                                allowEmpty={true}
                            />
                        </Col>
                    </Form.Group>

                    <Form.Group as={Row}>
                        <Col>
                            <Button
                                disabled={this.state.isSearchDisabled}
                                variant="primary"
                                onClick={this.onSearchSubmit}
                            >Search</Button>
                        </Col>
                    </Form.Group>
                </Form>

                <Row>
                    <Col style={{
                        display: "flex",
                        justifyContent: 'flex-end',
                        paddingBottom: '0.5em'
                    }}>
                        <Button
                            variant="success"
                            onClick={this.onCreateTransactionClick}
                        >
                            Create Transaction
                        </Button>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <TransactionsTable
                            items={this.state.transactions}
                            onEditTransactionClick={this.onEditTransactionClick}
                            onDeleteTransactionClick={this.onDeleteTransactionClick}
                        />
                    </Col>
                </Row>

                <TransactionModal
                    transaction={this.state.editingTransaction}
                    saved={this.onTransactionSaved}
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

export default TransactionIndex;