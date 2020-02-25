import React, { Component } from 'react';
import spid from '../Meta/spid.json';
import season from '../Meta/season.json';

class Trade_sell extends Component {
	constructor(props) {
		super(props);
		this.state = {
			list: []
		};
		this.getData();
	}

	getData() {
		// console.log(this.props.match.params);
		fetch(
			`https://api.nexon.co.kr/fifaonline4/v1.0/users/${this.props.match.params
				.useraccid}/markets?tradetype=sell&offset=$0&limit=100`,
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
				const sellList = [];
				for (var i = 0; i < responseData.length; i++) {
					// console.log(jsonData.data.list[i].title);
					sellList.push(responseData[i]);
				}
				// console.log(EventList_ing);
				// console.log(buyList);
				return sellList;
			})
			.catch((error) => {
				console.log(error);
			})
			.then(
				function(sellList) {
					// const { list } = this.state;
					for (var i = 0; i < sellList.length; i++) {
						// console.log(EventList_ing[i]);
						// console.log(this.state.list);
						this.setState({
							list: this.state.list.concat({
								tradeDate: sellList[i].tradeDate,
								saleSn: sellList[i].saleSn,
								season: String(sellList[i].spid).substr(0, 3) * 1,
								spid: sellList[i].spid,
								grade: sellList[i].grade,
								value: sellList[i].value
							})
						});
					}
				}.bind(this)
			);
	}

	// infiniteScroll() {
	// 	let scrollHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight);
	// 	let scrollTop = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
	// 	let clientHeight = document.documentElement.clientHeight;

	// 	if (scrollTop + clientHeight === scrollHeight) {
	// 		this.setState({
	// 			offset: this.state.offset + 1
	// 		});
	// 		console.log(this.state.offset);
	// 		this.getData();
	// 	}
	// 	// } else {
	// 	// 	event.stopImmediatePropagation();
	// 	// }
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

export default Trade_sell;
