import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import Hello from '@/components/Hello';
import MainLayout from '@/components/layouts/MainLayout';

class App extends React.Component {
    render() {
        return (
            <div id="app">
                <Switch>
                    <Route path="/" component={MainLayout}></Route>
                </Switch>
            </div>
        )
    }
}

export default App;