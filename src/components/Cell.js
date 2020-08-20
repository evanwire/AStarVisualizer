import React, { Component } from "react";
import "../App.css";

export default class Cell extends Component {
  render() {
    const {
      col,
      row,
      className,
    } = this.props;
    

    return (
      <div
        id={`cell-${row}-${col}`}
        className={'cell ' + className}
      ></div>
    );
  }
}