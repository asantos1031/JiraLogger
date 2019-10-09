import React from "react";
import Content from "./content";
import "babel-polyfill";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      user: "",
      password: "",
      name: "",
      token: ''
    };
  }

  componentDidMount() {
    this.userEl.addEventListener("usgChange", ev => {
      this.handleUsernameInput(ev);
    });
    this.passEl.addEventListener("usgChange", ev => {
      this.handlePasswordInput(ev);
    });

    this.createUsers();
  }

  createUsers() {
    console.log("creating users");
    const users = [
      {
        userName: "rafael_leal",
        password: "password",
        name: "Rafael",
      },
      {
        userName: "adrian_santos",
        password: "password",
        name: "Adrian",
      },
      {
        userName: "miguel_conde",
        password: "password",
        name: "Miguel",
      },
      {
        userName: "admin",
        password: "password",
        name: "Maham",
      }
    ];

    users.map(async body => {
      let res = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
      });
    });
  }

  handleUsernameInput(input) {
    this.setState({
      user: input.detail.value
    });
  }

  handlePasswordInput(input) {
    this.setState({
      password: input.detail.value
    });
  }

  async handleSubmit() {
    await this.authenticate();
    const res = await fetch("/api/user/" + this.state.user, {
      headers: {
        "x-access-token": this.state.token,
        "content-type": "application/json"
      }
    });

    const name = await res.json()
    this.setState({
      'name': name.name,
      notes: name.notes
    })

    if (res.status === 200) {
      this.setState({
        authenticated: true
      })
    }
  }

  async authenticate() {
    const authRes = await fetch("/api/authenticate", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        userName: this.state.user,
        password: this.state.password
      })
    });

    const token = await authRes.json();
    this.state.token = token.token;
  }

  render() {
    if (this.state.authenticated) {
      return (
        <div>
          <usg-nav-header
            heading={`Hello, ${this.state.name}`}
          ></usg-nav-header>
          <Content auth={this.state.token} user={this.state.user}></Content>
        </div>
      );
    } else {
      return (
        <div className="login">
          <usg-input-container style={{ width: 200 }} block>
            <usg-item>
              <usg-label position="floating">Username</usg-label>
              <usg-input
                ref={elem => (this.userEl = elem)}
                type="text"
              ></usg-input>
            </usg-item>
          </usg-input-container>
          <usg-input-container style={{ width: 200 }} block>
            <usg-item>
              <usg-label position="floating">Password</usg-label>
              <usg-input
                ref={elem => (this.passEl = elem)}
                type="password"
              ></usg-input>
            </usg-item>
          </usg-input-container>

          <usg-button
            onClick={() => {
              this.handleSubmit();
            }}
            style={{ marginLeft: 50 }}
          >
            Submit
          </usg-button>
        </div>
      );
    }
  }
}

export default MainPage;
