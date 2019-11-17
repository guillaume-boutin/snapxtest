import React from 'react';
import Form from 'react-bootstrap/Form';

class EditTransactionForm extends React.Component {
    render () {
        return (
            <Form>
                <Form.Group>
                    <Form.Label>Subtotal</Form.Label>

                    <Form.Control type="number" min="0" max="999999999" step="0.01" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>TPS</Form.Label>
                    
                    <Form.Control type="number" min="0" max="999999999" step="0.01" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>TVQ</Form.Label>
                    
                    <Form.Control type="number" min="0" max="999999999" step="0.01" />
                </Form.Group>

                <Form.Group>
                    <Form.Label>Payment method</Form.Label>
                    
                    <Form.Control as="select">
                        <option value="1">Cash</option>
                        <option value="1">CreditCard</option>
                        <option value="1">DebitCard</option>
                    </Form.Control>
                </Form.Group>
            </Form>
        );
    }
};

export default EditTransactionForm;