import React, { Component } from "react";
import { BrowserRouter as Router } from "react-router-dom";
class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      usercidx: ""
    };
    this.setState = this.setState.bind(this);
  }

  handleChange = event => {
    this.setState({ username: event.target.value });
  };

  handleClick() {
    fetch(
      `https://api.nexon.co.kr/fifaonline4/v1.0/users?nickname=${this.state.username}`,
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
        this.setState({ usercidx: responseData.accessId });
        window.sessionStorage.setItem("usercidx", this.state.usercidx);
        this.props.history.push(`/search/${this.state.usercidx}`);
        console.log(this.state);
      })
      .catch(error => {
        console.log(error);
      });
  }
  render() {
    return (
      <div>
        <input
          type="text"
          name="username"
          placeholder="아이디를 입력하여 주세요"
          value={this.state.username}
          onChange={this.handleChange}
        />
        <button
          className="btn"
          onClick={() => {
            this.handleClick();
          }}
          type="submit"
          value="submit"
        >
          조회하기
        </button>
        {/* <ul>
                <li>
                <Link to='/search'>서치하러가자</Link>
                </li>
               
            </ul> */}
      </div>
    );
  }
}

export default Main;
