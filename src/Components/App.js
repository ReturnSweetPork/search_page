import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Search from './Search';
import Main from './Main';
import './App.css';
import Trade_buy from './Trade_buy';
import Trade_sell from './Trade_sell';
import Match from './Match';

class App extends React.Component {
	render() {
		return (
			<Router>
				<Route exact path="/" component={Main} />
				<Route path="/search/:useraccid" component={Search} />
				<Route path="/search/trade_buy/:useraccid" component={Trade_buy} />
				<Route path="/search/trade_sell/:useraccid" component={Trade_sell} />
				<Route path="/search/match/:useraccid" component={Match} />
			</Router>
		);
	}
}

export default App;
