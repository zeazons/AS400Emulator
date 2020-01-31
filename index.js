"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.markAllCheckStringOnScreen = exports.setAS400Cursor = exports.setAs400Style = exports.setAs400Screen = exports.initScreen = exports.getSelectionRange = exports.getEndSelection = exports.getStartSelection = exports.setIndexByRowCol = exports.getAS400Cursor = exports.setSelectionRange = exports.getIndexByRowCol = exports.getHighlightDefault = void 0;

var _jquery = _interopRequireDefault(require("jquery"));

var _lodash = _interopRequireDefault(require("lodash"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var getHighlightDefault = function getHighlightDefault(rowSize, colSize) {
  var textHighlight = "";

  for (var i = 0; i < rowSize; i += 1) {
    for (var j = 0; j < colSize; j += 1) {
      textHighlight += ".";
    }

    textHighlight += "\n";
  }

  return textHighlight;
};

exports.getHighlightDefault = getHighlightDefault;

var getIndexByRowCol = function getIndexByRowCol(row, colSize) {
  return (row - 1) * 80 + colSize + row - 2;
};

exports.getIndexByRowCol = getIndexByRowCol;

var setSelectionRange = function setSelectionRange(elStr, selectionStart, selectionEnd) {
  var elScreen = (0, _jquery["default"])(".".concat(elStr, ".as400-screen"))[0];
  var start = selectionStart;
  var end = selectionEnd;
  start -= 1;
  end -= 1; // elScreen.focus();

  if (elScreen.setSelectionRange) {
    elScreen.setSelectionRange(start, end);
  } else if (elScreen.createTextRange) {
    var range = elScreen.createTextRange();
    range.collapse(true);
    range.moveEnd("character", end);
    range.moveStart("character", start);
    range.select();
  }
}; // const clearHighlight = (elStr, markType) => {
//   const elHighlight = $(`.${elStr}.as400-highlight`);
//   let newHighlight = elHighlight.html();
//   newHighlight = newHighlight
//     .replace(`<as400-${markType}>`, "")
//     .replace(`</as400-${markType}>`, "");
//   elHighlight.html(newHighlight);
// };


exports.setSelectionRange = setSelectionRange;

var getAS400Cursor = function getAS400Cursor(posStr) {
  var posArr = posStr.split(",");
  return {
    row: parseInt(posArr[0]),
    col: parseInt(posArr[1])
  };
}; // const convertRowColNumber = posStr => {
//   const posArr = posStr.trim().split(",");
//   return {
//     row: posArr[0],
//     col: posArr[1]
//   };
// };


exports.getAS400Cursor = getAS400Cursor;

var getRowNumberByIndex = function getRowNumberByIndex(elStr, index) {
  var elScreen = (0, _jquery["default"])(".".concat(elStr, ".as400-screen"));
  return elScreen.val().substr(0, index).split("\n").length - 1;
};

var getColNumberByIndex = function getColNumberByIndex(elStr, index, colSize) {
  var row = getRowNumberByIndex(elStr, index);
  var col = (index - row) % colSize;

  if (index === colSize * (row + 1) + row) {
    return colSize;
  }

  return col;
};

var setIndexByRowCol = function setIndexByRowCol(elStr, row, col) {
  var index = getIndexByRowCol(row, col);
  setSelectionRange(elStr, index, index);
};

exports.setIndexByRowCol = setIndexByRowCol;

var getStartSelection = function getStartSelection(elStr, colSize) {
  var elScreen = (0, _jquery["default"])(".".concat(elStr, ".as400-screen"));
  var startIndex = elScreen.prop("selectionStart");
  var rowSelectionStartIndex = getRowNumberByIndex(elStr, startIndex) + 1;
  var colSelectionStartIndex = getColNumberByIndex(elStr, startIndex, colSize) + 1;
  return {
    row: rowSelectionStartIndex,
    col: colSelectionStartIndex
  };
};

exports.getStartSelection = getStartSelection;

var getEndSelection = function getEndSelection(elStr, colSize) {
  var elScreen = (0, _jquery["default"])(".".concat(elStr, ".as400-screen"));
  var endIndex = elScreen.prop("selectionEnd");
  var rowSelectionEndIndex = getRowNumberByIndex(elStr, endIndex) + 1;
  var colSelectionEndIndex = getColNumberByIndex(elStr, endIndex, colSize) + 1;
  return {
    row: rowSelectionEndIndex,
    col: colSelectionEndIndex
  };
};

exports.getEndSelection = getEndSelection;

var getSelectionRange = function getSelectionRange(elStr, selectionStart, selectionEnd) {
  var elScreen = (0, _jquery["default"])(".".concat(elStr, ".as400-screen"));

  if (selectionStart !== selectionEnd) {
    var selection = elScreen.val().substring(selectionStart, selectionEnd);
    return selection;
  }

  return "";
};

exports.getSelectionRange = getSelectionRange;

var initScreen = function initScreen(elStr, rowSize, colSize) {
  var elScreen = (0, _jquery["default"])(".".concat(elStr, ".as400-screen"));
  elScreen.attr("rows", rowSize);
  elScreen.attr("cols", colSize);
  var elScreenTemp = (0, _jquery["default"])(".".concat(elStr, ".as400-screen-temp"));
  elScreenTemp.attr("rows", rowSize);
  elScreenTemp.attr("cols", colSize);
  var elStyle = (0, _jquery["default"])(".".concat(elStr, ".as400-style"));
  elStyle.attr("rows", rowSize);
  elStyle.attr("cols", colSize);
  var elHighlight = (0, _jquery["default"])(".".concat(elStr, ".as400-highlight"));
  elHighlight.html(getHighlightDefault(rowSize, colSize));
};

exports.initScreen = initScreen;

var setAs400Screen = function setAs400Screen(elStr, data) {
  var elScreen = (0, _jquery["default"])(".".concat(elStr, ".as400-screen"));
  elScreen.val(data);
};

exports.setAs400Screen = setAs400Screen;

var setAs400Style = function setAs400Style(elStr, text, styleParams) {
  var elStyle = (0, _jquery["default"])(".".concat(elStr, ".as400-style"));
  var style = styleParams;
  var textStyle = "";

  for (var i = 0; i < text.length; i += 1) {
    var character = text[i];
    var styleCharacter = style[i];

    if (styleCharacter !== "." && !_jquery["default"].isEmptyObject(styleCharacter)) {
      textStyle += character.replace(character, "<as400-".concat(styleCharacter.toLowerCase(), "-style>$&</as400-").concat(styleCharacter.toLowerCase(), "-style>"));
    } else {
      textStyle += character;
    }
  }

  (0, _jquery["default"])(elStyle).html(textStyle);
};

exports.setAs400Style = setAs400Style;

var setAS400Cursor = function setAS400Cursor(elStr, data) {
  var pos = getAS400Cursor(data);
  var index = getIndexByRowCol(pos.row, pos.col);
  setSelectionRange(elStr, index, index);
};

exports.setAS400Cursor = setAS400Cursor;

var markAllCheckStringOnScreen = function markAllCheckStringOnScreen(id, markListData) {
  var elHighlight = (0, _jquery["default"])(".".concat(id, ".as400-highlight"));
  var text = elHighlight[0].innerHTML;
  var textHighlight = "";

  for (var i = 0; i < text.length; i += 1) {
    if (!_lodash["default"].isEmpty(markListData.mark1) && i === getIndexByRowCol(markListData.mark1.row, markListData.mark1.col)) {
      if (markListData.mark1.text.length < 2) {
        textHighlight += "<as400-mark-1>".concat(text[i], "</as400-mark-1>");
      } else {
        textHighlight += "<as400-mark-1>".concat(text[i]);
      }
    } else if (!_lodash["default"].isEmpty(markListData.mark1) && i === getIndexByRowCol(markListData.mark1.row, markListData.mark1.col) + markListData.mark1.text.length - 1) {
      textHighlight += "".concat(text[i], "</as400-mark-1>");
    } else if (!_lodash["default"].isEmpty(markListData.mark2) && i === getIndexByRowCol(markListData.mark2.row, markListData.mark2.col)) {
      if (markListData.mark2.text.length < 2) {
        textHighlight += "<as400-mark-2>".concat(text[i], "</as400-mark-2>");
      } else {
        textHighlight += "<as400-mark-2>".concat(text[i]);
      }
    } else if (!_lodash["default"].isEmpty(markListData.mark2) && i === getIndexByRowCol(markListData.mark2.row, markListData.mark2.col) + markListData.mark2.text.length - 1) {
      textHighlight += "".concat(text[i], "</as400-mark-2>");
    } else if (!_lodash["default"].isEmpty(markListData.mark3) && i === getIndexByRowCol(markListData.mark3.row, markListData.mark3.col)) {
      if (markListData.mark3.text.length < 2) {
        textHighlight += "<as400-mark-3>".concat(text[i], "</as400-mark-3>");
      } else {
        textHighlight += "<as400-mark-3>".concat(text[i]);
      }
    } else if (!_lodash["default"].isEmpty(markListData.mark3) && i === getIndexByRowCol(markListData.mark3.row, markListData.mark3.col) + markListData.mark3.text.length - 1) {
      textHighlight += "".concat(text[i], "</as400-mark-3>");
    } else {
      textHighlight += text[i];
    }
  }

  elHighlight.html(textHighlight);
};

exports.markAllCheckStringOnScreen = markAllCheckStringOnScreen;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jquery = _interopRequireDefault(require("jquery"));

var _EmulatorView = _interopRequireDefault(require("../EmulatorView"));

var _controler = require("./controler");

require("./css/style.css");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var Emulator =
/*#__PURE__*/
function (_Component) {
  _inherits(Emulator, _Component);

  function Emulator(props) {
    var _this;

    _classCallCheck(this, Emulator);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(Emulator).call(this, props));

    _defineProperty(_assertThisInitialized(_this), "markAllCheckString", function (markListData) {
      var id = _this.state.id;

      _this.clearAllMarkChackString(id);

      _this.setState({
        markList: markListData
      });

      (0, _controler.markAllCheckStringOnScreen)(id, markListData);
    });

    _defineProperty(_assertThisInitialized(_this), "clearAllMarkChackString", function (elStr) {
      var _this$state = _this.state,
          rowSize = _this$state.rowSize,
          colSize = _this$state.colSize;
      var elHighlight = (0, _jquery["default"])(".".concat(elStr, ".as400-highlight"));
      elHighlight.html((0, _controler.getHighlightDefault)(rowSize, colSize));

      _this.setState({
        markList: {}
      });
    });

    _defineProperty(_assertThisInitialized(_this), "markStringChackString", function (markType, highlight) {
      var newMarkList = "";
      var markList = _this.state.markList;
      newMarkList = _objectSpread({}, markList, _defineProperty({}, markType.replace("-", ""), highlight));

      _this.setState({
        markList: newMarkList
      });

      _this.markAllCheckString(newMarkList);
    });

    _defineProperty(_assertThisInitialized(_this), "clearMarkString", function (markType) {
      var newMarkList = "";
      var markList = _this.state.markList;
      var markData = {};
      newMarkList = _objectSpread({}, markList, _defineProperty({}, markType.replace("-", ""), markData));

      _this.setState({
        markList: newMarkList
      });

      _this.markAllCheckString(newMarkList);
    });

    _this.state = {
      id: props.id,
      markList: props.highlightList,
      lastSelection: {
        startIndex: 0,
        endIndex: 0
      },
      rowSize: props.rows,
      colSize: props.cols
    };
    return _this;
  }

  _createClass(Emulator, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      var _this$props = this.props,
          id = _this$props.id,
          rows = _this$props.rows,
          cols = _this$props.cols,
          text = _this$props.text,
          style = _this$props.style,
          cursor = _this$props.cursor;
      (0, _controler.initScreen)(id, rows, cols);
      (0, _controler.setAs400Screen)(id, text);
      (0, _controler.setAs400Style)(id, text, style);
      (0, _controler.setAS400Cursor)(id, cursor);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          id = _this$props2.id,
          readOnly = _this$props2.readOnly; // return <div>XXXXXXX</div>;

      return _react["default"].createElement(_EmulatorView["default"], {
        id: id,
        readOnly: readOnly
      });
    } // Set default props

  }]);

  return Emulator;
}(_react.Component);

