import React, {useState} from 'react';
import getRealm from '../../services/realm';
import {View, Label, Form, Item, Input, Button, Text} from 'native-base';

function CreateItens({route, navigation}) {
  var arrayItem = [
    {
      IdSku: 1,
      amount: '22',
    },
    {
      IdSku: 1,
      amount: '22',
    },
  ]
  const route2 = route;
  const navigation2 = navigation;
  async function handleSave() {
    try {
      const realm = await getRealm();

      const data = {
        idOrder: route2.params.id,
        itensOrder: arrayItem,
      };

      realm.write(() => {
        realm.create('Order', data, 'modified');
      });
      navigation2.navigate('Orders');
    } catch (err) {
      console.log('deu erro em algo' + err);
    }
  }
  function attInputIdSku(index,val){
    const values = [...arrayItem];
    values[index].IdSku = Number(val);
  }
  function attInputAmount(index,val){
    const values = [...arrayItem];
    values[index].amount = val;
  }
  return (
    <View>
      {console.log(route.params.id)}

      {arrayItem.map((form, key) => {
        return (
          <Form key={key}>
            <Item floatingLabel>
              <Label>Id SKU</Label>
              <Input  onChangeText={(val)=>attInputIdSku(key,val === "" ? 0 : val)} />
            </Item>
            <Item floatingLabel>
              <Label>Quantidade</Label>
              <Input
                onChangeText={(val) => attInputAmount(key,val)}
              />
            </Item>
          </Form>
        );
      })}
      <Button onPress={handleSave}>
        <Text>Adicionar Itens ao pedido</Text>
      </Button>
    </View>
  );
}

export default CreateItens;