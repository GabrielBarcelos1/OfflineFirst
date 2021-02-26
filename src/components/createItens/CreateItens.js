import React, {useEffect, useState} from 'react';
import getRealm from '../../services/realm';
import {View, Label, Form, Item, Input, Button, Text} from 'native-base';
import {WebViewLoadContext} from '../../providers/ContextApp';

// uuidv4()

function CreateItens({route, navigation}) {
  const {SetWebViewLoad} = React.useContext(WebViewLoadContext);
  const [InputIdSku, setInputIdSku] = useState("");
  const [inputAmount, SetinputAmount] = useState("");
  const [arrayItem, setarrayItem] = useState([]);

  const route2 = route;

  useEffect(() => {
    SetWebViewLoad(2);
    async function pickObject() {
      const index = route.params.id;
      const realm = await getRealm();
      const Obj = realm.objects('Order').filtered(`idOrder == ${index}`);
      setarrayItem(Obj[0]);
      console.log(Obj[0].itensOrder)
    }
    pickObject();
  }, []);

  async function handleSave() {
    try {
      const realm = await getRealm();
      const maxId = realm.objects('ItensOrder').max('idItenOrder')== null
      ? 0
      : realm.objects('ItensOrder').max('idItenOrder')

      realm.write(() => {
        arrayItem.itensOrder.push({idItenOrder: maxId + 1,  IdSku: InputIdSku, amount: inputAmount});
        const data = {
          idOrder: route2.params.id,
          itensOrder: arrayItem.itensOrder,
        };
        realm.create('Order', data, "modified");
      })
      setInputIdSku("")
      SetinputAmount("")
    } catch (err) {
      console.log('deu erro em algo' + err);
    }
  }

  return (
    <View>
      <Form>
        <Item floatingLabel>
          <Label>Id SKU</Label>
          <Input value={InputIdSku} onChangeText={setInputIdSku} />
        </Item>
        <Item floatingLabel>
          <Label>Quantidade</Label>
          <Input value={inputAmount}onChangeText={SetinputAmount} />
        </Item>
      </Form>
      <Button onPress={handleSave}>
        <Text>Adicionar Itens ao pedido</Text>
      </Button>
    </View>
  );
}

export default CreateItens;
