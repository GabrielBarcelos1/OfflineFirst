import React from 'react'
import {Container} from './style'
import { WebView } from 'react-native-webview';



function Home({navigation}){

  return(
    <Container>
      <WebView source={{ uri: 'https://cassol.com.br' }} />
    </Container>

  )
}

export default Home