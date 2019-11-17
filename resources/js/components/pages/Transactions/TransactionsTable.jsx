import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

class TransactionsTable extends React.Component {
    constructor (props) {
        super(props);

        this.onEditClick = this.onEditClick.bind(this);
        this.onDeleteClick = this.onDeleteClick.bind(this);
    }

    tableItems () {
        return this.props.items.map(t => ({
            id: t.id,
            supplier: t.company.name,
            dateOfPurchase: t.date_of_purchase,
            subtotal: t.subtotal,
            tps: t.tps,
            tvq: t.tvq,
            total: this.calculateTotal(t),
            paymentMethod: t.payment_method.name
        }));
    }

    calculateTotal (item) {
        const subtotal = parseFloat(item.subtotal) || 0;
        const tps = parseFloat(item.tps) || 0;
        const tvq = parseFloat(item.tvq) || 0;

        return this.floatToString(subtotal + tps + tvq);
    }

    sum (field) {
        let sum = this.tableItems().reduce((sum, item) => {
            let value = parseFloat(item[field]) || 0;
            return sum + value;
        }, 0);

        return this.floatToString(sum);
    }

    floatToString(floatVal) {
        let stringVal = Math.round(floatVal * 100).toString();
        return stringVal.slice(0, -2) + '.' + stringVal.slice(-2);
    }

    onEditClick (e) {
        const id = e.target.getAttribute('item-id');
        this.props.onEditTransactionClick(id);
    }

    onDeleteClick (e) {
        const id = e.target.getAttribute('item-id');
        this.props.onDeleteTransactionClick(id);
    }

    render () {
        return (
            <Table>
                <thead>
                    <tr>
                        <th>Supplier</th>

                        <th>Date of purchase</th>

                        <th>Subtotal</th>

                        <th>TPS</th>

                        <th>TVQ</th>

                        <th>Total</th>

                        <th>Payment Method</th>

                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {this.tableItems().map(item => (
                        <tr key={item.id}>
                            <td>{item.supplier}</td>

                            <td>{item.dateOfPurchase}</td>

                            <td>{item.subtotal}</td>

                            <td>{item.tps || 'NO TAX'}</td>

                            <td>{item.tvq || 'NO TAX'}</td>

                            <td>{item.total}</td>

                            <td>{item.paymentMethod}</td>

                            <td>
                                <Button
                                    item-id={item.id}
                                    variant="success"
                                    size="sm"
                                    onClick={this.onEditClick}
                                >Edit</Button>

                                <Button
                                    item-id={item.id}
                                    variant="danger"
                                    size="sm"
                                    onClick={this.onDeleteClick}
                                    style={{
                                        marginLeft: "1em"
                                    }}
                                >Delete</Button>
                            </td>
                        </tr>
                    ))}

                    {this.tableItems().length ?
                        <tr>
                            <td><b>Total</b></td>

                            <td></td>

                            <td>{this.sum('subtotal')}</td>

                            <td>{this.sum('tps')}</td>

                            <td>{this.sum('tvq')}</td>

                            <td>{this.sum('total')}</td>

                            <td></td>

                            <td></td>
                        </tr> : null}
                </tbody>
            </Table>
        );
    }
};

export default TransactionsTable;