_defineProperty(Emulator, "defaultProps", {
  id: new Date().getTime(),
  rows: 24,
  cols: 80,
  text: "                                                                                \n                                                                            \n                                                                            \n                                                                            \n                                                                            \n================================================================================\n********************************************************************************\n================================================================================\n                                                                                \n  ######  ##       ##  ##    ##  ##      ########  ########  ########  #######  \n  ##      ###     ###  ##    ##  ##      ##    ##     ##     ##    ##  ##   ##  \n  ######  ####   ####  ##    ##  ##      ########     ##     ##    ##  #######  \n  ##      ## ## ## ##  ##    ##  ##      ##    ##     ##     ##    ##  ##  ##   \n  ######  ##  ###  ##  ########  ######  ##    ##     ##     ########  ##   ##  \n                                                                                \n================================================================================\n********************************************************************************\n================================================================================\n                                                                                \n                                                                                \n                                                                                \n                                                                                ",
  style: "................................................................................\n............................................................................\n............................................................................\n............................................................................\n............................................................................\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\n................................................................................\n  GGGGGG  GG       GG  GG    GG  GG      GGGGGGGG  GGGGGGGG  GGGGGGGG  GGGGGGG  \n  GG      GGG     GGG  GG    GG  GG      GG    GG     GG     GG    GG  GG   GG  \n  GGGGGG  GGGG   GGGG  GG    GG  GG      GGGGGGGG     GG     GG    GG  GGGGGGG  \n  GG      GG GG GG GG  GG    GG  GG      GG    GG     GG     GG    GG  GG  GG   \n  GGGGGG  GG  GGG  GG  GGGGGGGG  GGGGGG  GG    GG     GG     GGGGGGGG  GG   GG  \n................................................................................\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\nGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG\n................................................................................\n................................................................................\n................................................................................\n.................................................................................",
  cursor: "0,0",
  readOnly: false
});

