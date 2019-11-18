import React from 'react';
import { Route, Switch } from 'react-router-dom';
// import Hello from '@/components/Hello';
import MainLayout from '@/components/layouts/MainLayout';
import Home from '@/components/pages/Home';
import TransactionIndex from '@/components/pages/Transaction/Index';
import TransactionShow from '@/components/pages/Transaction/Show';
import NotFound from '@/components/pages/NotFound';

class App extends React.Component {
    render() {
        return (
            <div id="app">
                <Switch>
                    <MainLayout exact path="/" component={Home} />

                    <MainLayout exact path="/transactions" component={TransactionIndex} />

                    <MainLayout path="/transactions/:id" component={TransactionShow} />

                    <Route path="/404" component={NotFound} />

                    <Route path="*" component={NotFound} />
                </Switch>
            </div>
        )
    }
}

export default App;