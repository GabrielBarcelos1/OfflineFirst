import React, {useEffect, useState, useCallback} from 'react';
import {View, Text} from 'react-native';
import getRealm from '../../services/realm';
import {WebViewLoadContext} from '../../providers/ContextApp';
import {
  Container,
  ContainerList,
  ContainerAdd,
  TextPrimary,
  IconDelete,
  TitleModal,
  TextModal,
  ViewButtonsModal,
  ButtonCancel,
  ButtonDelete,
  BoxModalView,
  BoxModalViewMinor,
  TextButtonDelete
} from './style';
import {List, ActionSheet} from 'native-base';
import Icon from 'react-native-vector-icons/dist/Feather';
import {useFocusEffect} from '@react-navigation/native';
import Modal from 'react-native-modal';

var BUTTONS = ['Editar Item', 'Deletar Item', 'Cancelar'];
var DESTRUCTIVE_INDEX = 1;
var CANCEL_INDEX = 2;

function ItensOrder({navigation, route}) {
  const {SetWebViewLoad} = React.useContext(WebViewLoadContext);
  const [arrayItens, setArrayItens] = useState('');
  const [idOrder, setIdOrder] = useState('');
  const [att, setAtt] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [idToDelete, setIdToDelete] = useState('');
  const pickObject = useCallback(() => {
    async function meuDeus() {
      SetWebViewLoad(2);
      const index = route.params.id;
      setIdOrder(route.params.id);
      const realm = await getRealm();
      const Obj = realm.objects('Order').filtered(`idOrder == ${index}`);
      setArrayItens(Obj[0].itensOrder);
      console.log(index);
    }
    meuDeus();
  }, [route.params.id]);

  useFocusEffect(pickObject);
  async function deleteItem(index) {
    try {
      setModalVisible(false);
      const realm = await getRealm();

      const Obj = realm
        .objects('ItensOrder')
        .filtered(`idItenOrder == ${index}`);
      console.log(Obj);

      realm.write(() => {
        realm.delete(Obj[0]);
      });
      setAtt(att + 1);
    } catch (err) {
      console.log(err);
    }
  }
  return (
    <Container>
      {arrayItens !== '' && (
        <>
          <Modal isVisible={modalVisible}>
            <BoxModalView>
              <BoxModalViewMinor>
                <IconDelete name="x-square" size={60} color="#D9534F"></IconDelete>
                <TitleModal>Voce tem certeza?</TitleModal>
                <TextModal>
                  Voce tem certeza que deseja excluir o pedido? esse processo
                  nao pode ser desfeito
                </TextModal>
                <ViewButtonsModal>
                  <ButtonCancel light onPress={() => setModalVisible(false)}>
                    <Text> Cancelar </Text>
                  </ButtonCancel>
                  <ButtonDelete danger>
                    <TextButtonDelete onPress={() => deleteItem(idToDelete)}>Apagar</TextButtonDelete>
                  </ButtonDelete>
                </ViewButtonsModal>
              </BoxModalViewMinor>
            </BoxModalView>
          </Modal>
          <List
            keyboardShouldPersistTaps="handled"
            dataArray={arrayItens}
            keyExtractor={(item) => String(item.idItenOrder)}
            renderItem={({item}) => {
              return (
                <ContainerList>
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
                            navigation.navigate('CreateItens', {id: idOrder, edit: item.idItenOrder})
                          }
                          else if (buttonIndex === 1) {
                            setModalVisible(true);
                            setIdToDelete(item.idItenOrder);
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
            navigation.navigate('CreateItens', {id: idOrder, edit: false})
          }></Icon>
      </ContainerAdd>
    </Container>
  );
}

export default ItensOrder;
