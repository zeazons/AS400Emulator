import React, { Component } from "react";

class EmulatorView extends Component {
  render() {
    return (
      <div className="as400-container">
        <div className="screen">
          <div className={`${id} as400-highlight`}></div>
          <div className={`${id} as400-style`}></div>
          <textarea
            readOnly={readOnly ? readOnly : false}
            className={`${id} as400-screen`}
          ></textarea>
          <textarea
            readOnly={readOnly ? readOnly : false}
            className={`${id} as400-screen-temp`}
          ></textarea>
        </div>
      </div>
    );
  }
}

export default EmulatorView;

// import React from "react";

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
