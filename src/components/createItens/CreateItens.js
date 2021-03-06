import React, {useEffect, useState} from 'react';
import getRealm from '../../services/realm';
import {View, Label, Form, Input, Text ,Item} from 'native-base';
import {WebViewLoadContext} from '../../providers/ContextApp';
import {ButtonAdd,MajorView} from './style';

function CreateItens({route, navigation}) {
  const {SetWebViewLoad} = React.useContext(WebViewLoadContext);
  const [InputIdSku, setInputIdSku] = useState('');
  const [inputAmount, SetinputAmount] = useState('');
  const [arrayItem, setarrayItem] = useState([]);

  const route2 = route;

  useEffect(() => {
    SetWebViewLoad(2);
    async function pickObject() {
      if (route.params.edit !== false) {
        const realm = await getRealm();
        const Obj = realm
          .objects('ItensOrder')
          .filtered(`idItenOrder == ${route.params.edit}`);
        setInputIdSku(Obj[0].IdSku);
        SetinputAmount(Obj[0].amount);
        console.log('é pra editar');
        console.log(Obj);
      } else {
        console.log('Nao é pra editar');
      }
      const index = route.params.id;
      const realm = await getRealm();
      const Obj = realm.objects('Order').filtered(`idOrder == ${index}`);
      setarrayItem(Obj[0]);
      console.log(Obj[0].itensOrder);
    }
    pickObject();
  }, []);

  async function handleSave() {
    try {
      const realm = await getRealm();
      if (route.params.edit !== false) {
        realm.write(() => {
          const dataItem = {
            idItenOrder: route.params.edit,
            IdSku: InputIdSku,
            amount: inputAmount,
          };
          realm.create('ItensOrder', dataItem, 'modified');
        });
        navigation.navigate('ItensOrder');
      } else {
        const maxId =
          realm.objects('ItensOrder').max('idItenOrder') == null
            ? 0
            : realm.objects('ItensOrder').max('idItenOrder');

        realm.write(() => {
          arrayItem.itensOrder.push({
            idItenOrder: maxId + 1,
            IdSku: InputIdSku,
            amount: inputAmount,
          });
          const data = {
            idOrder: route2.params.id,
            itensOrder: arrayItem.itensOrder,
          };
          realm.create('Order', data, 'modified');
        });
        setInputIdSku('');
        SetinputAmount('');
      }
    } catch (err) {
      console.log('deu erro em algo' + err);
    }
  }

  return (
    <MajorView>
      <Form>
        <Item stackedLabel >
          <Label >Id SKU</Label>
          <Input value={InputIdSku} onChangeText={setInputIdSku}/>
        </Item>
        <Item stackedLabel >
          <Label >Quantidade</Label>
          <Input value={inputAmount} onChangeText={SetinputAmount}/>
        </Item>
      </Form>
        <ButtonAdd onPress={handleSave} block >
          <Text>
            {route.params.edit !== false
              ? 'Editar item'
              : 'Adicionar Item ao pedido'}
          </Text>
        </ButtonAdd>
    </MajorView>
  );
}

export default CreateItens;
