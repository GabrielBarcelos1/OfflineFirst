import React, {useState, useEffect} from 'react';
import {View} from 'react-native';
import getRealm from '../../services/realm';
import ItensOrder from '../ItensOrder/ItensOrder';
import {Button, Text, List, ListItem} from 'native-base';
function Orders({navigation}) {
  const [itensOrder, setIntensOrder] = useState([]);
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

  async function deleteOrder(index){
    try {
    const realm = await getRealm();
    const Obj = realm.objects('Order').filtered(`idOrder == ${index}`)
    realm.write(()=>{
      realm.delete(Obj)
    })}catch(err){
      console.log(err)
    }
  }

  return (
    <View>
      <List
        keyboardShouldPersistTaps="handled"
        dataArray={itensOrder}
        keyExtractor={(item) => String(item.idOrder)}
        renderItem={({item}) => {
          return (
            <ListItem
              onPress={() =>
                navigation.navigate('CreateItens', {id: item.idOrder})
              }>
              <ItensOrder data={item} />
              {/* <Icon name="delete" size={22} color="#ff382a" onPress={()=>deleteOrder(item.idOrder)}/> */}
            </ListItem>
          );
        }}>
      </List>
      <Button primary onPress={() => navigation.navigate('CreateOrder')}>
          <Text> Adicionar um pedido </Text>
        </Button>
    </View>
  );
}

export default Orders;
