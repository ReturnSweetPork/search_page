import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from './Header';
class Search extends Component {
	constructor(props) {
		super(props);
		this.state = {
			accessId: '',
			nickname: '',
			level: '',
			division: '',
			division_day: '',
			division_manage: '',
			division_manage_day: ''
		};
		console.log(this.props.match.params.useraccid);
		this.getData_userIdLevel();
		this.getData_maxdivision();
	}
	//accid로 유저 아이디 닉네임 및 레벨 데이터 얻음
	getData_userIdLevel() {
		console.log(this.props.match.params);
		fetch(`https://api.nexon.co.kr/fifaonline4/v1.0/users/${this.props.match.params.useraccid}`, {
			method: 'GET',
			headers: {
				Authorization:
					' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiMTg3OTIxMzU2NCIsImF1dGhfaWQiOiIyIiwidG9rZW5fdHlwZSI6IkFjY2Vzc1Rva2VuIiwic2VydmljZV9pZCI6IjQzMDAxMTQ4MSIsIlgtQXBwLVJhdGUtTGltaXQiOiIyMDAwMDoxMCIsIm5iZiI6MTU3MDc3MjYzNywiZXhwIjoxNjMzODQ0NjM3LCJpYXQiOjE1NzA3NzI2Mzd9.pSODOaopKcLelGCbadalS5EM_SGy0Ul_12KYy-u5RR0',
				'Content-Type': 'application/json'
			}
		})
			.then((response) => response.json())
			.then((responseData) => {
				this.setState({
					accessId: responseData.accessId,
					nickname: responseData.nickname,
					level: responseData.level
				});
				console.log(responseData);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	//accid를 통해서 유저 최고 등급을 구해냄.
	getData_maxdivision() {
		fetch(`https://api.nexon.co.kr/fifaonline4/v1.0/users/${this.props.match.params.useraccid}/maxdivision`, {
			method: 'GET',
			headers: {
				Authorization:
					' eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiMTg3OTIxMzU2NCIsImF1dGhfaWQiOiIyIiwidG9rZW5fdHlwZSI6IkFjY2Vzc1Rva2VuIiwic2VydmljZV9pZCI6IjQzMDAxMTQ4MSIsIlgtQXBwLVJhdGUtTGltaXQiOiIyMDAwMDoxMCIsIm5iZiI6MTU3MDc3MjYzNywiZXhwIjoxNjMzODQ0NjM3LCJpYXQiOjE1NzA3NzI2Mzd9.pSODOaopKcLelGCbadalS5EM_SGy0Ul_12KYy-u5RR0',
				'Content-Type': 'application/json'
			}
		})
			.then((response) => response.json())
			.then((responseData) => {
				this.setState({
					division: responseData[0].division,
					division_day: responseData[0].achievementDate,
					division_manage: responseData[1].division,
					division_manage_day: responseData[1].achievementDate
				});
				console.log(responseData);
			})
			.catch((error) => {
				console.log(error);
			});
	}

	render() {
		return (
			<div>
				<Header accessId={this.state.accessId} />
				<div>{this.state.accessId}</div>

				<div>{this.state.nickname}</div>

				<div>{this.state.division}</div>

				<div>{this.state.division_day}</div>
				<div>{this.state.division_manage}</div>
				<div>{this.state.division_manage_day}</div>
			</div>
		);
	}
}

export default Search;
