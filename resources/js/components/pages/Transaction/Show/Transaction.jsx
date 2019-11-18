import React from 'react';
import _get from 'lodash/get';
import Table from 'react-bootstrap/Table';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Container from 'react-bootstrap/Container';

class Transaction extends React.Component {
    constructor (props) {
        super(props);
    }

    render () {
        return (
            <Container>
                <Row>
                    <Col>
                        <h1>Transaction{` #${this.props.transaction.id}`}</h1>
                    </Col>
                </Row>

                <Row>
                    <Col>
                        <Table>
                            <tbody>

                                <tr>
                                    <td><b>Supplier ID</b></td>

                                    <td>{this.props.transaction.company.id}</td>
                                </tr>

                                <tr>
                                    <td><b>Supplier</b></td>

                                    <td>{this.props.transaction.company.name}</td>
                                </tr>

                                <tr>
                                    <td><b>Payment Method</b></td>

                                    <td>{this.props.transaction.payment_method.name}</td>
                                </tr>

                                <tr>
                                    <td><b>Subtoal</b></td>

                                    <td>{this.props.transaction.subtotal}</td>
                                </tr>

                                <tr>
                                    <td><b>TPS</b></td>

                                    <td>{this.props.transaction.tps || 'NO TAX'}</td>
                                </tr>

                                <tr>
                                    <td><b>TVQ</b></td>

                                    <td>{this.props.transaction.tvq || 'NO TAX'}</td>
                                </tr>

                                <tr>
                                    <td><b>Total</b></td>

                                    <td>{this.props.transaction.total}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Container>
        );
    }
};

export default Transaction;