import React from 'react';
import Routes from './Routes';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Aladin from '../Screens/Aladin';
import LionKing from '../Screens/Lion_king';
import SpiderMan from '../Screens/Spider_man';
import Search from './Search';
import Main from './Main';
import './App.css';
import Spider_man from '../Screens/Spider_man';

class App extends React.Component {
	render() {
		return (
			<Router>
				<Route exact path="/" component={Main} />
				<Route path="/search/:useraccid" component={Search} />
				<Route path="/search/trade_buy/:useraccid" component={Trade} />
			</Router>
		);
	}
}

export default App;
