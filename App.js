import React from 'react';
import 'react-native-gesture-handler';
import Home from './src/components/home/Home';
import Orders from './src/components/orders/Orders';
import CreateOrder from './src/components/createOrder/CreateOrder';
import CreateItens from './src/components/createItens/CreateItens';
import ItensOrder from './src/components/itensOrder/ItensOrder';
import {ContextApp} from './src/providers/ContextApp';
import Icon from 'react-native-vector-icons/Feather';


import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';


const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabsComponent() {
  return (
    <Tab.Navigator detachInactiveScreens screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'E-Commerce') {
          iconName = "home"
        } else if (route.name === 'Pedidos Offline') {
          iconName = "wifi-off"
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
    })}>
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
          <Stack.Screen name="ItensOrder" component={ItensOrder} />
          <Stack.Screen name="CreateOrder" component={CreateOrder} />
          <Stack.Screen name="CreateItens" component={CreateItens} />
        </Stack.Navigator>
      </NavigationContainer>
    </ContextApp>
  );
}

export default App;
