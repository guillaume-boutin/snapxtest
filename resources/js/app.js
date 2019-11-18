require('./bootstrap');

import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
import App from '@/components/App';
import { Router, Route } from 'react-router-dom';
import history from '@/lib/history';

ReactDOM.render(
    <Router history={history}>
        <App />
    </Router>,
    document.getElementById("root")
);