import React, { useState} from 'react';
import {Container, Content, Form, Item, Input, Label,Text ,Button} from 'native-base';
import getRealm from '../../services/realm'
function CreateOrder({navigation}) {
  const [valueOrderName, setValueOrderName] = useState("")
  const navigation2 = navigation
  async function handleSave(){
    try{
      const realm = await getRealm()
      const dateToday = Date()
      const id = realm.objects('Order').length
      
      const data = {
        idOrder: id+1,
        name: valueOrderName,
        orderDate: dateToday,
        itensOrder:[]
          
      }
      
    realm.write(()=>{
      realm.create('Order',data,'modified')
    })
    navigation2.navigate('Orders')
  }
    catch(err){
      console.log("deu erro em algo" + err)
    }
  }
  return (
    <Container>
      <Content>
        <Form>
          <Item floatingLabel>
            <Label>Nome do pedido</Label>
            <Input  value={valueOrderName} onChangeText={setValueOrderName}/>
          </Item>
        </Form>
        <Button onPress={handleSave}><Text>Adicionar Pedido</Text></Button>
      </Content>

    </Container>
  );
}
export default CreateOrder;
