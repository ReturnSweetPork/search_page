import React, { Component } from 'react';
import spid from '../Meta/spid.json';
import season from '../Meta/season.json';

class Trade_buy extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: []
		};
		this.getData = this.getData.bind(this);
		this.getData();
	}
	getData_season() {
		fetch();
	}

	getData() {
		this.setState({ list: [] });
		// console.log(this.props.match.params);
		fetch(
			`https://api.nexon.co.kr/fifaonline4/v1.0/users/${this.props.match.params
				.useraccid}/markets?tradetype=buy&offset=0&limit=100`,
			{
				method: 'GET',
				headers: {
					Authorization:
						' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiMTg3OTIxMzU2NCIsImF1dGhfaWQiOiIyIiwidG9rZW5fdHlwZSI6IkFjY2Vzc1Rva2VuIiwic2VydmljZV9pZCI6IjQzMDAxMTQ4MSIsIlgtQXBwLVJhdGUtTGltaXQiOiIyMDAwMDoxMCIsIm5iZiI6MTU3MDc3MjYzNywiZXhwIjoxNjMzODQ0NjM3LCJpYXQiOjE1NzA3NzI2Mzd9.pSODOaopKcLelGCbadalS5EM_SGy0Ul_12KYy-u5RR0',
					'Content-Type': 'application/json'
				}
			}
		)
			.then((response) => response.json())
			.then((responseData) => {
				const buyList = [];
				for (var i = 0; i < responseData.length; i++) {
					// console.log(jsonData.data.list[i].title);
					buyList.push(responseData[i]);
				}
				// console.log(EventList_ing);
				// console.log(buyList);
				return buyList;
			})
			.catch((error) => {
				console.log(error);
			})
			.then(
				function(buyList) {
					// const { list } = this.state;
					for (var i = 0; i < buyList.length; i++) {
						// console.log(EventList_ing[i]);
						// console.log(this.state.list);
						this.setState({
							list: this.state.list.concat({
								tradeDate: buyList[i].tradeDate,
								saleSn: buyList[i].saleSn,
								season: String(buyList[i].spid).substr(0, 3) * 1,
								spid: buyList[i].spid,
								grade: buyList[i].grade,
								value: buyList[i].value
							})
						});
					}
					console.log(this.state.list);
				}.bind(this)
			);
	}

	// componentDidMount() {
	// 	this.getData();
	// 	window.addEventListener('scroll', this.infiniteScroll);
	// }
	// componentWillUnmount() {
	// 	window.removeEventListener('scroll', this.infiniteScroll);
	// }

	render() {
		return (
			<div>
				{this.state.list.map((c) => {
					return (
						<div>
							<br />
							<div>거래날짜 : {c.tradeDate}</div>
							<div>거래 고유 식별자 : {c.saleSn}</div>

							{spid.map((d) => {
								if (d.id === c.spid) {
									return <div>선수 : {d.name}</div>;
								}
							})}
							{/* <div>선수 시즌 : {c.season}</div> */}
							{season.map((e) => {
								if (e.seasonId === c.season) {
									return (
										<div>
											<img src={e.seasonImg} alt="season" />
										</div>
									);
								}
							})}

							<div>거래 선수 강화 등급 : {c.grade}</div>
							<div>거래 선수 가치(BP) : {c.value}</div>
						</div>
					);
				})}
			</div>
		);
	}
}

export default Trade_buy;
