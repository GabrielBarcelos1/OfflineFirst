
import React from 'react';
import Home from "./src/components/home/Home"
import Orders from './src/components/orders/Orders'
import CreateOrder from './src/components/createOrder/CreateOrder'
import CreateItens from './src/components/createItens/CreateItens'

import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

function Tabs(){
  return(
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home}/>
      <Tab.Screen name="pedidos offline" component={Orders}/>
    </Tab.Navigator>
  )
}

function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Tabs} options={{headerShown:false}} />
        <Stack.Screen name="Orders" component={Orders}/>
        <Stack.Screen name="CreateOrder" component={CreateOrder}/>
        <Stack.Screen name="CreateItens" component={CreateItens}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
