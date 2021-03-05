import React, {useState, useCallback, useEffect} from 'react';
import {Container} from './style';
import {WebView} from 'react-native-webview';
import {WebViewLoadContext} from '../../providers/ContextApp';
import {useFocusEffect} from '@react-navigation/native';
import {Button, Text} from 'native-base';
import getRealm from '../../services/realm';

function Home({navigation, route}) {
  const {
    webViewLoad,
    SetWebViewLoad,
    arrayItensToInject,
    setArrayItensToInject,
    controllPage,
    setControllPage
  } = React.useContext(WebViewLoadContext);
  const [jstoInject, setJstoInject] = useState('');
  const [checkoutToUrl, setCheckoutToUrl] = useState('/');
  const [basicUrl, setBasicUrl] = useState('https://www.kikoekika.com.br');

  const pickObject = useCallback(() => {
    async function meuDeus() {
      SetWebViewLoad(1);
      const realm = await getRealm();
      if (route.params?.jsToInject !== undefined && controllPage === 1) {
        setControllPage(0)
        console.log(controllPage)
        setBasicUrl("https://www.kikoekika.com.br/checkout")
        const Obj = realm
          .objects('Order')
          .filtered(`idOrder == ${route.params?.jsToInject}`);
        let arrayItens = Obj[0].itensOrder;

        arrayItens.map((item) => {
          let teste = {
            id: item.IdSku,
            quantity: item.amount,
            seller: '1',
          };
          let aux = arrayItensToInject;
          aux.push(teste);
          setArrayItensToInject(aux);
        });

        let bbb = JSON.stringify(arrayItensToInject);

        let aaa = ` vtexjs.checkout.removeAllItems()
      .done(function(orderForm) {
        console.log(orderForm);
      });vtexjs.checkout.addToCart(${bbb}, 1, 1)
      .done(function(orderForm) {
        console.log(orderForm);
      });`;
        setJstoInject(aaa);
        console.log(bbb);
        
      }
    }
    if(controllPage === 0){
      setJstoInject("")
    }
    meuDeus();
  }, [route.params?.jsToInject, controllPage]);
  useFocusEffect(pickObject);
  return (
    <Container>
      {webViewLoad == 1 && (
        <WebView
          source={{uri:basicUrl}}
          injectedJavaScript={`${jstoInject}`}
          key={jstoInject}        
        />
      )}
    </Container>
  );
}

export default Home;
