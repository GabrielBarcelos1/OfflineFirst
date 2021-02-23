import React from 'react';
import 'react-native-gesture-handler';
import Home from './src/components/home/Home';
import Orders from './src/components/orders/Orders';
import CreateOrder from './src/components/createOrder/CreateOrder';
import CreateItens from './src/components/createItens/CreateItens';
import {ContextApp} from './src/providers/ContextApp';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabsComponent() {
  return (
    <Tab.Navigator detachInactiveScreens>
      <Tab.Screen name="E-Commerce" component={Home} />
      <Tab.Screen name="Pedidos Offline" component={Orders} />
    </Tab.Navigator>
  );
}

function App() {
  return (
    <ContextApp>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={TabsComponent}
            options={{headerShown: false}}
          />
          <Stack.Screen name="CreateOrder" component={CreateOrder} />
          <Stack.Screen name="CreateItens" component={CreateItens} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextApp>
  );
}

export default App;
