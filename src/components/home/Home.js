import React,{useState} from 'react'
import {Container,Input,TextInput,SaveButton, List} from './style'
import {Keyboard} from 'react-native';
import getRealm from '../../services/realm'
import ItensOrder from '../ItensOrder/ItensOrder'
import { WebView } from 'react-native-webview';


function Home(){
  const [valueIdSku, SetValueIDSku] = useState("")
  const [valueAmount, SetValueAmount] = useState("")
  const [valueOrderName, setValueOrderName] = useState("")
  const [itensOrder,setIntensOrder] = useState([])

  
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
      <List
          keyboardShouldPersistTaps="handled"
          data={itensOrder}
          keyExtractor={item => String(item.name)}
          renderItem={({item}) => (
            <ItensOrder
              data={item}
            />
          )}></List>
      <WebView source={{ uri: 'https://cassol.com.br' }} />
    </Container>

  )
}

export default Home