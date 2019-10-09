import { Card, List, Divider } from "antd";
import React from "react";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelected: false,
      currentSelected: {}
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

  renderSelected() {
    if (this.state.currentSelected) {
      return (
        <div>
          <div>{this.state.currentSelected.name}</div>
          <div>{this.state.currentSelected.desc}</div>
        </div>
      );
    } else {
      return <div></div>;
    }
  }

  render() {
    return (
      <div className="content">
        <Card title="Overview" style={{ width: "100%", marginBottom: 24 }}>
          <div style={{ display: "flex", justifyContent: "space-around" }}>
            <div>Hello</div>
            <Divider type="vertical" />
            <div>Hello</div>
            <Divider type="vertical" />
            <div>Hello</div>
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
          <div style={{ width: "100%", border: "1px solid black" }}>{this.renderSelected()}</div>
        </div>
      </div>
    );
  }
}

export default Content;
