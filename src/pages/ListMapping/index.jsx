import React, { Component } from "react";
import Axios from "axios";

import ListMapping from "../../components/ListMapping";

import {
  setAs400Screen,
  setAs400Style,
  getAS400Cursor,
  setAS400Cursor,
  getIndexByRowCol,
  setSelectionRange,
  getStartSelection,
  getEndSelection
} from "../../components/Emulator/controler";

const data = {
  HEADER: {
    tokenId: "EWI112233445566",
    requestId: "ABC123456789",
    deviceId: "UUID9988776655"
  },
  DATA: {
    screen: { rows: 24, cols: 80 },
    Text:
      "                                   Sign On                                      \n                                               System  . . . . . :   S101CD3M   \n                                               Subsystem . . . . :   QINTER     \n                                               Display . . . . . :   QPADEV003R \n                                                                                \n                User  . . . . . . . . . . . . . .                               \n                Password  . . . . . . . . . . . .                               \n                Program/procedure . . . . . . . .                               \n                Menu  . . . . . . . . . . . . . .                               \n                Current library . . . . . . . . .                               \n                                                                                \n                                                                                \n                                                                                \n                                                                                \n                                                                                \n                                                                                \n                                                                                \n                                                                                \n                                                                                \n                                                                                \n                                                                                \n                                                                                \n                                                                                \n                                        (C) COPYRIGHT IBM CORP. 1980, 2005.     ",
    Style:
      ".................................RRRRRRRRRRRRR..................................\n................................................................................\n................................................................................\n................................................................................\n................................................................................\n.........................................................UUUUUUUUUU.............\n.........................................................HHHHHHHHHH.............\n.........................................................UUUUUUUUUU.............\n.........................................................UUUUUUUUUU.............\n.........................................................UUUUUUUUUU.............\n................................................................................\n................................................................................\n................................................................................\n................................................................................\n................................................................................\n................................................................................\n................................................................................\n................................................................................\n................................................................................\n................................................................................\n................................................................................\n................................................................................\n................................................................................\n................................................................................",
    Cursor: "5,53"
  }
};

const id = "flow4";
const { rows, cols } = data.DATA.screen;
const { Text: text, Style: style, Cursor: cursor } = data.DATA;
const highlightList = {
  mark1: { text: "          ", row: 6, col: 58 }
};

const onDblClickHandler = event => {
  // console.log(`| ========== ${event.type} ========== |`);
  let eventKey = event.key;
  if (event.keyCode >= 8 && event.keyCode < 48) {
    eventKey = `[' + ${eventKey.toLowerCase()} + ']`;
  }
  const selected = getStartSelection(id, cols);
  const dataForApi = {
    HEADER: {
      tokenId: "EWI112233445566",
      requestId: "ABC123456789",
      deviceId: "UUID9988776655"
      // requestCount: this.resultCount
    },
    DATA: {
      Event: "SELECTION",
      KeyValue: eventKey,
      Cursor: `${selected.row},${selected.col}`
    }
  };

  Axios({
    method: "post",
    url: "http://localhost:8085/emulator",
    data: JSON.stringify(dataForApi),
    headers: { "Content-Type": "application/json" }
  })
    .then(response => {
      // handle success
      const data = response.data.DATA;

      setAs400Screen(id, data.Text);
      setAs400Style(id, data.Text, data.Style);
      setAS400Cursor(id, data.Cursor);

      // clearAllMarkChackString(id);

      const fields = data.Fields;
      let selection = null;

      const index = getAS400Cursor(data.Cursor);
      fields.forEach(f => {
        if (Math.abs(f.EndRow - f.StartRow) === 0) {
          if (
            index.col >= f.StartCol &&
            index.col <= f.EndCol &&
            f.StartRow === index.row
          ) {
            selection = f;
          }
        }
      });

      const selectionStart = getIndexByRowCol(
        selection.StartRow,
        selection.StartCol
      );
      const selectionEnd = getIndexByRowCol(selection.EndRow, selection.EndCol);

      setSelectionRange(id, selectionStart, selectionEnd);
    })
    .catch(response => {
      // handle error
      console.log(`response: ${response}`);
    });
};

const onMouseUpHandler = event => {
  // console.log(`| ========== ${event.type} ========== | `);
  if (event.keyCode === 9 || (event.keyCode > 111 && event.keyCode !== 123)) {
    event.preventDefault();
  }

  let eventKey = event.key;
  const selected = getStartSelection(id, cols);
  if (event.keyCode >= 8 && event.keyCode < 48) {
    eventKey = `[' + ${eventKey.toLowerCase()} + ']`;
  }
  const dataForApi = {
    HEADER: {
      tokenId: "EWI112233445566",
      requestId: "ABC123456789",
      deviceId: "UUID9988776655"
      // requestCount: this.resultCount
    },
    DATA: {
      Event: "KEYDOWN",
      KeyValue: eventKey,
      Cursor: `${selected.row},${selected.col}`
    }
  };

  Axios({
    method: "post",
    url: "http://localhost:8085/emulator",
    data: JSON.stringify(dataForApi),
    headers: { "Content-Type": "application/json" }
  })
    .then(response => {
      // console.log(`| ========== ${event.type} ========== | `);
      const startSelection = getStartSelection(id, cols);
      const endSelection = getEndSelection(id, cols);

      const selectionStart = getIndexByRowCol(startSelection.row, 0) + 2;
      const selectionEnd = getIndexByRowCol(endSelection.row, cols) + 2;

      setSelectionRange(id, selectionStart, selectionEnd);
    })
    .catch(response => {
      // handle error
      console.log(`response: ${response}`);
    });
};

class ListMappingPage extends Component {
  constructor(props) {
    super(props);

    this.smRef = React.createRef();
  }

  render() {
    return (
      <div>
        <ListMapping
          id={id}
          ref={this.smRef}
          rows={rows}
          cols={cols}
          text={text}
          style={style}
          cursor={cursor}
          highlight={highlightList}
          onDoubleClick={onDblClickHandler}
          onMouseUp={onMouseUpHandler}
        />

        <button
          onClick={() => {
            console.log(this.smRef.current.getListHighlight());
          }}
        >
          get list marker
        </button>
        <button
          onClick={() => {
            this.smRef.current.clearListHighlight();
          }}
        >
          clear list marker
        </button>
        {/* 
        <button
          onClick={() => {
            const highlight = this.smRef.current.getLastSelection();
            this.smRef.current.setFieldHighlight(highlight);
          }}
        >
          mark list
        </button> */}

        <button
          onClick={() => {
            console.log(this.smRef.current.getFieldHighlight());
          }}
        >
          get field marker
        </button>
        <button
          onClick={() => {
            this.smRef.current.clearFieldHighlight();
          }}
        >
          clear field marker
        </button>
      </div>
    );
  }
}
export default ListMappingPage;
