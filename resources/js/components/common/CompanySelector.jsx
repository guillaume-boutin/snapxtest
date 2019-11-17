import React from 'react';
import Form from 'react-bootstrap/Form';

class CompanySelector extends React.Component {
    allowEmpty () {
        return this.props.allowEmpty || false;
    }

    render () {
        return (
            <Form.Control
                as="select"
                value={this.props.value || '0'}
                name={this.props.name}
                onChange={this.props.onChange}
            >
                { this.allowEmpty() ? <option value={'0'}></option> : null }

                {this.props.companies.map(cmp =>
                    <option key={cmp.id} value={cmp.id}>{cmp.name}</option>
                )}
            </Form.Control>
        );
    }
};

export default CompanySelector;