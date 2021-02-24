import React,{useEffect} from 'react'
import {View,Text} from 'react-native'
function ItensOrder({navigation, route}){

  useEffect(()=>{

  },[])

return(
  <View>
     {route.params.data.itensOrder.map((item, key) => {
        return (
          <View key={key}>
            <Text>Id Sku: {item.IdSku}</Text>
            <Text> Amount{item.amount}</Text>
          </View>
        );
      })}
  </View>
)

}

export default ItensOrder