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
      notes: [],
      stories: [],
      cycleTime: 0
    };
  }

  data = [
    {
      title: "something1",
      desc: "",
      startDate: "00/00/0000",
      endDate: "00/00/0000",
      link: ""
    },
    {
      title: "something2",
      desc: "",
      startDate: "00/00/0000",
      endDate: "00/00/0000",
      link: ""
    },
    {
      title: "something3",
      desc: "",
      startDate: "00/00/0000",
      endDate: "00/00/0000",
      link: ""
    },
    {
      title: "something4",
      desc: "",
      startDate: "00/00/0000",
      endDate: "00/00/0000",
      link: ""
    }
  ];

  setSelected(name, desc, link, start, end, id) {
    this.setState({
      currentSelected: {
        name: name,
        desc: desc,
        link: link,
        start: start,
        end: end,
        id: id
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

    res.json().then(notes =>
      this.setState({
        notes: notes.notes
      })
    );
  }

  componentWillMount() {
    this.getUsersNotes();
    this.getStories();
    this.getCycleTime();
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
          notes: `${
            this.state.inputText
          } :: timestamp: ${new Date().toLocaleString()}`
        })
      });

      await this.getUsersNotes();

      this.setState({
        inputText: ""
      });
      document.activeElement.blur();
    }
  }

  async getCycleTime() {
    const res = await fetch("/api/performance/" + this.props.user, {
      method: "GET",
      headers: {
        "x-access-token": this.props.auth
      }
    });

    const time = await res.json();
    this.setState({ cycleTime: Number(time.avgCycle).toFixed(2) });
  }

  getStories = async () => {
    const res = await fetch("/api/story/" + this.props.user, {
      method: "GET",
      headers: {
        "x-access-token": this.props.auth
      }
    });

    const stories = await res.json();
    this.setState({
      stories: stories
    });

    console.log(stories);
  };

  renderSelected() {
    if (this.state.currentSelected !== {}) {
      return (
        <div
          style={{
            border: "1px solid lightgrey",
            minHeight: 300,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-around"
          }}
        >
          {this.state.currentSelected.id == null ? (
            ""
          ) : (
            <div>
              Title:{" "}
              <a target="_blank" href={this.state.currentSelected.link}>
                <strong>
                  {this.state.currentSelected.id} -
                  {this.state.currentSelected.name}
                </strong>{" "}
              </a>
            </div>
          )}

          {this.state.currentSelected.desc == null ? (
            ""
          ) : (
            <div>Description: {this.state.currentSelected.desc}</div>
          )}
          {this.state.currentSelected.start == null ? (
            ""
          ) : (
            <div>Start Date: {this.state.currentSelected.start}</div>
          )}

          {this.state.currentSelected.id == null ? (
            ""
          ) : (
            <div>
              End Date: {this.state.currentSelected.end}{" "}
              {this.state.currentSelected.end == null ? "In Progress" : ""}
            </div>
          )}

          {this.state.currentSelected.start &&
          this.state.currentSelected.end ? (
            <div>
              Story Cycle Time:{" "}
              {Number(
                (Date.parse(this.state.currentSelected.end) -
                  Date.parse(this.state.currentSelected.start)) /
                  (3600000 * 24)
              ).toFixed(2)}{" "}
              Days
            </div>
          ) : null}
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

  refreshStories = async () => {
    await fetch("/api/user/refresh/" + this.props.user, {
      method: "GET",
      headers: {
        "x-access-token": this.props.auth
      }
    });

    this.getStories();
  };

  render() {
    return (
      <div className="content">
        <usg-button onClick={this.refreshStories} class="icon-button" icon-only>
          {" "}
          <i className="material-icons">refresh</i>
        </usg-button>
        <Card
          title="Overview"
          style={{ width: "100%", marginBottom: 24, textAlign: "center" }}
        >
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div style={{ fontSize: 24 }}>
              <strong>Total Stories: {this.state.stories.length}</strong>
            </div>
            <Divider style={{ height: "auto" }} type="vertical" />
            <div style={{ fontSize: 24 }}>
              {" "}
              <strong>
                {" "}
                Average Cycle Time: {`${this.state.cycleTime} Days`}
              </strong>
            </div>
          </div>
        </Card>
        <div style={{ display: "flex" }}>
          <List
            size="large"
            header={
              <div style={{ fontSize: 16 }}>
                <strong>Stories</strong>
              </div>
            }
            bordered
            dataSource={this.state.stories}
            renderItem={story => (
              <List.Item
                onClick={() => {
                  this.setSelected(
                    story.name,
                    story.description,
                    story.link,
                    story.startDate,
                    story.endDate,
                    story.jiraID
                  );
                }}
                style={{ display: "block", cursor: "pointer" }}
              >
                <div style={{fontSize: 16}}>
                  {" "}
                  <strong>Title:</strong> {story.name}
                </div>
                <div style={{fontSize: 12}}>
                  {" "}
                  <strong>Description: </strong> {story.description}{" "}
                </div>
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
              <ul
                style={{
                  maxHeight: 200,
                  overflowY: "scroll",
                  borderBottom: "1px solid lightgrey",
                  paddingBottom: "16px"
                }}
              >
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
                  <usg-textarea
                    ref={elem => (this.noteEl = elem)}
                    id="usg-input-test"
                    value={this.state.inputText}
                  ></usg-textarea>
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
