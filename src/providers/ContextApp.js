import React, { useState } from "react";
export const WebViewLoadContext = React.createContext();

export function ContextApp(props) {
  const [webViewLoad, SetWebViewLoad] = useState(1);
  return (
    <WebViewLoadContext.Provider
      value={{
        webViewLoad,
        SetWebViewLoad,
      }}
    >
      {props.children}
    </WebViewLoadContext.Provider>
  );
}
