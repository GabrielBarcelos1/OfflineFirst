import React,{useState} from 'react'
import {Container,Input,TextInput,SaveButton} from './style'
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
    const itenBd = realm.objects('Order');
    setIntensOrder(itenBd)
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
      <SaveButton onPress={handleSave}>
        <TextInput>Salvar</TextInput>
      </SaveButton>
        <SaveButton onPress={()=> navigation.navigate('Orders')}>
            <TextInput>ir para pedidos offline</TextInput>
        </SaveButton>
        <SaveButton onPress={()=> navigation.navigate('WebViewComponent')}>
            <TextInput>ir para webView</TextInput>
        </SaveButton>
    </Container>

  )
}

export default Home