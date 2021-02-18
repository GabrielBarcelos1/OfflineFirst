import React from 'react'
import { WebView } from 'react-native-webview';


function WebViewComponent(){
  return(
    <WebView source={{ uri: 'https://cassol.com.br' }} />
  )

}

export default WebViewComponent