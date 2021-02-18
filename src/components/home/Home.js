import React,{useState} from 'react'
import {Container,Input,TextInput,SaveButton} from './style'
import {Text ,Button} from 'native-base';
import {Keyboard} from 'react-native';
import getRealm from '../../services/realm'



function Home({navigation}){
  const [valueIdSku, SetValueIDSku] = useState("")
  const [valueAmount, SetValueAmount] = useState("")
  const [valueOrderName, setValueOrderName] = useState("")

  
  async function handleSave(){
    try{
      const realm = await getRealm()
      const dateToday = Date()
      
      
      const data = {
        name: valueOrderName,
        orderDate: dateToday,
        itensOrder:[{
          IdSku:Number(valueIdSku),
          amount: valueAmount
        }]
          
      }
      
    realm.write(()=>{
      realm.create('Order',data,'modified')
    })
    SetValueIDSku("")
    SetValueAmount("")
    Keyboard.dismiss()
  }
    catch(err){
      console.log("deu erro em algo" + err)
    }
  }
  return(
    <Container>
      <Input placeholder="Nome do pedido" onChangeText={setValueOrderName} value={valueOrderName}></Input>
      <TextInput>Digite o nome do pedido</TextInput>
      <Input placeholder="Id do produto" onChangeText={SetValueIDSku} value={valueIdSku}></Input>
      <TextInput>Digite o id do produto</TextInput>
      <Input placeholder="Quantidade"onChangeText={SetValueAmount} value={valueAmount}></Input>
      <TextInput>Quantidade</TextInput>
        <Button onPress={()=> navigation.navigate('Orders')}>
            <Text>ir para pedidos offline</Text>
        </Button>
        <Button onPress={()=> navigation.navigate('WebViewComponent')}>
            <Text>ir para webView</Text>
        </Button>
    </Container>

  )
}

export default Home