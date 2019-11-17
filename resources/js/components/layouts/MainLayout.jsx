import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Header from '@/components/common/Header';
import Home from '@/components/pages/Home';
import Transactions from '@/components/pages/Transactions';

const MainLayout = ({component, ...rest}) => {
    return (
        <div id="main-layout">
            <Header />

            <Route {...rest} component={component} />
        </div>
    )
}

export default MainLayout;