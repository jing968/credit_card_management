import React from 'react';
import ReactDOM from 'react-dom';
import Card_Form from './components/Card_Form';
import Card_Form_edit from './components/Card_Form_edit';
import Home from './components/Home';
import Error_page from './components/Error_page'
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";

ReactDOM.render(
  <Router>
    <Switch>
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route exact path='/updated' component={Home} />
      <Route exact path='/added' component={Home} />
      <Route exact path='/home' component={Home} />
      <Route exact path='/retry' component={Card_Form} />
      <Route path='/new' component={Card_Form} />
      <Route path='/edit=:id' component={Card_Form_edit} />
      <Route component={Error_page} />
    </Switch>
  </Router>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
