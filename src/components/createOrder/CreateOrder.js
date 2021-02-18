import React, { useState} from 'react';
import {Container, Content, Form, Item, Input, Label,Text} from 'native-base';
import getRealm from '../../services/realm'
function CreateOrder() {
  const [valueOrderName, setValueOrderName] = useState("")
  async function handleSave(){
    try{
      const realm = await getRealm()
      const dateToday = Date()
      
      const data = {
        name: valueOrderName,
        orderDate: dateToday,
        itensOrder:[]
          
      }
      
    realm.write(()=>{
      realm.create('Order',data,'modified')
    })
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
      </Content>
      <Text onPress={handleSave}>teste</Text>
    </Container>
  );
}
export default CreateOrder;