Emulator.propTypes = {
  id: _propTypes["default"].string,
  rows: _propTypes["default"].number,
  cols: _propTypes["default"].number,
  text: _propTypes["default"].string,
  style: _propTypes["default"].string,
  cursor: _propTypes["default"].string,
  readOnly: _propTypes["default"].bool
};
var _default = Emulator;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var EmulatorView =
/*#__PURE__*/
function (_Component) {
  _inherits(EmulatorView, _Component);

  function EmulatorView() {
    _classCallCheck(this, EmulatorView);

    return _possibleConstructorReturn(this, _getPrototypeOf(EmulatorView).apply(this, arguments));
  }

  _createClass(EmulatorView, [{
    key: "render",
    value: function render() {
      var _props = props,
          id = _props.id,
          readOnly = _props.readOnly;
      return _react["default"].createElement("div", {
        className: "as400-container"
      }, _react["default"].createElement("div", {
        className: "screen"
      }, _react["default"].createElement("div", {
        className: "".concat(id, " as400-highlight")
      }), _react["default"].createElement("div", {
        className: "".concat(id, " as400-style")
      }), _react["default"].createElement("textarea", {
        readOnly: readOnly ? readOnly : false,
        className: "".concat(id, " as400-screen")
      }), _react["default"].createElement("textarea", {
        readOnly: readOnly ? readOnly : false,
        className: "".concat(id, " as400-screen-temp")
      })));
    }
  }]);

  return EmulatorView;
}(_react.Component);

