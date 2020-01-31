import React, { Component } from "react";
import Emulator from "../../components/Emulator";

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

const id = "flow";
const { rows, cols } = data.DATA.screen;
const { Text: text, Style: style, Cursor: cursor } = data.DATA;

class DemoEmulator extends Component {
  render() {
    return (
      <Emulator
        id={id}
        rows={rows}
        cols={cols}
        text={text}
        style={style}
        cursor={cursor}
        // readOnly
      />
    );
  }
}
export default DemoEmulator;
