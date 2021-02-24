import React from 'react';
import {View, Text} from 'react-native';
import {TextPrimary} from './style';

function Repository({data}) {
  return (
    <View>
      <Text>
        <TextPrimary>Nome do Pedido: </TextPrimary>
        <Text>{data.name}</Text>
      </Text>
      <Text>
        <TextPrimary>Data do pedido:</TextPrimary>
        <Text> {data.orderDate.toISOString().substring(0, 10)}</Text>
      </Text>
    </View>
  );
}

export default Repository;
