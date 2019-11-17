import React from 'react';
import Form from 'react-bootstrap/Form';

class PaymentMethodSelector extends React.Component {
    constructor (props) {
        super(props);

        this.onChange = this.onChange.bind(this);
    }

    paymentMethods () {
        return [
            { id: 1, name: 'Cash', slug: 'cash' },
            { id: 2, name: 'Credit Card', slug: 'credit-card' },
            { id: 3, name: 'Debit Card', slug: 'debit-card' }
        ];
    }

    allowEmpty () {
        return this.props.allowEmpty || false;
    }

    onChange (e) {
        this.props.onChange(e);
    }

    render () {
        return (
            <Form.Control
                as="select"
                value={this.props.value || '0'}
                name={this.props.name}
                onChange={this.onChange}
            >
                { this.allowEmpty() ? <option value={'0'}></option> : null }

                {this.paymentMethods().map(pm =>
                    <option key={pm.id} value={pm.id}>{pm.name}</option>
                )}
            </Form.Control>
        );
    }
};

export default PaymentMethodSelector;