import React from 'react'
import { Route, Switch } from 'react-router-dom';
import Header from '@/components/partials/Header';
import Home from '@/components/pages/Home';
import Transactions from '@/components/pages/Transactions';

class MainLayout extends React.Component {
    render() {
        return (
            <div id="main-layout">
                <Header />

                <Switch>
                    <Route exact path="/" component={Home} />

                    <Route exact path="/transactions" component={Transactions} />
                </Switch>
            </div>
        )
    }
}

export default MainLayout;