import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./Search.css";
import Header from "./Header";
import division from "../Meta/devision.json";
class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      accessId: "",
      nickname: "",
      level: "",
      division: "",
      division_day: "",
      division_manage: "",
      division_manage_day: ""
    };
    console.log(window.sessionStorage.getItem("usercidx"));
    console.log("호두 아이디 나옴");
    this.getData_userIdLevel();
    this.getData_maxdivision();
  }
  //accid로 유저 아이디 닉네임 및 레벨 데이터 얻음
  getData_userIdLevel() {
    console.log(this.props.match.params);
    fetch(
      `https://api.nexon.co.kr/fifaonline4/v1.0/users/${this.props.match.params.useraccid}`,
      {
        method: "GET",
        headers: {
          Authorization:
            " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiMTg3OTIxMzU2NCIsImF1dGhfaWQiOiIyIiwidG9rZW5fdHlwZSI6IkFjY2Vzc1Rva2VuIiwic2VydmljZV9pZCI6IjQzMDAxMTQ4MSIsIlgtQXBwLVJhdGUtTGltaXQiOiIyMDAwMDoxMCIsIm5iZiI6MTU3MDc3MjYzNywiZXhwIjoxNjMzODQ0NjM3LCJpYXQiOjE1NzA3NzI2Mzd9.pSODOaopKcLelGCbadalS5EM_SGy0Ul_12KYy-u5RR0",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          accessId: responseData.accessId,
          nickname: responseData.nickname,
          level: responseData.level
        });
        // console.log(responseData);
      })
      .catch(error => {
        // console.log(error);
      });
  }

  //accid를 통해서 유저 최고 등급을 구해냄.
  getData_maxdivision() {
    fetch(
      `https://api.nexon.co.kr/fifaonline4/v1.0/users/${this.props.match.params.useraccid}/maxdivision`,
      {
        method: "GET",
        headers: {
          Authorization:
            " eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50X2lkIjoiMTg3OTIxMzU2NCIsImF1dGhfaWQiOiIyIiwidG9rZW5fdHlwZSI6IkFjY2Vzc1Rva2VuIiwic2VydmljZV9pZCI6IjQzMDAxMTQ4MSIsIlgtQXBwLVJhdGUtTGltaXQiOiIyMDAwMDoxMCIsIm5iZiI6MTU3MDc3MjYzNywiZXhwIjoxNjMzODQ0NjM3LCJpYXQiOjE1NzA3NzI2Mzd9.pSODOaopKcLelGCbadalS5EM_SGy0Ul_12KYy-u5RR0",
          "Content-Type": "application/json"
        }
      }
    )
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          division: responseData[0].division,
          division_day: responseData[0].achievementDate,
          division_manage: responseData[1].division,
          division_manage_day: responseData[1].achievementDate
        });
        // console.log(responseData);
      })
      .catch(error => {
        // console.log(error);
      });
  }

  render() {
    console.log(division);
    return (
      <div>
        <Header accessId={this.state.accessId} />
        <div className="Realid">
          내 아이디의 진짜 아이디 : {this.state.accessId}
        </div>

        <div>내 닉네임 : {this.state.nickname}</div>

        {division.map(c => {
          if (c.divisionId === this.state.division) {
            return <div>1:1모드 최고 점수 : {c.divisionName}</div>;
          }
        })}
        <div>최고점수를 달성한날 : {this.state.division_day}</div>
        {division.map(c => {
          if (c.divisionId === this.state.division_manage) {
            return <div>감독모드 최고 점수 : {c.divisionName}</div>;
          }
        })}
        <div>
          감독모드 최고 점수를 달성한날 : {this.state.division_manage_day}
        </div>
      </div>
    );
  }
}

export default Search;
// if (c.divisionID === this.state.division) {
// 	return <div>최고점수 : {c.divisionName}</div>;
// } else {
// 	return <div>왜 안나오냥..</div>;
// }
