import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {useNavigation} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SplashScreen from './src/screen/SplashScreen';
import Login from './src/screen/Login';
import Register from './src/screen/Register';
import Details from './src/screen/Details';
import AddList from './src/screen/AddList';
import apiConfig from './src/screen/apiConfig';
import Homepage from './src/screen/HomePage';
import Account from './src/screen/Account';
import EditPassword from './src/screen/EditPassword';
import EditList from './src/screen/EditList';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const RootHome = () => {
  const navigation = useNavigation();
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: 'white',
        headerShown: false,
        tabBarStyle: {
          backgroundColor: 'black',
        },
      }}>
      <Tab.Screen
        name="Home"
        component={Homepage}
        options={{
          tabBarLabel: 'Details',
          tabBarIcon: ({color, size}) => (
            <Icon name="notes-medical" color={'#5CE1E6'} size={25} />
          ),
        }}
      />
      <Tab.Screen
        name="Account"
        component={Account}
        options={{
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user-large" color={'#5CE1E6'} size={24} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Details" component={Details} />
        <Stack.Screen name="AddList" component={AddList} />
        <Stack.Screen name="apiConfig" component={apiConfig} />
        <Stack.Screen name="HomePage" component={RootHome} />
        <Stack.Screen name='Account' component={RootHome}/>
        <Stack.Screen name='EditPassword' component={EditPassword}/>
        <Stack.Screen name='EditList' component={EditList}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
