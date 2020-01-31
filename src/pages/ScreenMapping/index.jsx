import React, { Component } from "react";
import Axios from "axios";

import ScreenMapping from "../../components/ScreenMapping";

import {
  setAs400Screen,
  setAs400Style,
  getAS400Cursor,
  setAS400Cursor,
  getIndexByRowCol,
  setSelectionRange,
  getStartSelection
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

const id = "flow2";
const { rows, cols } = data.DATA.screen;
const { Text: text, Style: style, Cursor: cursor } = data.DATA;
const highlightList = {
  mark1: {
    text: "Sign On",
    row: 1,
    col: 36
  },
  mark2: {
    text: "User",
    row: 6,
    col: 17
  },
  mark3: {
    text: "(C) COPYRIGHT IBM CORP. 1980, 2005.",
    row: 24,
    col: 41
  }
};

const MARK1 = "mark-1";
const MARK2 = "mark-2";
const MARK3 = "mark-3";

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
      // handle success
      const data = response.data.DATA;

      setAs400Screen(id, data.Text);
      setAs400Style(id, data.Text, data.Style);
      setAS400Cursor(id, data.Cursor);

      // this.clearAllMarkChackString(id);
    })
    .catch(response => {
      // handle error
      console.log(`response: ${response}`);
    });
};

class ScreenMappingPage extends Component {
  constructor(props) {
    super(props);

    this.smRef = React.createRef();
  }

  render() {
    return (
      <div>
        <ScreenMapping
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
          onClick={() => this.smRef.current.setHighlightList(highlightList)}
        >
          highlight list
        </button>
        <button
          onClick={() => {
            console.log(this.smRef.current.getHighlightList());
          }}
        >
          get mark list
        </button>
        <button onClick={() => this.smRef.current.clearHighlightList()}>
          clear mark list
        </button>
        <br />
        <button
          onClick={() => {
            const highlight = this.smRef.current.getLastSelection();
            this.smRef.current.setHighlight(MARK1, highlight);
          }}
        >
          mark 1
        </button>
        <button
          onClick={() => {
            console.log(this.smRef.current.getHighlight(MARK1));
          }}
        >
          get mark 1
        </button>
        <button
          onClick={() => {
            this.smRef.current.clearHighlight(MARK1);
          }}
        >
          clear mark 1
        </button>
        <br />
        <button
          onClick={() => {
            const highlight = this.smRef.current.getLastSelection();
            this.smRef.current.setHighlight(MARK2, highlight);
          }}
        >
          mark 2
        </button>
        <button
          onClick={() => {
            console.log(this.smRef.current.getHighlight(MARK2));
          }}
        >
          get mark 2
        </button>
        <button
          onClick={() => {
            this.smRef.current.clearHighlight(MARK2);
          }}
        >
          clear mark 2
        </button>
        <br />
        <button
          onClick={() => {
            const highlight = this.smRef.current.getLastSelection();
            this.smRef.current.setHighlight(MARK3, highlight);
          }}
        >
          mark 3
        </button>
        <button
          onClick={() => {
            console.log(this.smRef.current.getHighlight(MARK3));
          }}
        >
          get mark 3
        </button>
        <button
          onClick={() => {
            this.smRef.current.clearHighlight(MARK3);
          }}
        >
          clear mark 3
        </button>
      </div>
    );
  }
}
export default ScreenMappingPage;
