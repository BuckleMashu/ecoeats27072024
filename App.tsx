import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ViewDataScreen from './src/screens/ViewDataScreen';
import SharingScreen from './src/screens/SharingScreen';

//navigaton bar
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button,StyleSheet,Text,View,} from 'react-native';

export type RootStackParamList = {
  Home: undefined;
  Details: undefined;
  ViewData: undefined;
  Sharing: undefined;
};

//const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="ViewData" component={ViewDataScreen} />
      </Stack.Navigator> */}
      <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        tabBarActiveTintColor: '#f5f5f5',
        tabBarInactiveTintColor: '#2e2e2e',
        tabBarActiveBackgroundColor: '#1a1919',
      }}
      >
      <Tab.Screen
        name="Sharing"
        component={SharingScreen}
        // options={{
        //   tabBarLabel: 'Home',
        //   tabBarIcon: () => (
        //     <Entypo name="home" size={24} color="black" />
        //   ),
        // }}
        options={{
          tabBarLabel: 'Sharing',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
          title: 'Sharing', 
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        // options={{
        //   tabBarLabel: 'Home',
        //   tabBarIcon: () => (
        //     <Entypo name="home" size={24} color="black" />
        //   ),
        // }}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Details"
        component={DetailsScreen}
        // options={{
        //   tabBarLabel: 'Details',
        //   tabBarIcon: ({ color, size }) => (
        //     <MaterialCommunityIcons name="bell" color={color} size={size} />
        //   ),
        // }}
      />
      <Tab.Screen
        name="ViewData"
        component={ViewDataScreen}
        // options={{
        //   tabBarLabel: 'ViewData',
        //   tabBarIcon: ({ color, size }) => (
        //     <MaterialCommunityIcons name="account" color={color} size={size} />
        //   ),
        // }}
      />
    </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;