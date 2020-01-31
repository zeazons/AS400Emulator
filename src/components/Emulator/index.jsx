import React, { Component } from "react";
import PropTypes from "prop-types";
import $ from "jquery";

// import EmulatorView from "./EmulatorView";

import {
  initScreen,
  setAs400Screen,
  setAs400Style,
  setAS400Cursor,
  markAllCheckStringOnScreen,
  getHighlightDefault
} from "./controler";

import "./css/style.css";

class Emulator extends Component {
  constructor(props) {
    super(props);

    this.state = {
      id: props.id,
      markList: props.highlightList,
      lastSelection: {
        startIndex: 0,
        endIndex: 0
      },
      rowSize: props.rows,
      colSize: props.cols
    };
  }

  componentDidMount() {
    const { id, rows, cols, text, style, cursor } = this.props;

    initScreen(id, rows, cols);
    setAs400Screen(id, text);
    setAs400Style(id, text, style);
    setAS400Cursor(id, cursor);
  }

  markAllCheckString = markListData => {
    const { id } = this.state;
    this.clearAllMarkChackString(id);
    this.setState({
      markList: markListData
    });

    markAllCheckStringOnScreen(id, markListData);
  };

  clearAllMarkChackString = elStr => {
    const { rowSize, colSize } = this.state;
    const elHighlight = $(`.${elStr}.as400-highlight`);
    elHighlight.html(getHighlightDefault(rowSize, colSize));

    this.setState({
      markList: {}
    });
  };

  markStringChackString = (markType, highlight) => {
    let newMarkList = "";
    const markList = this.state.markList;

    newMarkList = {
      ...markList,
      [markType.replace("-", "")]: highlight
    };

    this.setState({ markList: newMarkList });
    this.markAllCheckString(newMarkList);
  };

  clearMarkString = markType => {
    let newMarkList = "";
    const markList = this.state.markList;
    const markData = {};

    newMarkList = {
      ...markList,
      [markType.replace("-", "")]: markData
    };

    this.setState({ markList: newMarkList });
    this.markAllCheckString(newMarkList);
  };

  render() {
    const { id, readOnly } = this.props;
    return <div>XXXXXXX</div>;
    // return <EmulatorView id={id} readOnly={readOnly} />;
  }

  // Set default props
  static defaultProps = {
    id: new Date().getTime(),
    rows: 24,
    cols: 80,
    text:
      "                                                                                \n                                                                            \n                                                                            \n                                                                            \n                                                                            \n================================================================================\n********************************************************************************\n================================================================================\n                                                                                \n  ######  ##       ##  ##    ##  ##      ########  ########  ########  #######  \n  ##      ###     ###  ##    ##  ##      ##    ##     ##     ##    ##  ##   ##  \n  ######  ####   ####  ##    ##  ##      ########     ##     ##    ##  #######  \n  ##      ## ## ## ##  ##    ##  ##      ##    ##     ##     ##    ##  ##  ##   \n  ######  ##  ###  ##  ########  ######  ##    ##     ##     ########  ##   ##  \n                                                                                \n================================================================================\n********************************************************************************\n================================================================================\n                                                                                \n                                                                                \n                                                                                \n                                                                                ",
    style:
      "................................................................................\n............................................................................\n............................................................................\n............................................................................\n............................................................................\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\n................................................................................\n  GGGGGG  GG       GG  GG    GG  GG      GGGGGGGG  GGGGGGGG  GGGGGGGG  GGGGGGG  \n  GG      GGG     GGG  GG    GG  GG      GG    GG     GG     GG    GG  GG   GG  \n  GGGGGG  GGGG   GGGG  GG    GG  GG      GGGGGGGG     GG     GG    GG  GGGGGGG  \n  GG      GG GG GG GG  GG    GG  GG      GG    GG     GG     GG    GG  GG  GG   \n  GGGGGG  GG  GGG  GG  GGGGGGGG  GGGGGG  GG    GG     GG     GGGGGGGG  GG   GG  \n................................................................................\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\n................................................................................\n................................................................................\n................................................................................\n.................................................................................",
    cursor: "0,0",
    readOnly: false
  };
}

Emulator.propTypes = {
  id: PropTypes.string,
  rows: PropTypes.number,
  cols: PropTypes.number,
  text: PropTypes.string,
  style: PropTypes.string,
  cursor: PropTypes.string,
  readOnly: PropTypes.bool
};

export default Emulator;
