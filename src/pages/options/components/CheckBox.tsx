import * as React from "react";
import { Component } from "react";
import "./CheckBox.css";

interface ICheckBoxProps {
  checked: boolean;
  label: string;
  onChange: (value: boolean) => void;
}

class CheckBox extends Component<ICheckBoxProps> {
  constructor(props: ICheckBoxProps) {
    super(props);
  }

  render() {
    return (
      <React.Fragment>
        <label className="toggle">
          <input
            type="checkbox"
            checked={this.props.checked}
            onChange={(event) => this.props.onChange(event.target.checked)}
          />
          <span className="slider"></span>
        </label>
        <h6 className="toggle-text">{this.props.label}</h6>
      </React.Fragment>
    );
  }
}

export default CheckBox;