var _default = EmulatorView; // import React from "react";
// export default EmulatorView = props => {
//   const { id, readOnly } = props;
//   return (
//     <div className="as400-container">
//       <div className="screen">
//         <div className={`${id} as400-highlight`}></div>
//         <div className={`${id} as400-style`}></div>
//         <textarea
//           readOnly={readOnly ? readOnly : false}
//           className={`${id} as400-screen`}
//         ></textarea>
//         <textarea
//           readOnly={readOnly ? readOnly : false}
//           className={`${id} as400-screen-temp`}
//         ></textarea>
//       </div>
//     </div>
//   );
// };

exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.FieldsMapping = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jquery = _interopRequireDefault(require("jquery"));

var _index = _interopRequireDefault(require("../Emulator/index"));

var _EmulatorView = _interopRequireDefault(require("../Emulator/EmulatorView"));

var _controler = require("../Emulator/controler");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MARK_1 = "mark-1";

var FieldsMapping =
/*#__PURE__*/
function (_Emulator) {
  _inherits(FieldsMapping, _Emulator);

  function FieldsMapping() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, FieldsMapping);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(FieldsMapping)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onMouseUp", function (callbackFn) {
      var id = _this.state.id;
      var elScreen = (0, _jquery["default"])(".".concat(id, ".as400-screen"));
      elScreen.mouseup(function (event) {
        // console.log(`| ========== ${event.type} ========== | `);
        callbackFn(event);

        _this.clearAllMarkChackString(id);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onDoubleClick", function (callbackFn) {
      var id = _this.state.id;
      var elScreen = (0, _jquery["default"])(".".concat(id, ".as400-screen"));
      elScreen.dblclick(function (event) {
        // console.log(`| ========== ${event.type} ========== |`);
        callbackFn(event);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSelect", function () {
      var _this$state = _this.state,
          id = _this$state.id,
          colSize = _this$state.colSize;
      var elScreen = (0, _jquery["default"])(".".concat(id, ".as400-screen"));
      elScreen.select(function (event) {
        // console.log(`| ========== ${event.type} ========== |`);
        var start = event.target.selectionStart;
        var end = event.target.selectionEnd;
        var startPosition = (0, _controler.getStartSelection)(id, colSize);
        var data = {
          text: (0, _controler.getSelectionRange)(id, start, end),
          row: startPosition.row,
          col: startPosition.col
        };

        _this.setState({
          lastSelection: {
            text: (0, _controler.getSelectionRange)(id, start, end),
            row: startPosition.row,
            col: startPosition.col
          }
        });

        _this.markStringChackString(MARK_1, data);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getFieldHighlight", function () {
      return _this.state.markList[MARK_1.replace("-", "")];
    });

    _defineProperty(_assertThisInitialized(_this), "setFieldHighlight", function (highlight) {
      _this.markStringChackString(MARK_1, highlight);
    });

    _defineProperty(_assertThisInitialized(_this), "clearFieldHighlight", function () {
      return _this.clearMarkString(MARK_1);
    });

    _defineProperty(_assertThisInitialized(_this), "getLastSelection", function () {
      return _this.state.lastSelection;
    });

    return _this;
  }

  _createClass(FieldsMapping, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _get(_getPrototypeOf(FieldsMapping.prototype), "componentDidMount", this).apply(this, args);

      this.markAllCheckString(this.props.highlight);
      var _this$props = this.props,
          onDoubleClick = _this$props.onDoubleClick,
          onMouseUp = _this$props.onMouseUp;
      this.onSelect();
      this.onMouseUp(onMouseUp);
      this.onDoubleClick(onDoubleClick);
    }
  }, {
    key: "render",
    value: function render() {
      var id = this.props.id;
      return _react["default"].createElement(_EmulatorView["default"], {
        id: id,
        readOnly: true
      });
    } // Set default props

  }]);

  return FieldsMapping;
}(_index["default"]);

