import React from "react";
import PropTypes from "prop-types";
import $ from "jquery";

import Emulator from "../Emulator/index";
import EmulatorView from "../EmulatorView";

import { getSelectionRange, getStartSelection } from "../Emulator/controler";

const MARK_1 = "mark-1";
const MARK_3 = "mark-3";

export class ListMapping extends Emulator {
  componentDidMount(...args) {
    super.componentDidMount.apply(this, args);

    this.markAllCheckString(this.props.highlight);

    const { onDoubleClick, onMouseUp } = this.props;

    this.onSelect();
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

      const data = {
        text: getSelectionRange(id, start, end),
        row: startPosition.row,
        col: startPosition.col
      };

      this.setState({
        lastSelection: {
          text: getSelectionRange(id, start, end),
          row: startPosition.row,
          col: startPosition.col
        }
      });

      if (data.text.length < colSize) {
        this.markStringChackString(MARK_3, data);
      } else if (data.col === 1 && data.text.length >= colSize) {
        this.markStringChackString(MARK_1, data);
      }
    });
  };

  /**
   * ==================
   *  provide function
   * ==================
   */
  getListHighlight = () => {
    const markType = MARK_1;
    return this.state.markList[markType.replace("-", "")];
  };

  setListHighlight = highlight => {
    this.markStringChackString(MARK_1, highlight);
  };

  clearListHighlight = () => {
    return this.clearMarkString(MARK_1);
  };

  getFieldHighlight = () => {
    return this.state.markList[MARK_3.replace("-", "")];
  };

  setFieldHighlight = highlight => {
    this.markStringChackString(MARK_3, highlight);
  };

  clearFieldHighlight = () => {
    return this.clearMarkString(MARK_3);
  };

  getLastSelection = () => {
    return this.state.lastSelection;
  };

  render() {
    const { id } = this.props;
    return <EmulatorView id={id} readOnly />;
  }

  // Set default props
  static defaultProps = {
    highlight: {}
  };
}

ListMapping.propTypes = {
  highlightList: PropTypes.object,
  onDoubleClick: PropTypes.func,
  onMouseUp: PropTypes.func
};

export default ListMapping;
