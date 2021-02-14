import React, { Component } from "react";

import UserService from "../services/user.service";
import { connect } from "react-redux";
class BoardUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: []
    };
  }

  componentDidMount() {
    const { user: currentUser } = this.props;
    console.log(currentUser.accessToken)
    UserService.getUserBoard().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container">
        <header className="jumbotron">
          <h3>Users List</h3>
        </header>
        <div>
          <table border="1" width="100%" className="styled-table">
            <thead>
              <tr>
                <td>UserId</td>
                <td>Name</td>
                <td>Email</td>
                <td>Password</td>
                <td>createdAt</td>
              </tr>
            </thead>
            <tbody>
              {this.state.content.map((person, index) => (
              <tr key={index}>
                <td>{person.id}</td>
                <td>{person.username}</td>
                <td>{person.email}</td>
                <td>{person.password.substring(0, 40)} ...{" "}</td>
                <td>{person.createdAt}</td>
              </tr>
              
              ))}
            </tbody>
          </table>
    
    </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  const { user } = state.auth;
  return {
    user,
  };
}

export default connect(mapStateToProps)(BoardUser);