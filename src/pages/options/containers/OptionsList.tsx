import * as React from "react";
import { Component } from "react";
import { connect } from "react-redux";
import ColorSelector from "../components/ColorSelector";
import CheckBox from "../components/CheckBox";
import NumberSelector from "../components/NumberSelector";
import { updateOptions } from "../../redux/actions";
import { IReduxStore, IUserOptions } from "../../interfaces";
import "../../../static/bootstrap.min.css";
import "./OptionsList.css";

interface IOptionsListProps {
  options: IUserOptions;
  updateOptions: (options: IUserOptions) => void;
}

class OptionsList extends Component<IOptionsListProps> {
  constructor(props: IOptionsListProps) {
    super(props);
  }

  onColorChange(key: string, color: string) {
    let options = this.props.options;
    options[key] = color;
    this.props.updateOptions(options);
  }

  onCheckBoxChange(key: string, value: boolean) {
    let options = this.props.options;
    options[key] = value;
    this.props.updateOptions(options);
  }

  onNumberSelectorChange(key: string, number: number) {
    let options = this.props.options;
    options[key] = number;
    this.props.updateOptions(options);
  }

  render() {
    return (
      <div className="container">
        <h1 className="title">
          Easy Clipboard Options <br />
          <span className="title-line"></span>
        </h1>
        <div className="options-grid">
          <CheckBox
            checked={this.props.options.autoCopy}
            label="Automatically add to Clipboard when using copying text (CTRL/CMD+C)"
            onChange={(value) => this.onCheckBoxChange("autoCopy", value)}
          />
          <NumberSelector
            lineCount={this.props.options.lineCount}
            label="Number of lines shown in preview for each stored copy"
            onChange={(lineCount) =>
              this.onNumberSelectorChange("lineCount", lineCount)
            }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: IReduxStore) => ({
  options: state.options,
});

const mapDispatchToProps = (dispatch: any) => ({
  updateOptions: (options: IUserOptions) => dispatch(updateOptions(options)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OptionsList);
