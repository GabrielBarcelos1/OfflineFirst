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
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';





const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

function TabsComponent() {
  
  return (
    <Tab.Navigator detachInactiveScreens   screenOptions={({ route }) => ({
      tabBarIcon: ({ focused, color, size }) => {
        let iconName;

        if (route.name === 'E-Commerce') {
          iconName = "home"
        } else if (route.name === 'Pedidos Offline') {
          iconName = "wifi-off"
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      
    })}
    tabBarOptions={{
      activeTintColor: '#184077',
      inactiveTintColor: 'gray',
    }}>
      <Tab.Screen name="E-Commerce" component={Home}  />
      <Tab.Screen name="Pedidos Offline" component={Orders} />
    </Tab.Navigator>
  );
}

function App() {
  function getHeaderDisplay(route) {
    // If the focused route is not found, we need to assume it's the initial screen
    // This can happen during if there hasn't been any navigation inside the screen
    // In our case, it's "Feed" as that's the first screen inside the navigator
    const routeName = getFocusedRouteNameFromRoute(route) ?? 'E-Commerce';
    switch (routeName) {
      case 'E-Commerce':
        return false;
      case 'Pedidos Offline':
        return true;
    }
  }
  return (
    <ContextApp>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          <Stack.Screen
            name="Home"
            component={TabsComponent}
            options={({ route }) => ({
              headerStyle: {
                    backgroundColor: '#184077',
                  },
                  headerTintColor: '#fff',
                  headerTitleStyle: {
                    fontWeight: 'bold',
                  },
              headerTitle: "Meus pedidos",
              headerShown: getHeaderDisplay(route)
            })}
            // options={{
            //   title: 'Meus pedidos',
            //   headerStyle: {
            //     backgroundColor: '#184077',
            //   },
            //   headerTintColor: '#fff',
            //   headerTitleStyle: {
            //     fontWeight: 'bold',
            //   },
            // }}
            
          />
          <Stack.Screen name="ItensOrder" component={ItensOrder} options={{
          title: 'Itens do Pedidos',
          headerStyle: {
            backgroundColor: '#184077',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
          <Stack.Screen name="CreateOrder" component={CreateOrder} options={{
          title: 'Criar Pedido',
          headerStyle: {
            backgroundColor: '#184077',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
          <Stack.Screen name="CreateItens" component={CreateItens} options={{
          title: 'Criar Itens',
          headerStyle: {
            backgroundColor: '#184077',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}/>
        </Stack.Navigator>
      </NavigationContainer>
    </ContextApp>
  );
}

export default App;
