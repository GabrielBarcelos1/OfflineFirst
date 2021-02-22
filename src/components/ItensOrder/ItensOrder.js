import React from 'react';
import {View, Text} from 'react-native';
import {TextPrimary} from './style';

function Repository({data}) {
  return (
    <View>
      <Text>
        <TextPrimary>Order name: </TextPrimary>
        <Text>{data.name}</Text>
      </Text>
      <Text>
        <TextPrimary>Order date:</TextPrimary>
        <Text> {data.orderDate.toISOString().substring(0, 10)}</Text>
      </Text>
      {data.itensOrder.map((item, key) => {
        return (
          <View key={key}>
            <Text>Id Sku: {item.IdSku}</Text>
            <Text> Amount: {item.amount}</Text>
          </View>
        );
      })}
    </View>
  );
}

export default Repository;
