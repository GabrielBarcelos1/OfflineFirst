import React from 'react'
import {Container} from './style'
import {Text ,Button} from 'native-base';



function Home({navigation}){

  return(
    <Container>
        <Button onPress={()=> navigation.navigate('Orders')}>
            <Text>ir para pedidos offline</Text>
        </Button>
        <Button onPress={()=> navigation.navigate('WebViewComponent')}>
            <Text>ir para webView</Text>
        </Button>
    </Container>

  )
}

export default Home