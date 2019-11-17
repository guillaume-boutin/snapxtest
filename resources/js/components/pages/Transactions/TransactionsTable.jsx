import React from 'react';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

class TransactionsTable extends React.Component {
    constructor (props) {
        super(props);

        this.onEditClick = this.onEditClick.bind(this);
    }

    onEditClick(e) {
        const id = e.target.getAttribute('item-id');
        this.props.onEditTransactionClick(id);
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

                        <th>Payment Method</th>

                        <th></th>
                    </tr>
                </thead>

                <tbody>
                    {this.props.items.map(item => (
                        <tr key={item.id}>
                            <td>{item.supplier}</td>

                            <td>{item.dateOfPurchase}</td>

                            <td>{item.subtotal}</td>

                            <td>{item.tps}</td>

                            <td>{item.tvq}</td>

                            <td>{item.paymentMethod}</td>

                            <td>
                                <Button
                                    item-id={item.id}
                                    variant="success"
                                    size="sm"
                                    onClick={this.onEditClick}
                                >Edit</Button>

                                <Button
                                    variant="danger"
                                    size="sm"
                                    style={{
                                        marginLeft: "1em"
                                    }}
                                >Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        );
    }
};

export default TransactionsTable;