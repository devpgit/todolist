import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import TodoList from './pages/todoList';
import login from './pages/login';

class App extends Component {
	render() {
		return (
			<BrowserRouter>
				<Switch>
					<Route path="/" exact component={login} />
					<Route path="/todolist" component={TodoList} />
				</Switch>
			</BrowserRouter>
		)
	}
}

export default App;
