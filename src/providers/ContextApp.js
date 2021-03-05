import React, { useState } from "react";
export const WebViewLoadContext = React.createContext();

export function ContextApp(props) {
  const [webViewLoad, SetWebViewLoad] = useState(1);
  const [arrayItensToInject, setArrayItensToInject] = useState([])
  const [controllPage,setControllPage ] = useState(0);
  
  
  return (
    <WebViewLoadContext.Provider
      value={{
        webViewLoad,
        SetWebViewLoad,
        arrayItensToInject,
        setArrayItensToInject,
        controllPage,
        setControllPage
      
        
        
      }}
    >
      {props.children}
    </WebViewLoadContext.Provider>
  );
}
