import React, { useState } from "react";
export const WebViewLoadContext = React.createContext();

export function ContextApp(props) {
  const [webViewLoad, SetWebViewLoad] = useState(1);
  const [arrayItensToInject, setArrayItensToInject] = useState([])
  
  
  return (
    <WebViewLoadContext.Provider
      value={{
        webViewLoad,
        SetWebViewLoad,
        arrayItensToInject,
        setArrayItensToInject
        
      }}
    >
      {props.children}
    </WebViewLoadContext.Provider>
  );
}
