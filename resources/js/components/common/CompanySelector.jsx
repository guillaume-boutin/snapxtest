import React from 'react';
import Form from 'react-bootstrap/Form';

class CompanySelector extends React.Component {
    render () {
        return (
            <Form.Control
                as="select"
                value={this.props.value || ''}
                name={this.props.name}
                onChange={this.onChange}
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