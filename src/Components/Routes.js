import React, { Component } from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom'
import Aladin from '../Screens/Aladin'
import LionKing from '../Screens/Lion_king'
import SpiderMan from '../Screens/Spider_man'
import Header from './Header'
class Routes extends Component {
	constructor(props) {
		super(props);
		this.state = {  };
	}
	render() {
		return (
			<Router>
				<Header />
				<Route path='/aladin' component={Aladin} />
				<Route path='/lionking' component={LionKing} />
				<Route path='/spiderman' component={SpiderMan} />

			</Router>
		);
	}
}

export default Routes;