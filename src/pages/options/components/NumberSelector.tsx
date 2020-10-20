import * as React from "react";
import { Component } from "react";
import "./NumberSelector.css";

interface INumberSelectorProps {
  lineCount: number;
  label: string;
  onChange: (lineCount: number) => void;
}

class NumberSelector extends Component<INumberSelectorProps, any> {
  constructor(props: INumberSelectorProps) {
    super(props);

    this.state = {
      value: this.props.lineCount,
    };
  }

  changeInputValue = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    const btnText = event.currentTarget.innerHTML || undefined;

    if (btnText == "-" && this.state.value > 1) {
      this.setState({
        value: this.state.value - 1,
      });
      this.props.onChange(this.state.value - 1);
    } else if (btnText == "+") {
      this.setState({
        value: this.state.value + 1,
      });
      this.props.onChange(this.state.value + 1);
    }
  };

  render() {
    return (
      <React.Fragment>
        <span className="number-selector">
          <button className="decrease-btn" onClick={this.changeInputValue}>
            -
          </button>
          <input
            id="number-input"
            type="number"
            min="1"
            value={this.state.value}
          />
          <button className="increase-btn" onClick={this.changeInputValue}>
            +
          </button>
        </span>
        <h6 className="number-selector-text">{this.props.label}</h6>
      </React.Fragment>
    );
  }
}

export default NumberSelector;
