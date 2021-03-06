import React, {useState, useEffect} from 'react';
import {
  Form,
  Input,
  Label,
  Text,
  Item
} from 'native-base';
import{ButtonAdd , MajorContainer} from './style'
import getRealm from '../../services/realm';
import {WebViewLoadContext} from '../../providers/ContextApp';


function CreateOrder({navigation, route}) {

  const [valueOrderName, setValueOrderName] = useState('');
  const [OrderId, setOrderId] = useState('');
  const [arrayItens, setArrayItens] = useState('');
  const [dataOrder, setDataOrder] = useState('');
  const navigation2 = navigation;
  const {SetWebViewLoad} = React.useContext(WebViewLoadContext);
  useEffect(() => {
    SetWebViewLoad(2);
    async function VerifyEdit() {
      if (route.params.edit !== false) {
        console.log('é pra editar');
        const realm = await getRealm();
        const Obj = realm.objects('Order').filtered(`idOrder == ${route.params.edit}`);
        setValueOrderName(Obj[0].name)
        setOrderId(Obj[0].idOrder)
        setDataOrder(Obj[0].orderDate)
        setArrayItens(Obj[0].itensOrder)
      } else {
        console.log('Nao é pra editar');
      }
    }
    VerifyEdit();
  }, []);

  async function handleSave() {
    try {
      const realm = await getRealm();
      const dateToday = new Date();
      const id =
        realm.objects('Order').max('idOrder') == null
          ? 0
          : realm.objects('Order').max('idOrder');

      const data = {
        idOrder: route.params.edit === false ? id + 1 : OrderId,
        name: valueOrderName,
        orderDate: route.params.edit === false ?dateToday: dataOrder,
        itensOrder:route.params.edit === false ? [] : arrayItens,
      };

      realm.write(() => {
        realm.create('Order', data, 'modified');
      });
      navigation2.navigate('Home');
    } catch (err) {
      console.log('deu erro em algo' + err);
    }
  }
  return (
    <MajorContainer>
        <Form>
          <Item stackedLabel style={{marginHorizontal:20}}>
            <Label>Nome do Pedido: </Label>
            <Input value={valueOrderName} onChangeText={setValueOrderName} />
          </Item>
        </Form>
        <ButtonAdd
        onPress={handleSave}
        block 
        >
          <Text>{route.params.edit !== false ? "Editar Pedido": "Adicionar Pedido"}</Text>
        </ButtonAdd>
    </MajorContainer>
  );
}
export default CreateOrder;
