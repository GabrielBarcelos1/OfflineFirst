import React, {useEffect, useState, useCallback} from 'react';
import {View, Text} from 'react-native';
import getRealm from '../../services/realm';
import {WebViewLoadContext} from '../../providers/ContextApp';
import {Container, ContainerList, ContainerAdd, TextPrimary} from './style';
import {List, ActionSheet} from 'native-base';
import Icon from 'react-native-vector-icons/dist/Feather';
import { useFocusEffect } from '@react-navigation/native';

var BUTTONS = [
  'Editar Item',
  'Deletar Item',
  'Cancelar',
];
var DESTRUCTIVE_INDEX = 1;
var CANCEL_INDEX = 2;

function ItensOrder({navigation, route}) {
  const {SetWebViewLoad} = React.useContext(WebViewLoadContext);
  const [arrayItens, setArrayItens] = useState('');
  const [idOrder, setIdOrder] = useState('');
  const [att, setAtt] = useState('');
  const pickObject = useCallback(() => {

    async function meuDeus(){
      SetWebViewLoad(2);
      const index = route.params.id;
      setIdOrder(route.params.id);
      const realm = await getRealm();
      const Obj = realm.objects('Order').filtered(`idOrder == ${index}`);
      setArrayItens(Obj[0].itensOrder);
      console.log(index)
    }
    meuDeus()
  }, [route.params.id])
  
  useFocusEffect(pickObject)
  async function deleteItem(index) {
    try {
      const realm = await getRealm();
      
      const Obj = realm.objects('ItensOrder').filtered(`idItenOrder == ${index}`);
      console.log(Obj)
      
      realm.write(() => {
        realm.delete(Obj[0]);
      });
      setAtt(att+1)
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Container>
      {arrayItens !== '' && console.log(arrayItens)}
      {arrayItens !== '' && (
        <>
          <List
            keyboardShouldPersistTaps="handled"
            dataArray={arrayItens}
            keyExtractor={(item) => String(item.idItenOrder)}
            renderItem={({item}) => {
              return (
                <ContainerList>
                  <View>
                     <Text>
                      <TextPrimary>Id que ficara escondido:</TextPrimary>
                      <Text> {item.idItenOrder}</Text>
                    </Text>
                    <Text>
                      <TextPrimary>Id Sku:</TextPrimary>
                      <Text> {item.IdSku}</Text>
                    </Text>
                    <Text>
                      <TextPrimary>Quantidade:</TextPrimary>
                      <Text>{item.amount}</Text>
                    </Text>
                  </View>
                  <Icon
                    name="more-vertical"
                    size={22}
                    color="#000"
                    onPress={() =>
                      ActionSheet.show(
                        {
                          options: BUTTONS,
                          cancelButtonIndex: CANCEL_INDEX,
                          destructiveButtonIndex: DESTRUCTIVE_INDEX,
                          title: 'ActionSheet',
                        },
                        (buttonIndex) => {
                          if (buttonIndex === 1) {
                          deleteItem(item.idItenOrder)
                          }
                        },
                      )
                    }
                  />
                </ContainerList>
              );
            }}></List>
        </>
      )}
      <ContainerAdd>
        <Icon
          name="plus"
          size={22}
          color="#fff"
          onPress={() =>
            navigation.navigate('CreateItens', {
              id: idOrder,
            })
          }></Icon>
      </ContainerAdd>
    </Container>
  );
}

export default ItensOrder;
