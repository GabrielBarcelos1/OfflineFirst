import React, {useEffect, useState} from 'react';
import getRealm from '../../services/realm';
import {View, Label, Form, Item, Input, Button, Text} from 'native-base';
import {WebViewLoadContext} from '../../providers/ContextApp';

function CreateItens({route, navigation}) {
  const {SetWebViewLoad} = React.useContext(WebViewLoadContext);
  const [InputIdSku, setInputIdSku] = useState(0);
  const [inputAmount, SetinputAmount] = useState(0);
  const [arrayItem, setarrayItem] = useState([]);

  const route2 = route;
  const navigation2 = navigation;

  useEffect(() => {
    SetWebViewLoad(2);
    async function pickObject() {
      const index = route.params.id;
      const realm = await getRealm();
      const Obj = realm.objects('Order').filtered(`idOrder == ${index}`);
      setarrayItem(Obj[0]);
      console.log(Obj.itensOrder)
    }
    pickObject();
  }, []);

  async function handleSave() {
    try {
      const realm = await getRealm();
      realm.write(() => {
        arrayItem.itensOrder.push({idItenOrder: 14,  IdSku: InputIdSku, amount: inputAmount});
      })
      // realm.write(() => {
      //   let teste = arrayItem;

      //   teste.push({
      //     idItenOrder: 3,
      //     IdSku: InputIdSku,
      //     amount: inputAmount,
      //   });
      //   setarrayItem(teste);
      //   console.log(teste);
      // });

      // realm.write(() => {
      //   const data = {
      //     idOrder: route2.params.id,
      //     itensOrder: arrayItem,
      //   };
      //   realm.create('Order', data, true);
      // });
      // navigation2.goBack();
    } catch (err) {
      console.log('deu erro em algo' + err);
    }
  }

  return (
    <View>
      {console.log(route.params.id)}

      <Form>
        <Item floatingLabel>
          <Label>Id SKU</Label>
          <Input onChangeText={setInputIdSku} />
        </Item>
        <Item floatingLabel>
          <Label>Quantidade</Label>
          <Input onChangeText={SetinputAmount} />
        </Item>
      </Form>
      <Button onPress={handleSave}>
        <Text>Adicionar Itens ao pedido</Text>
      </Button>
    </View>
  );
}

export default CreateItens;
