require('./bootstrap');

import 'bootstrap/dist/css/bootstrap.min.css';

import React from 'react';
import ReactDOM from 'react-dom';
// import Hello from '@/components/Hello';
import Header from '@/components/partials/Header';

ReactDOM.render(
    <Header />,
    document.getElementById("app")
);