import React from "react";
import Content from "./content";

class MainPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      user: "",
      password: "",
      name: ""
    };
  }

  componentDidMount() {
    this.userEl.addEventListener("usgChange", ev => {
      this.handleUsernameInput(ev);
    });
    this.passEl.addEventListener("usgChange", ev => {
      this.handlePasswordInput(ev);
    });

    this.createUsers()
  }

  createUsers() {
    console.log('creating users')
    const users = [
      {
        userName: "rafael11l",
        password: "password",
        name: "Rafael",
        id: "1234"
      },
      {
        userName: "adrian11s",
        password: "password",
        name: "Adrian",
        id: "1234"
      },
      {
        userName: "migu11elc",
        password: "password",
        name: "Miguel",
        id: "1234"
      },
      {
        userName: "maha11mb",
        password: "password",
        name: "Maham",
        id: "1234"
      }
    ];

    users.map(body => {
      fetch("/api/user", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      }).then(res => {
        console.log('created', JSON.parse(res))
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

  handleSubmit() {
    if (this.state.user.length > 3) {
      if (this.state.password === "password") {
        this.setState({
          authenticated: true
        });
      }
    }
  }

  render() {
    if (this.state.authenticated) {
      return (
        <div>
          <usg-nav-header
            heading={`Hello, ${this.state.name}`}
          ></usg-nav-header>
          <Content></Content>
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
