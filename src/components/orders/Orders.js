import React, {useState, useEffect} from 'react';
import getRealm from '../../services/realm';
import Icon from 'react-native-vector-icons/dist/Feather';

import ItensOrder from '../OrderInfos/OrderInfos';
import {List, ActionSheet, Root, Text} from 'native-base';
import {WebViewLoadContext} from '../../providers/ContextApp';
import {useFocusEffect} from '@react-navigation/native';

import {
  Container,
  ContainerList,
  ContainerAdd,
  BoxModalView,
  BoxModalViewMinor,
  IconDelete,
  TitleModal,
  TextModal,
  ViewButtonsModal,
  ButtonCancel,
  ButtonDelete,
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
  const [itensOrder, setIntensOrder] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const {setArrayItensToInject,currentUrl, setControllPage} = React.useContext(
    WebViewLoadContext
  );

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
      setModalVisible(false);
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
            <BoxModalViewMinor>
              <IconDelete
                name="x-square"
                size={60}
                color="#D9534F"></IconDelete>
              <TitleModal>Voce tem certeza?</TitleModal>
              <TextModal>
                Voce tem certeza que deseja excluir o pedido? esse processo nao
                pode ser desfeito
              </TextModal>
              <ViewButtonsModal>
                <ButtonCancel light onPress={() => setModalVisible(false)}>
                  <Text> Cancelar </Text>
                </ButtonCancel>
                <ButtonDelete danger>
                  <Text onPress={() => deleteOrder(idToDelete)}>Apagar</Text>
                </ButtonDelete>
              </ViewButtonsModal>
            </BoxModalViewMinor>
          </BoxModalView>
        </Modal>
        <Container>
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
                          } else if (buttonIndex === 1) {
                            setArrayItensToInject([]);
                            setControllPage(1)
                            navigation.navigate('E-Commerce', {
                              jsToInject: item.idOrder,
                            });
                           
                          } else if (buttonIndex === 2) {
                            setModalVisible(true);
                            setIdToDelete(item.idOrder);
                          }
                        },
                      )
                    }
                  />
                </ContainerList>
              );
            }}></List>
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