exports.FieldsMapping = FieldsMapping;

_defineProperty(FieldsMapping, "defaultProps", {
  highlight: {}
});

FieldsMapping.propTypes = {
  highlightList: _propTypes["default"].object,
  onDoubleClick: _propTypes["default"].func,
  onMouseUp: _propTypes["default"].func
};
var _default = FieldsMapping;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ListMapping = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jquery = _interopRequireDefault(require("jquery"));

var _index = _interopRequireDefault(require("../Emulator/index"));

var _EmulatorView = _interopRequireDefault(require("../Emulator/EmulatorView"));

var _controler = require("../Emulator/controler");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var MARK_1 = "mark-1";
var MARK_3 = "mark-3";

var ListMapping =
/*#__PURE__*/
function (_Emulator) {
  _inherits(ListMapping, _Emulator);

  function ListMapping() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ListMapping);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ListMapping)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onMouseUp", function (callbackFn) {
      var id = _this.state.id;
      var elScreen = (0, _jquery["default"])(".".concat(id, ".as400-screen"));
      elScreen.mouseup(function (event) {
        // console.log(`| ========== ${event.type} ========== | `);
        callbackFn(event);

        _this.clearAllMarkChackString(id);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onDoubleClick", function (callbackFn) {
      var id = _this.state.id;
      var elScreen = (0, _jquery["default"])(".".concat(id, ".as400-screen"));
      elScreen.dblclick(function (event) {
        // console.log(`| ========== ${event.type} ========== |`);
        callbackFn(event);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSelect", function () {
      var _this$state = _this.state,
          id = _this$state.id,
          colSize = _this$state.colSize;
      var elScreen = (0, _jquery["default"])(".".concat(id, ".as400-screen"));
      elScreen.select(function (event) {
        // console.log(`| ========== ${event.type} ========== |`);
        var start = event.target.selectionStart;
        var end = event.target.selectionEnd;
        var startPosition = (0, _controler.getStartSelection)(id, colSize);
        var data = {
          text: (0, _controler.getSelectionRange)(id, start, end),
          row: startPosition.row,
          col: startPosition.col
        };

        _this.setState({
          lastSelection: {
            text: (0, _controler.getSelectionRange)(id, start, end),
            row: startPosition.row,
            col: startPosition.col
          }
        });

        if (data.text.length < colSize) {
          _this.markStringChackString(MARK_3, data);
        } else if (data.col === 1 && data.text.length >= colSize) {
          _this.markStringChackString(MARK_1, data);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getListHighlight", function () {
      var markType = MARK_1;
      return _this.state.markList[markType.replace("-", "")];
    });

    _defineProperty(_assertThisInitialized(_this), "setListHighlight", function (highlight) {
      _this.markStringChackString(MARK_1, highlight);
    });

    _defineProperty(_assertThisInitialized(_this), "clearListHighlight", function () {
      return _this.clearMarkString(MARK_1);
    });

    _defineProperty(_assertThisInitialized(_this), "getFieldHighlight", function () {
      return _this.state.markList[MARK_3.replace("-", "")];
    });

    _defineProperty(_assertThisInitialized(_this), "setFieldHighlight", function (highlight) {
      _this.markStringChackString(MARK_3, highlight);
    });

    _defineProperty(_assertThisInitialized(_this), "clearFieldHighlight", function () {
      return _this.clearMarkString(MARK_3);
    });

    _defineProperty(_assertThisInitialized(_this), "getLastSelection", function () {
      return _this.state.lastSelection;
    });

    return _this;
  }

  _createClass(ListMapping, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _get(_getPrototypeOf(ListMapping.prototype), "componentDidMount", this).apply(this, args);

      this.markAllCheckString(this.props.highlight);
      var _this$props = this.props,
          onDoubleClick = _this$props.onDoubleClick,
          onMouseUp = _this$props.onMouseUp;
      this.onSelect();
      this.onMouseUp(onMouseUp);
      this.onDoubleClick(onDoubleClick);
    }
  }, {
    key: "render",
    value: function render() {
      var id = this.props.id;
      return _react["default"].createElement(_EmulatorView["default"], {
        id: id,
        readOnly: true
      });
    } // Set default props

  }]);

  return ListMapping;
}(_index["default"]);

