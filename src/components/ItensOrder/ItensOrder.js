import React from 'react'
import {View,Text} from 'react-native'

function Repository({data}){
  return(
   <View>
     <Text>{data.name}</Text>
     <Text>{data.orderDate}</Text>
    {data.itensOrder.map((item, key) => {
      return(
        <View key={key}>
          <Text>{item.IdSku}</Text>
          <Text>{item.amount}</Text>
        </View>
      )
    })}
     
   </View>
  )

}

export default Repository