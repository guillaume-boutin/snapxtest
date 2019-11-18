import React from 'react';
import api from '@/lib/api';
import moment from 'moment';
import _get from 'lodash/get';
import _set from 'lodash/set';
import _isString from 'lodash/isString';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import ValidationErrors from '@/lib/ValidationErrors';
import DatePicker from '@/components/common/DatePicker';
import PaymentMethodSelector from '@/components/common/PaymentMethodSelector';

class EditTransactionForm extends React.Component {
    constructor (props) {
        super(props);

        this.computeState(props);

        this.isEdit = this.isEdit.bind(this);
        this.isEnabled = this.isEnabled.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
        this.onSuccessfulSubmit = this.onSuccessfulSubmit.bind(this);
        this.onFailedSubmit = this.onFailedSubmit.bind(this);
    }

    computeState (props) {
        let form = {
            company: {
                name: _get(props, 'transaction.company.name', '')
            },
            date_of_purchase: _get(props, 'transaction.company.name', moment().format("YYYY-MM-DD")),
            subtotal: _get(props, 'transaction.subtotal', ''),
            tps: _get(props, 'transaction.tps', ''),
            tvq: _get(props, 'transaction.tvq', ''),
            payment_method_id: _get(props, 'transaction.payment_method_id', 1),
        };

        this.state = {
            paymentMethods: [],
            form,
            isLoading: false,
            errors: new ValidationErrors()
        };
    }

    isEnabled () {
        return ! this.state.isLoading && ! this.state.errors.any();
    }

    isEdit () {
        return _get(this.props.transaction.id, null);
    }

    onChange (e) {
        let { form, errors } = this.state;
        _set(form, e.target.name, e.target.value);

        errors.clear(e.target.name);

        this.setState({ form, errors });
    }

    onSubmit () {
        if (!this.isEnabled()) return;

        let { form } = this.state;

        ['company.name', 'subtotal', 'tps', 'tvq'].forEach(field => {
            _set(form, field, trim(_get(form, field, '')));
        })

        let route = 'transaction.create'
        if (this.isEdit()) {
            form.id = this.props.transaction.id;
            route = 'transaction.update'
        }

        api(route, form)
        .then(this.onSuccessfulSubmit)
        .catch(this.onFailedSubmit);
    }

    onSuccessfulSubmit({ data }) {
        this.props.edited();
    }

    onFailedSubmit(err) {
        let { errors } = this.state;
        errors.record(err);

        this.setState({
            errors,
            isLoading: false
        });
    }

    render () {
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Supplier</Form.Label>

                    <Form.Control
                        type="text"
                        name="company.name"
                        value={this.state.form.company.name || ''}
                        onChange={this.onChange}
                        isInvalid={this.state.errors.has('company.name')}
                    />

                    <Form.Control.Feedback type="invalid">
                        {this.state.errors.get('company.name')}
                    </Form.Control.Feedback>
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
                        value={this.state.form.subtotal || ''}
                        min="0"
                        max="999999999.99"
                        step="0.01"
                        onChange={this.onChange}
                        isInvalid={this.state.errors.has('subtotal')}
                    />

                    <Form.Control.Feedback type="invalid">
                        {this.state.errors.get('subtotal')}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>TPS</Form.Label>
                    
                    <Form.Control
                        type="number"
                        name="tps"
                        value={this.state.form.tps || ''}
                        min="0"
                        max="999999999.99"
                        step="0.01"
                        onChange={this.onChange}
                        isInvalid={this.state.errors.has('tps')}
                    />

                    <Form.Control.Feedback type="invalid">
                        {this.state.errors.get('tps')}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>TVQ</Form.Label>
                    
                    <Form.Control
                        type="number"
                        name="tvq"
                        value={this.state.form.tvq || ''}
                        min="0"
                        max="999999999.99"
                        step="0.01"
                        onChange={this.onChange}
                        isInvalid={this.state.errors.has('tvq')}
                    />

                    <Form.Control.Feedback type="invalid">
                        {this.state.errors.get('tvq')}
                    </Form.Control.Feedback>
                </Form.Group>

                <Form.Group>
                    <Form.Label>Payment method</Form.Label>

                    <PaymentMethodSelector
                        name="payment_method_id"
                        value={this.state.form.payment_method_id}
                        onChange={this.onChange}
                    />
                </Form.Group>

                <Button
                    variant="primary"
                    onClick={this.onSubmit}
                    disabled={! this.isEnabled()}
                >
                    Submit
                </Button>
            </Form>
        );
    }
};

export default EditTransactionForm;