exports.ListMapping = ListMapping;

_defineProperty(ListMapping, "defaultProps", {
  highlight: {}
});

ListMapping.propTypes = {
  highlightList: _propTypes["default"].object,
  onDoubleClick: _propTypes["default"].func,
  onMouseUp: _propTypes["default"].func
};
var _default = ListMapping;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = exports.ScreenMapping = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _jquery = _interopRequireDefault(require("jquery"));

var _index = _interopRequireDefault(require("../Emulator/index"));

var _EmulatorView = _interopRequireDefault(require("../Emulator/EmulatorView"));

var _controler = require("../Emulator/controler");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _get(target, property, receiver) { if (typeof Reflect !== "undefined" && Reflect.get) { _get = Reflect.get; } else { _get = function _get(target, property, receiver) { var base = _superPropBase(target, property); if (!base) return; var desc = Object.getOwnPropertyDescriptor(base, property); if (desc.get) { return desc.get.call(receiver); } return desc.value; }; } return _get(target, property, receiver || target); }

function _superPropBase(object, property) { while (!Object.prototype.hasOwnProperty.call(object, property)) { object = _getPrototypeOf(object); if (object === null) break; } return object; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var ScreenMapping =
/*#__PURE__*/
function (_Emulator) {
  _inherits(ScreenMapping, _Emulator);

  function ScreenMapping() {
    var _getPrototypeOf2;

    var _this;

    _classCallCheck(this, ScreenMapping);

    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(ScreenMapping)).call.apply(_getPrototypeOf2, [this].concat(args)));

    _defineProperty(_assertThisInitialized(_this), "onMouseUp", function (callbackFn) {
      var id = _this.state.id;
      var elScreen = (0, _jquery["default"])(".".concat(id, ".as400-screen"));
      elScreen.mouseup(function (event) {
        // console.log(`| ========== ${event.type} ========== | `);
        callbackFn(event);

        _this.clearAllMarkChackString(id);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onKeyDown", function () {
      var _this$state = _this.state,
          id = _this$state.id,
          colSize = _this$state.colSize;
      var elScreen = (0, _jquery["default"])(".".concat(id, ".as400-screen"));
      elScreen.keydown(function (event) {
        // console.log(`| ========== ${event.type} ========== |`);
        var startSelection = (0, _controler.getStartSelection)(id, colSize);
        var endSelection = (0, _controler.getEndSelection)(id, colSize);
        var flag = "field"; // const flag = 'list';

        if (flag === "list") {
          var selectionStart = (0, _controler.getIndexByRowCol)(startSelection.row, 0) + 1;
          var selectionEnd = (0, _controler.getIndexByRowCol)(endSelection.row, colSize) + 2;
          (0, _controler.setSelectionRange)(id, selectionStart, selectionEnd);
        }
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onDoubleClick", function (callbackFn) {
      var id = _this.state.id;
      var elScreen = (0, _jquery["default"])(".".concat(id, ".as400-screen"));
      elScreen.dblclick(function (event) {
        // console.log(`| ========== ${event.type} ========== |`);
        callbackFn(event);
      });
    });

    _defineProperty(_assertThisInitialized(_this), "onSelect", function () {
      var _this$state2 = _this.state,
          id = _this$state2.id,
          colSize = _this$state2.colSize;
      var elScreen = (0, _jquery["default"])(".".concat(id, ".as400-screen"));
      elScreen.select(function (event) {
        // console.log(`| ========== ${event.type} ========== |`);
        var start = event.target.selectionStart;
        var end = event.target.selectionEnd;
        var startPosition = (0, _controler.getStartSelection)(id, colSize);

        _this.setState({
          lastSelection: {
            text: (0, _controler.getSelectionRange)(id, start, end),
            row: startPosition.row,
            col: startPosition.col
          }
        });
      });
    });

    _defineProperty(_assertThisInitialized(_this), "getHighlight", function (markType) {
      return _this.state.markList[markType.replace("-", "")];
    });

    _defineProperty(_assertThisInitialized(_this), "setHighlight", function (markType, highlight) {
      _this.markStringChackString(markType, highlight);
    });

    _defineProperty(_assertThisInitialized(_this), "clearHighlight", function (markType) {
      return _this.clearMarkString(markType);
    });

    _defineProperty(_assertThisInitialized(_this), "getHighlightList", function () {
      return _this.state.markList;
    });

    _defineProperty(_assertThisInitialized(_this), "setHighlightList", function (highlightList) {
      _this.markAllCheckString(highlightList);
    });

    _defineProperty(_assertThisInitialized(_this), "clearHighlightList", function () {
      _this.clearAllMarkChackString(_this.props.id);
    });

    _defineProperty(_assertThisInitialized(_this), "getLastSelection", function () {
      return _this.state.lastSelection;
    });

    return _this;
  }

  _createClass(ScreenMapping, [{
    key: "componentDidMount",
    value: function componentDidMount() {
      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      _get(_getPrototypeOf(ScreenMapping.prototype), "componentDidMount", this).apply(this, args);

      this.markAllCheckString(this.props.highlight);
      var _this$props = this.props,
          onDoubleClick = _this$props.onDoubleClick,
          onMouseUp = _this$props.onMouseUp;
      this.onSelect();
      this.onKeyDown();
      this.onMouseUp(onMouseUp);
      this.onDoubleClick(onDoubleClick);
    }
  }, {
    key: "render",
    value: function render() {
      var _this$props2 = this.props,
          id = _this$props2.id,
          readOnly = _this$props2.readOnly;
      return _react["default"].createElement(_EmulatorView["default"], {
        id: id,
        readOnly: readOnly
      });
    } // Set default props

  }]);

  return ScreenMapping;
}(_index["default"]);

exports.ScreenMapping = ScreenMapping;

_defineProperty(ScreenMapping, "defaultProps", {
  highlight: {}
});

ScreenMapping.propTypes = {
  highlightList: _propTypes["default"].object,
  onDoubleClick: _propTypes["default"].func,
  onMouseUp: _propTypes["default"].func
};
var _default = ScreenMapping;
exports["default"] = _default;
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _Emulator = _interopRequireDefault(require("./components/Emulator"));

var _FieldsMapping = _interopRequireDefault(require("./components/FieldsMapping"));

var _ListMapping = _interopRequireDefault(require("./components/ListMapping"));

var _ScreenMapping = _interopRequireDefault(require("./components/ScreenMapping"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = [_Emulator["default"], _FieldsMapping["default"], _ListMapping["default"], _ScreenMapping["default"]];
exports["default"] = _default;
