import React from 'react';
import _range from 'lodash/range';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Form from 'react-bootstrap/Form';
import moment from 'moment';

class DatePicker extends React.Component {
    constructor (props) {
        super(props);

        this.computeState(props);

        this.onChange = this.onChange.bind(this);
    }

    computeState(props) {
        let value = props.value || null;
        const today = moment();

        if (! value) {
            value = today
        } else {
            value = moment(value, "YYYY-MM-DD");
        }

        this.state = {
            today,
            form: {
                year: value.year().toString(),
                month: this.stringify(value.month() + 1),
                day: this.stringify(value.date()),
            }
        }
    }

    days () {
        const maxDay = this.maxDateOfMonth(this.state.form.month)
        return _range(1, maxDay+1).map(day => this.stringify(day));
    }

    months () {
        return _range(1, 13).map(month => this.stringify(month));
    }

    years () {
        const currentYear = (this.state.today.year());
        return _range(currentYear, 1990, -1).map(year => year.toString());
    }

    maxDateOfMonth (month) {
        if (month == '02') return 28;

        if (['04', '06', '09', '11'].indexOf(month) > -1) return 30;

        return 31;
    }

    stringify (number) {
        let n = number.toString();
        if (n >= 10) return n;

        return '0' + n;
    }

    onChange (e) {
        let self = this;
        let form = this.state.form;
        form[e.target.name] = e.target.value;

        let maxDayOfMonth = this.maxDateOfMonth(form.month);
        form.day = form.day > maxDayOfMonth ? maxDayOfMonth.toString() : form.day;

        this.setState({ form }, self.emitChange());
    }

    emitChange () {
        const date = this.state.form.year + '-' + this.state.form.month + '-' + this.state.form.day;
        this.props.onChange(date);
    }

    render () {
        return (
            <Row>
                <Col>
                    <Form.Control
                        as="select"
                        name="year"
                        value={this.state.form.year}
                        onChange={this.onChange}
                    >
                        {this.years().map(y => <option key={y} value={y}>{y}</option>)}
                    </Form.Control>
                </Col>

                <Col>
                    <Form.Control
                        as="select"
                        name="month"
                        value={this.state.form.month}
                        onChange={this.onChange}
                    >
                        {this.months().map(m => <option key={m} value={m}>{m}</option>)}
                    </Form.Control>
                </Col>

                <Col>
                    <Form.Control
                        as="select"
                        name="day"
                        value={this.state.form.day}
                        onChange={this.onChange}
                    >
                        {this.days().map(d => <option key={d} value={d}>{d}</option>)}
                    </Form.Control>
                </Col>
            </Row>
        );
    }
};

export default DatePicker;