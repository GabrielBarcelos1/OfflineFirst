import React, {useState, useEffect} from 'react';
import getRealm from '../../services/realm';
import Icon from 'react-native-vector-icons/dist/Feather';
import ItensOrder from '../OrderInfos/OrderInfos';
import {List, ActionSheet, Root, Text} from 'native-base';
import {WebViewLoadContext} from '../../providers/ContextApp';
import {
  Container,
  ContainerList,
  ContainerAdd,
  Title,
  BoxModalView,
} from './style';
import Modal from 'react-native-modal';

var BUTTONS = [
  'Editar Pedido',
  'Sincronizar Pedido',
  'Deletar Pedido',
  'Cancelar',
];
var DESTRUCTIVE_INDEX = 2;
var CANCEL_INDEX = 3;

function Orders({navigation}) {
  const {SetWebViewLoad} = React.useContext(WebViewLoadContext);
  const [itensOrder, setIntensOrder] = useState([]);
  const navigation2 = navigation;
  const [modalVisible, setModalVisible] = useState(false);
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
  return (
    <>
      <Root>
        <Modal isVisible={modalVisible}>
          <BoxModalView>
            <Text>aaa</Text>
            <Text>aaa</Text>
            <Text>bbb</Text>
            <Text>xxxce</Text>
            <Text onPress={() => setModalVisible(false)}>dddd</Text>
          </BoxModalView>
        </Modal>
        <Container>
          <Title>Meus pedidos</Title>
          <List
            keyboardShouldPersistTaps="handled"
            dataArray={itensOrder}
            keyExtractor={(item) => String(item.idOrder)}
            renderItem={({item}) => {
              return (
                <ContainerList
                  onPress={() =>
                    navigation.navigate('ItensOrder', {id: item.idOrder})
                  }>
                  <ItensOrder data={item} />

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
                          if (buttonIndex === 0) {
                            navigation.navigate('CreateOrder', {
                              edit: item.idOrder,
                            });
                          } else if (buttonIndex === 2) {
                            deleteOrder(item.idOrder);
                          }
                        },
                      )
                    }
                  />
                </ContainerList>
              );
            }}></List>

          <Text onPress={() => setModalVisible(true)}>ative modal</Text>

          <ContainerAdd
            onPress={() => navigation.navigate('CreateOrder', {edit: false})}>
            <Icon name="plus" size={22} color="#fff"></Icon>
          </ContainerAdd>
        </Container>
      </Root>
    </>
  );
}

export default Orders;
