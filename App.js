
import React from 'react';
import Home from "./src/components/home/Home"
import WebViewComponent from "./src/components/webView/WebView"
import Orders from './src/components/orders/Orders'
import CreateOrder from './src/components/createOrder/CreateOrder'
import CreateItens from './src/components/createItens/CreateItens'

import {NavigationContainer} from '@react-navigation/native'
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator()

function App(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={Home}/>
        <Stack.Screen name="WebViewComponent" component={WebViewComponent}/>
        <Stack.Screen name="Orders" component={Orders}/>
        <Stack.Screen name="CreateOrder" component={CreateOrder}/>
        <Stack.Screen name="CreateItens" component={CreateItens}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};


export default App;
