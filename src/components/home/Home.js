import React,{useState} from 'react'
import {Container} from './style'
import { WebView } from 'react-native-webview';
import {WebViewLoadContext} from '../../providers/ContextApp'
import { useFocusEffect } from '@react-navigation/native';
import { Button,Text } from 'native-base';




function Home({navigation, route}){
  const { webViewLoad, SetWebViewLoad } = React.useContext(WebViewLoadContext);
  const [jstoInject, setJstoInject] = useState("")
  useFocusEffect(()=>{
    SetWebViewLoad(1)
    setJstoInject(route.params?.jsToInject === undefined ? "Primeira entrada sem o carrinho montado" : route.params.jsToInject)
  })
  function teste(){
    
  }

  return(
    <Container>
      {webViewLoad==1 &&
      <WebView source={{ uri: 'https://cassol.com.br' }}   injectedJavaScript={`window.alert("${jstoInject}")`} key={jstoInject}/>
      } 
  
    </Container>

  )
}

export default Home