import React from 'react'
import {View,Text} from 'react-native'

function Repository({data}){
  let datateste = data.orderDate
  return(
   <View >
     <Text>Nome do pedido: {data.name}</Text>
     <Text>data do pedido: {data.orderDate.toISOString().substring(0, 10)}</Text>
    {data.itensOrder.map((item, key) => {
      return(
        <View key={key}>
          <Text>Id do Sku: {item.IdSku}</Text>
          <Text> Quantidade: {item.amount}</Text>
        </View>
      )
    })}
     
   </View>
  )

}

export default Repository