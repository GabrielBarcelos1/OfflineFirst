import React,{useEffect} from 'react'
import {Container} from './style'
import { WebView } from 'react-native-webview';
import {Text} from 'react-native'
import {WebViewLoadContext} from '../../providers/ContextApp'
import { useFocusEffect } from '@react-navigation/native';



function Home({navigation}){
  const { webViewLoad, SetWebViewLoad } = React.useContext(WebViewLoadContext);
  useFocusEffect(()=>{
    SetWebViewLoad(1)
  })

  return(
    <Container>
      {webViewLoad==1 &&
      <WebView source={{ uri: 'https://cassol.com.br' }} />
      } 
    </Container>

  )
}

export default Home