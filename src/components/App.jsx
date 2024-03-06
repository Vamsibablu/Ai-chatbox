// App.js
import React from "react";
import { Provider } from "react-redux";
import store from "./store";
import AiChatApp from "./AiChatApp";

function AppRedux() {
  return (
    <Provider store={store}>
      <div className="App">
        <AiChatApp />
      </div>
    </Provider>
  );
}

export default AppRedux;
