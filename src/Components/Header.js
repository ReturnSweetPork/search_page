import React from 'react';
import { Link } from 'react-router-dom';
class Header extends React.Component {
	constructor(props) {
		super(props);

		console.log(this.props);
	}
	render() {
		return (
			<div>
				{this.props.accessId}
				<ul>
					<li>
						<Link to={'trade_buy/' + this.props.accessId}>거래내역보기(구매)</Link>
					</li>
					<li>
						<Link to="/search/trade_sell/:useraccid">거래내역보기(판매)</Link>
					</li>
					<li>
						<Link to="/search/match/:useraccid">매치기록보기</Link>
					</li>
				</ul>
			</div>
		);
	}
}

export default Header;
