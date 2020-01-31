import $ from "jquery";
import _ from "lodash";

export const getHighlightDefault = (rowSize, colSize) => {
  let textHighlight = "";
  for (let i = 0; i < rowSize; i += 1) {
    for (let j = 0; j < colSize; j += 1) {
      textHighlight += ".";
    }
    textHighlight += "\n";
  }
  return textHighlight;
};

export const getIndexByRowCol = (row, colSize) =>
  (row - 1) * 80 + colSize + row - 2;

export const setSelectionRange = (elStr, selectionStart, selectionEnd) => {
  const elScreen = $(`.${elStr}.as400-screen`)[0];

  let start = selectionStart;
  let end = selectionEnd;

  start -= 1;
  end -= 1;

  // elScreen.focus();
  if (elScreen.setSelectionRange) {
    elScreen.setSelectionRange(start, end);
  } else if (elScreen.createTextRange) {
    const range = elScreen.createTextRange();
    range.collapse(true);
    range.moveEnd("character", end);
    range.moveStart("character", start);
    range.select();
  }
};

// const clearHighlight = (elStr, markType) => {
//   const elHighlight = $(`.${elStr}.as400-highlight`);
//   let newHighlight = elHighlight.html();

//   newHighlight = newHighlight
//     .replace(`<as400-${markType}>`, "")
//     .replace(`</as400-${markType}>`, "");

//   elHighlight.html(newHighlight);
// };

export const getAS400Cursor = posStr => {
  const posArr = posStr.split(",");

  return {
    row: parseInt(posArr[0]),
    col: parseInt(posArr[1])
  };
};

// const convertRowColNumber = posStr => {
//   const posArr = posStr.trim().split(",");
//   return {
//     row: posArr[0],
//     col: posArr[1]
//   };
// };

const getRowNumberByIndex = (elStr, index) => {
  const elScreen = $(`.${elStr}.as400-screen`);
  return (
    elScreen
    .val()
    .substr(0, index)
    .split("\n").length - 1
  );
};

const getColNumberByIndex = (elStr, index, colSize) => {
  const row = getRowNumberByIndex(elStr, index);
  const col = (index - row) % colSize;

  if (index === colSize * (row + 1) + row) {
    return colSize;
  }
  return col;
};

export const setIndexByRowCol = (elStr, row, col) => {
  const index = getIndexByRowCol(row, col);
  setSelectionRange(elStr, index, index);
};

export const getStartSelection = (elStr, colSize) => {
  const elScreen = $(`.${elStr}.as400-screen`);
  const startIndex = elScreen.prop("selectionStart");

  const rowSelectionStartIndex = getRowNumberByIndex(elStr, startIndex) + 1;
  const colSelectionStartIndex =
    getColNumberByIndex(elStr, startIndex, colSize) + 1;

  return {
    row: rowSelectionStartIndex,
    col: colSelectionStartIndex
  };
};

export const getEndSelection = (elStr, colSize) => {
  const elScreen = $(`.${elStr}.as400-screen`);
  const endIndex = elScreen.prop("selectionEnd");
  const rowSelectionEndIndex = getRowNumberByIndex(elStr, endIndex) + 1;
  const colSelectionEndIndex =
    getColNumberByIndex(elStr, endIndex, colSize) + 1;

  return {
    row: rowSelectionEndIndex,
    col: colSelectionEndIndex
  };
};

export const getSelectionRange = (elStr, selectionStart, selectionEnd) => {
  const elScreen = $(`.${elStr}.as400-screen`);

  if (selectionStart !== selectionEnd) {
    const selection = elScreen.val().substring(selectionStart, selectionEnd);
    return selection;
  }
  return "";
};

export const initScreen = (elStr, rowSize, colSize) => {
  const elScreen = $(`.${elStr}.as400-screen`);
  elScreen.attr("rows", rowSize);
  elScreen.attr("cols", colSize);

  const elScreenTemp = $(`.${elStr}.as400-screen-temp`);
  elScreenTemp.attr("rows", rowSize);
  elScreenTemp.attr("cols", colSize);

  const elStyle = $(`.${elStr}.as400-style`);
  elStyle.attr("rows", rowSize);
  elStyle.attr("cols", colSize);

  const elHighlight = $(`.${elStr}.as400-highlight`);
  elHighlight.html(getHighlightDefault(rowSize, colSize));
};

export const setAs400Screen = (elStr, data) => {
  const elScreen = $(`.${elStr}.as400-screen`);
  elScreen.val(data);
};

export const setAs400Style = (elStr, text, styleParams) => {
  const elStyle = $(`.${elStr}.as400-style`);

  let style = styleParams;

  let textStyle = "";
  for (let i = 0; i < text.length; i += 1) {
    const character = text[i];
    const styleCharacter = style[i];

    if (styleCharacter !== "." && !$.isEmptyObject(styleCharacter)) {
      textStyle += character.replace(
        character,
        `<as400-${styleCharacter.toLowerCase()}-style>$&</as400-${styleCharacter.toLowerCase()}-style>`
      );
    } else {
      textStyle += character;
    }
  }

  $(elStyle).html(textStyle);
};

export const setAS400Cursor = (elStr, data) => {
  const pos = getAS400Cursor(data);

  const index = getIndexByRowCol(pos.row, pos.col);

  setSelectionRange(elStr, index, index);
};

export const markAllCheckStringOnScreen = (id, markListData) => {
  const elHighlight = $(`.${id}.as400-highlight`);
  const text = elHighlight[0].innerHTML;
  let textHighlight = "";

  for (let i = 0; i < text.length; i += 1) {
    if (
      !_.isEmpty(markListData.mark1) &&
      i === getIndexByRowCol(markListData.mark1.row, markListData.mark1.col)
    ) {
      if (markListData.mark1.text.length < 2) {
        textHighlight += `<as400-mark-1>${text[i]}</as400-mark-1>`;
      } else {
        textHighlight += `<as400-mark-1>${text[i]}`;
      }
    } else if (
      !_.isEmpty(markListData.mark1) &&
      i ===
      getIndexByRowCol(markListData.mark1.row, markListData.mark1.col) +
      markListData.mark1.text.length -
      1
    ) {
      textHighlight += `${text[i]}</as400-mark-1>`;
    } else if (
      !_.isEmpty(markListData.mark2) &&
      i === getIndexByRowCol(markListData.mark2.row, markListData.mark2.col)
    ) {
      if (markListData.mark2.text.length < 2) {
        textHighlight += `<as400-mark-2>${text[i]}</as400-mark-2>`;
      } else {
        textHighlight += `<as400-mark-2>${text[i]}`;
      }
    } else if (
      !_.isEmpty(markListData.mark2) &&
      i ===
      getIndexByRowCol(markListData.mark2.row, markListData.mark2.col) +
      markListData.mark2.text.length -
      1
    ) {
      textHighlight += `${text[i]}</as400-mark-2>`;
    } else if (
      !_.isEmpty(markListData.mark3) &&
      i === getIndexByRowCol(markListData.mark3.row, markListData.mark3.col)
    ) {
      if (markListData.mark3.text.length < 2) {
        textHighlight += `<as400-mark-3>${text[i]}</as400-mark-3>`;
      } else {
        textHighlight += `<as400-mark-3>${text[i]}`;
      }
    } else if (
      !_.isEmpty(markListData.mark3) &&
      i ===
      getIndexByRowCol(markListData.mark3.row, markListData.mark3.col) +
      markListData.mark3.text.length -
      1
    ) {
      textHighlight += `${text[i]}</as400-mark-3>`;
    } else {
      textHighlight += text[i];
    }
  }

  elHighlight.html(textHighlight);
};