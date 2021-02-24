import React, {useState, useEffect} from 'react';
import getRealm from '../../services/realm';
import Icon from 'react-native-vector-icons/dist/Feather';
import ItensOrder from '../itensOrder/ItensOrder';
import {List, Title, Text, Picker, ActionSheet, Header, Button,Content, Root} from 'native-base';
import {WebViewLoadContext} from '../../providers/ContextApp'
import {
  Container,
  ContainerList,
  ContainerAdd,
  ContainerDropDown,
} from './style';
var BUTTONS = ["Edit", "Sync", "Delete", "Cancel"];
var DESTRUCTIVE_INDEX = 2;
var CANCEL_INDEX = 3;


function Orders({navigation}) {
  const { SetWebViewLoad } = React.useContext(WebViewLoadContext);
  const [itensOrder, setIntensOrder] = useState([]);
  const navigation2 = navigation
  useEffect(() => {
    async function ShowAllOrders() {
      try {
        const realm = await getRealm();
        const itenBd = realm.objects('Order');
        setIntensOrder(itenBd);
      } catch (err) {
        console.log('deu erro em algo' + err);
      }
    }
    ShowAllOrders();
  }, [, itensOrder]);

  async function deleteOrder(index) {
    try {
      const realm = await getRealm();
      const Obj = realm.objects('Order').filtered(`idOrder == ${index}`);
      realm.write(() => {
        realm.delete(Obj);
      });
    } catch (err) {
      console.log(err);
    }
  }
  function teste(){
    SetWebViewLoad(2)
    navigation2.navigate("CreateOrder")
  }


  return (
    <>
    <Root>
    <Container>
      <Title>Orders</Title>
      <List
        keyboardShouldPersistTaps="handled"
        dataArray={itensOrder}
        keyExtractor={(item) => String(item.idOrder)}
        renderItem={({item}) => {
          return (
            <ContainerList
              onPress={() =>
                navigation.navigate('CreateItens', {id: item.idOrder})}
              >
              <ItensOrder data={item} />

          <Icon name="more-vertical"
          size={22}
          color="#000"
            onPress={() =>
            ActionSheet.show(
              {
                options: BUTTONS,
                cancelButtonIndex: CANCEL_INDEX,
                destructiveButtonIndex: DESTRUCTIVE_INDEX,
                title: "ActionSheet"
              },
              buttonIndex => {

              }
            )}
          />
            </ContainerList>
          );
        }}></List>
      <ContainerAdd onPress={() => teste()}>
        <Icon name="plus" size={22} color="#fff"></Icon>
      </ContainerAdd>
    </Container>
    </Root>
    </>
  );
}

export default Orders;
