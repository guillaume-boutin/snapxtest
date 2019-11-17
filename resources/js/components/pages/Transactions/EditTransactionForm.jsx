import React from 'react';
import _set from 'lodash/set';
import api from '@/lib/api';
import Button from 'react-bootstrap/Button';
import DatePicker from '@/components/partials/DatePicker';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';

class EditTransactionForm extends React.Component {
    constructor (props) {
        super(props);

        this.computeState(props);

        this.onPaymentMethodsFetched = this.onPaymentMethodsFetched.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onDateChange = this.onDateChange.bind(this);
        this.onSuccessfulSubmit = this.onSuccessfulSubmit.bind(this);
    }

    computeState (props) {
        this.state = {
            paymentMethods: [],
            form: {
                id: props.transaction.id,
                company: {
                    name: props.transaction.company.name
                },
                date_of_purchase: props.transaction.date_of_purchase,
                subtotal: props.transaction.subtotal,
                tps: props.transaction.tps,
                tvq: props.transaction.tvq,
                payment_method_id: props.transaction.payment_method.id
            },
            isEnabled: false
        };
    }

    componentDidMount () {
        api('paymentMethod.index').then(this.onPaymentMethodsFetched);
    }

    onPaymentMethodsFetched ({ data }) {
        this.setState({
            paymentMethods: data,
            isEnabled: true
        });
    }

    onChange (e) {
        let { form } = this.state;
        _set(form, e.target.name, e.target.value);
        this.setState({ form });
    }

    onDateChange (date) {
        let { form } = this.state;
        form.date_of_purchase = date;
        this.setState({ form })
    }

    onSubmit () {
        if (!this.state.isEnabled) return;

        api('transaction.update', this.state.form)
        .then(this.onSuccessfulSubmit);
    }

    onSuccessfulSubmit({ data }) {
        this.props.edited();
    }

    render () {
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Supplier</Form.Label>

                    <Form.Control
                        type="text"
                        name="company.name"
                        value={this.state.form.company.name}
                        onChange={this.onChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Date of purchase</Form.Label>

                    <DatePicker
                        value={this.state.form.date_of_purchase}
                        onChange={this.onDateChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Subtotal</Form.Label>

                    <Form.Control
                        type="number"
                        name="subtotal"
                        value={this.state.form.subtotal}
                        min="0"
                        max="999999999.99"
                        step="0.01"
                        onChange={this.onChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>TPS</Form.Label>
                    
                    <Form.Control
                        type="number"
                        name="tps"
                        value={this.state.form.tps}
                        min="0"
                        max="999999999.99"
                        step="0.01"
                        onChange={this.onChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>TVQ</Form.Label>
                    
                    <Form.Control
                        type="number"
                        name="tvq"
                        value={this.state.form.tvq}
                        min="0"
                        max="999999999.99"
                        step="0.01"
                        onChange={this.onChange}
                    />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Payment method</Form.Label>
                    
                    <Form.Control
                        as="select"
                        name="payment_method_id"
                        value={this.state.form.payment_method_id}
                        onChange={this.onChange}
                    >
                        {this.state.paymentMethods.map(pm => (
                            <option key={pm.id} value={pm.id}>{ pm.name }</option>
                        ))}
                    </Form.Control>
                </Form.Group>

                <Button variant="primary" onClick={this.onSubmit} disabled={!this.state.isEnabled}>
                    Submit
                </Button>
            </Form>
        );
    }
};

export default EditTransactionForm;