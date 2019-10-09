import { Card, List, Divider } from "antd";
import React from "react";
import "babel-polyfill";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      currentSelected: {},
      inputText: "",
      notes: []
    };
  }

  data = [
    { title: "something1", date: "00/00/0000" },
    { title: "something2", date: "00/00/0000" },
    { title: "something3", date: "00/00/0000" },
    { title: "something4", date: "00/00/0000" }
  ];

  setSelected(name, desc) {
    this.setState({
      currentSelected: {
        name: name,
        desc: desc
      }
    });
  }

  async getUsersNotes() {
    const res = await fetch("/api/user/" + this.props.user, {
      headers: {
        "x-access-token": this.props.auth,
        "content-type": "application/json"
      }
    });

    res.json().then(notes => this.setState({
      notes: notes.notes
    }));


  }

  componentWillMount() {
    this.getUsersNotes();
  }

  componentDidMount() {
    this.noteEl.addEventListener("usgChange", val => {
      this.handleTextInput(val.detail.value);
    });

    this.noteEl.addEventListener("keyup", async val => {
      await this.submitNoteHandler(val);
    });
  }

  async submitNoteHandler(val) {
    let res;
    if (val.code === "Enter") {
      res = await fetch("/api/user/" + this.props.user, {
        method: "PUT",
        headers: {
          "x-access-token": this.props.auth,
          "content-type": "application/json"
        },
        body: JSON.stringify({
          userName: this.props.user,
          notes: this.state.inputText
        })
      });

      await this.getUsersNotes()
      this.noteEl.value = ""
    }
  }

  renderSelected() {
    if (this.state.currentSelected !== {}) {
      return (
        <div style={{ border: "1px solid lightgrey", minHeight: 300 }}>
          <div>{this.state.currentSelected.name}</div>
          <div>{this.state.currentSelected.desc}</div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  handleTextInput(val) {
    this.setState({
      inputText: val
    });
  }

  render() {
    return (
      <div className="content">
        <Card title="Overview" style={{ width: "100%", marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>Total Stories: 0</div>
            <Divider style={{ height: "auto" }} type="vertical" />
            <div>Cycle Time: 0</div>
          </div>
        </Card>
        <div style={{ display: "flex" }}>
          <List
            size="large"
            header={<div>Stories</div>}
            bordered
            dataSource={this.data}
            renderItem={item => (
              <List.Item
                onClick={() => {
                  this.setSelected(item.title, item.date);
                }}
                style={{ display: "block" }}
              >
                <div> Title: {item.title}</div>
                <div> Date: {item.date}</div>
              </List.Item>
            )}
            style={{ width: "100%", maxHeight: "504px", overflowY: "scroll" }}
          />
          <div
            style={{
              width: "100%",
              paddingLeft: "16px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly"
            }}
          >
            <div>{this.renderSelected()}</div>
            <div
              style={{
                border: "1px solid lightgrey",
                minHeight: 300,
                marginTop: 16
              }}
            >
              <h2 style={{ textAlign: "center", textDecoration: "underline" }}>
                Notes
              </h2>
              <ul style={{maxHeight: 200, overflowY: 'scroll', borderBottom: '1px solid lightgrey'}}>
                {this.state.notes.map(note => {
                  return <li>{note}</li>;
                })}
              </ul>
              <usg-input-container
                style={{
                  width: "80%",
                  margin: "auto",
                  marginBottom: 16,
                  marginTop: "10%"
                }}
                block
              >
                <usg-item>
                  <usg-label position="floating">Label</usg-label>
                  <usg-input
                    ref={elem => (this.noteEl = elem)}
                    id="usg-input-test"
                  ></usg-input>
                </usg-item>
                <usg-input-assistive>
                  <usg-label position="floating" slot="left">
                    Enter your personal notes here
                  </usg-label>
                </usg-input-assistive>
              </usg-input-container>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Content;
