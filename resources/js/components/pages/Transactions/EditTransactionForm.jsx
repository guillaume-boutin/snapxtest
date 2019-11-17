import React from 'react';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isString from 'lodash/isString';
import api from '@/lib/api';
import Button from 'react-bootstrap/Button';
import DatePicker from '@/components/common/DatePicker';
import Form from 'react-bootstrap/Form';
import PaymentMethodSelector from '@/components/common/PaymentMethodSelector';

class EditTransactionForm extends React.Component {
    constructor (props) {
        super(props);

        this.computeState(props);

        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        // this.onDateChange = this.onDateChange.bind(this);
        this.onSuccessfulSubmit = this.onSuccessfulSubmit.bind(this);
    }

    computeState (props) {
        let form = {};
        this.formFields().every(field => {
            _set(form, field, _get(props.transaction, field, null));
            return true;
        });

        this.state = {
            paymentMethods: [],
            form,
            isEnabled: true
        };
    }

    formFields () {
        return [
            'id',
            'company.name',
            'date_of_purchase',
            'subtotal',
            'tps',
            'tvq',
            'payment_method'
        ];
    }

    onChange (e) {
        let { form } = this.state;
        _set(form, e.target.name, e.target.value);
        this.setState({ form });
    }

    // onDateChange (date) {
    //     let { form } = this.state;
    //     form.date_of_purchase = date;
    //     this.setState({ form })
    // }

    onSubmit () {
        if (!this.state.isEnabled) return;

        let { form } = this.state;

        this.formFields().every(field => {
            let value = _get(form, field, null);

            if (! _isString(value)) return true;

            _set(form, field, value.trim());

            return true;
        });

        api('transaction.update', form)
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
                        name="date_of_purchase"
                        value={this.state.form.date_of_purchase}
                        onChange={this.onChange}
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

                    <PaymentMethodSelector
                        name="payment_method_id"
                        value={this.state.form.payment_method_id}
                        onChange={this.onChange}
                    />
                </Form.Group>

                <Button variant="primary" onClick={this.onSubmit} disabled={!this.state.isEnabled}>
                    Submit
                </Button>
            </Form>
        );
    }
};

export default EditTransactionForm;