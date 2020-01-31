import React from "react";

import Emulator from "./pages/Emulator";
import ScreenMapping from "./pages/ScreenMapping";
import FieldsMapping from "./pages/FieldsMapping";
import ListMapping from "./pages/ListMapping";

function App() {
  return (
    <div className="App">
      <Emulator />
      <br />
      <ScreenMapping />
      <br />
      <FieldsMapping />
      <br />
      <ListMapping />
    </div>
  );
}

export default App;
