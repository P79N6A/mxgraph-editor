import React from "react";
import ReactDOM from "react-dom";
import Editor from './graph-editor';

import './index.less';

const App = () => {
  return (
    <div>
      <Editor />
    </div>
  );
};

export default App;

ReactDOM.render(<App />, document.getElementById("app"));
