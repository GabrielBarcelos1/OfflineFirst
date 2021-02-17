import React from 'react'
import {View,Text} from 'react-native'

function Repository({data}){
  return(
   <View>
     <Text>{data.name}</Text>
     <Text>{data.orderDate}</Text>
    {data.itensOrder.map((iten, key) => {
      return(
        <View key={key}>
          <Text>{iten.IdSku}</Text>
          <Text>{iten.amount}</Text>
        </View>
      )
    })}
     
   </View>
  )

}

export default Repository