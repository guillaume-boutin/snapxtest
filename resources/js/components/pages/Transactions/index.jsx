import React from 'react';
import api from '@/lib/api';
import TransactionsTable from '@/components/pages/Transactions/TransactionsTable';
import EditTransactionModal from '@/components/pages/Transactions/EditTransactionModal';

class Transactions extends React.Component {
    constructor (props) {
        super(props);

        this.state = {
            transactions: [],
            editingTransaction: null
        };

        this.onEditTransactionClick = this.onEditTransactionClick.bind(this);
        this.onEditTransactionClose = this.onEditTransactionClose.bind(this);
        this.onTransactionEdited = this.onTransactionEdited.bind(this);
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
            <div>
                <h1>Transactions</h1>

                <TransactionsTable
                    items={this.tableItems()}
                    onEditTransactionClick={this.onEditTransactionClick}
                />

                <EditTransactionModal
                    transaction={this.state.editingTransaction}
                    edited={this.onTransactionEdited}
                    close={this.onEditTransactionClose}
                />
            </div>
        );
    }
};

export default Transactions;