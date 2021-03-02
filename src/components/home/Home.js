import React,{useState} from 'react'
import {Container} from './style'
import { WebView } from 'react-native-webview';
import {WebViewLoadContext} from '../../providers/ContextApp'
import { useFocusEffect } from '@react-navigation/native';
import { Button,Text } from 'native-base';
import getRealm from '../../services/realm';




function Home({navigation, route}){
  const { webViewLoad, SetWebViewLoad } = React.useContext(WebViewLoadContext);
  const [jstoInject, setJstoInject] = useState("")
  const [checkoutToUrl, setCheckoutToUrl] = useState("/")
  const [arrayItensToInject, setArrayItensToInject] = useState([])
  
  useFocusEffect(()=>{

    async function teste(){
      SetWebViewLoad(1)
      const realm = await getRealm();
      if(route.params?.jsToInject === undefined){
        return
      }else{
        const Obj = realm.objects('Order').filtered(`idOrder == ${route.params?.jsToInject}`);
        let arrayItens = Obj[0].itensOrder

        arrayItens.map((item)=>{
          let arrayItensInMap = arrayItensToInject
          let teste = {
            id: item.IdSku,
            quantity: item.amount,
            seller: "1",
          }
          arrayItensInMap.push(teste)

          setArrayItensToInject(arrayItensInMap)

        })
        console.log(arrayItensToInject)
        setJstoInject(
          `vtexjs.checkout.addToCart(arrayItensToInject, 1, 1).done(function(orderForm) {console.log(orderForm);});`
          )
        setCheckoutToUrl("/checkout")
      }
      
      
    }

    teste()
  
  })
  return(
    <Container>
      {webViewLoad==1 &&
      <WebView source={{ uri: `https://www.kikoekika.com.br${checkoutToUrl}` }}   injectedJavaScript={`${jstoInject}`} key={jstoInject}/>
      } 
  
    </Container>

  )
}

export default Home