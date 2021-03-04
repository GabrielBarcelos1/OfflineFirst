import React,{useState, useCallback,useEffect} from 'react'
import {Container} from './style'
import { WebView } from 'react-native-webview';
import {WebViewLoadContext} from '../../providers/ContextApp'
import { useFocusEffect } from '@react-navigation/native';
import { Button,Text } from 'native-base';
import getRealm from '../../services/realm';




function Home({navigation, route}){
  const { webViewLoad, SetWebViewLoad, arrayItensToInject,setArrayItensToInject} = React.useContext(WebViewLoadContext);
  const [jstoInject, setJstoInject] = useState("")
  const [checkoutToUrl, setCheckoutToUrl] = useState("/")
  


  const pickObject =  useCallback(() => {

    async function meuDeus(){
      
      SetWebViewLoad(1)
      const realm = await getRealm();
      if(route.params?.jsToInject === undefined){
        setJstoInject("")
      }else{
        setCheckoutToUrl("/checkout")
        const Obj = realm.objects('Order').filtered(`idOrder == ${route.params?.jsToInject}`);
        let arrayItens = Obj[0].itensOrder
    
        arrayItens.map((item)=>{
          let teste = {
            id: item.IdSku,
            quantity: item.amount,
            seller: "1",
          }
          let aux = arrayItensToInject
          aux.push(teste)
          setArrayItensToInject(aux)
        })
        console.log(arrayItensToInject)

        let bbb = JSON.stringify(arrayItensToInject)
        
      

        let aaa = ` vtexjs.checkout.removeAllItems()
        .done(function(orderForm) {
          console.log(orderForm);
        });vtexjs.checkout.addToCart(${bbb}, 1, 1)
        .done(function(orderForm) {
          console.log(orderForm);
        });`
        setJstoInject(aaa)
        console.log(bbb)
        
      }

    }
    meuDeus()
      }, [route.params?.jsToInject])
  useFocusEffect(pickObject)
  return(
    <Container>
      {webViewLoad==1 &&
      <WebView source={{ uri: `https://www.kikoekika.com.br${checkoutToUrl}` }}   injectedJavaScript={`${jstoInject}`} key={jstoInject}/>
      } 
  
    </Container>

  )
}

export default Home