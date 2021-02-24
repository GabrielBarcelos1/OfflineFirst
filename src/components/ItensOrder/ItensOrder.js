import React, {useEffect, useState} from 'react';
import {View, Text} from 'react-native';
import getRealm from '../../services/realm';
import {WebViewLoadContext} from '../../providers/ContextApp';
import {Container, ContainerList, ContainerAdd, TextPrimary} from './style';
import {List} from 'native-base';
import Icon from 'react-native-vector-icons/dist/Feather';

function ItensOrder({navigation, route}) {
  const {SetWebViewLoad} = React.useContext(WebViewLoadContext);
  const [idOrder, setIdOrder] = useState('');

  useEffect(() => {
    SetWebViewLoad(2);
    async function pickObject() {
      const index = route.params.id;
      const realm = await getRealm();
      const Obj = realm.objects('Order').filtered(`idOrder == ${index}`);
      setIdOrder(Obj[0].itensOrder);
    }
    pickObject();
  }, []);

  return (
    <Container>
      {idOrder !== '' && (
        <>
          <List
            keyboardShouldPersistTaps="handled"
            dataArray={idOrder}
            keyExtractor={(item) => String(item.idItenOrder)}
            renderItem={({item}) => {
              return (
                <ContainerList
                  onPress={() =>
                    navigation.navigate('ItensOrder', {id: item.idOrder})
                  }>
                  <View>
                    <Text>
                      <TextPrimary>Id Sku:</TextPrimary>
                      <Text> {item.IdSku}</Text>
                    </Text>
                    <Text>
                      <TextPrimary>Quantidade:</TextPrimary>
                      <Text>{item.amount}</Text>
                    </Text>
                  </View>
                  <Icon name="more-vertical" size={22} color="#000" />
                </ContainerList>
              );
            }}></List>
        </>
      )}
      <ContainerAdd>
        <Icon name="plus" size={22} color="#fff"></Icon>
      </ContainerAdd>
    </Container>
  );
}

export default ItensOrder;
