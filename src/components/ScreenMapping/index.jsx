import React from "react";
import PropTypes from "prop-types";
import $ from "jquery";

import Emulator from "../Emulator/index";
import EmulatorView from "../Emulator/EmulatorView";

import {
  getIndexByRowCol,
  getSelectionRange,
  setSelectionRange,
  getStartSelection,
  getEndSelection
} from "../Emulator/controler";

export class ScreenMapping extends Emulator {
  componentDidMount(...args) {
    super.componentDidMount.apply(this, args);

    this.markAllCheckString(this.props.highlight);

    const { onDoubleClick, onMouseUp } = this.props;

    this.onSelect();
    this.onKeyDown();
    this.onMouseUp(onMouseUp);
    this.onDoubleClick(onDoubleClick);
  }

  onMouseUp = callbackFn => {
    const { id } = this.state;
    const elScreen = $(`.${id}.as400-screen`);

    elScreen.mouseup(event => {
      // console.log(`| ========== ${event.type} ========== | `);
      callbackFn(event);
      this.clearAllMarkChackString(id);
    });
  };

  onKeyDown = () => {
    const { id, colSize } = this.state;
    const elScreen = $(`.${id}.as400-screen`);

    elScreen.keydown(event => {
      // console.log(`| ========== ${event.type} ========== |`);
      const startSelection = getStartSelection(id, colSize);
      const endSelection = getEndSelection(id, colSize);

      const flag = "field";
      // const flag = 'list';
      if (flag === "list") {
        const selectionStart = getIndexByRowCol(startSelection.row, 0) + 1;
        const selectionEnd = getIndexByRowCol(endSelection.row, colSize) + 2;

        setSelectionRange(id, selectionStart, selectionEnd);
      }
    });
  };

  onDoubleClick = callbackFn => {
    const { id } = this.state;
    const elScreen = $(`.${id}.as400-screen`);

    elScreen.dblclick(event => {
      // console.log(`| ========== ${event.type} ========== |`);
      callbackFn(event);
    });
  };

  onSelect = () => {
    const { id, colSize } = this.state;
    const elScreen = $(`.${id}.as400-screen`);

    elScreen.select(event => {
      // console.log(`| ========== ${event.type} ========== |`);
      const start = event.target.selectionStart;
      const end = event.target.selectionEnd;
      const startPosition = getStartSelection(id, colSize);

      this.setState({
        lastSelection: {
          text: getSelectionRange(id, start, end),
          row: startPosition.row,
          col: startPosition.col
        }
      });
    });
  };

  /**
   * ==================
   *  provide function
   * ==================
   */
  getHighlight = markType => {
    return this.state.markList[markType.replace("-", "")];
  };

  setHighlight = (markType, highlight) => {
    this.markStringChackString(markType, highlight);
  };

  clearHighlight = markType => {
    return this.clearMarkString(markType);
  };

  getHighlightList = () => {
    return this.state.markList;
  };

  setHighlightList = highlightList => {
    this.markAllCheckString(highlightList);
  };

  clearHighlightList = () => {
    this.clearAllMarkChackString(this.props.id);
  };

  getLastSelection = () => {
    return this.state.lastSelection;
  };

  render() {
    const { id, readOnly } = this.props;
    return <EmulatorView id={id} readOnly={readOnly} />;
  }

  // Set default props
  static defaultProps = {
    highlight: {}
  };
}

ScreenMapping.propTypes = {
  highlightList: PropTypes.object,
  onDoubleClick: PropTypes.func,
  onMouseUp: PropTypes.func
};

export default ScreenMapping;
