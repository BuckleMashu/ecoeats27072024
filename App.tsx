import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from './src/screens/ExploreScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ViewDataScreen from './src/screens/ViewDataScreen';
import SharingScreen from './src/screens/SharingScreen';
import RequestScreen from './src/screens/RequestScreen';
import AddDealScreen from './src/screens/AddDealScreen';  
import DealDetailsScreen from './src/screens/DealDetailsScreen';  
import AddExplorePostScreen from './src/screens/AddExplorePostScreen'; 
import LoginScreen from './src/screens/LoginScreen'; 
import UserScreen from './src/screens/UserScreen';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { share_page, deal_page, explore_page } from './src/models'; 
import ExploreDetailsScreen from './src/screens/ExploreDetailsScreen';

export type RootStackParamList = {
  MainTabs: undefined;
  Explore: undefined;
  Details: undefined;
  ViewData: undefined;
  Sharing: undefined;
  Request: { post: share_page };
  User: { userID: any };
  AddDeal: undefined;
  DealDetails: { deal: deal_page }; 
  AddExplorePost: undefined; 
  ExploreDetails: { explore: explore_page }; 
  Login: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// Main Tab Navigator
function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Explore"
      screenOptions={{
        tabBarActiveTintColor: '#f5f5f5',
        tabBarInactiveTintColor: '#2e2e2e',
        tabBarActiveBackgroundColor: '#1a1919',
      }}
    >
      <Tab.Screen
        name="Sharing"
        component={SharingScreen}
        options={{
          tabBarLabel: 'Sharing',
          tabBarIcon: ({ color, size }) => (
            <Icon name="info-circle" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={ExploreScreen}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({ color, size }) => (
            <Icon name="compass" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          tabBarLabel: 'Details',
          tabBarIcon: ({ color, size }) => (
            <Icon name="database" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="UserStack" // Creating a stack within the tab for the User flow
        component={UserStackNavigator}
        options={{
          tabBarLabel: 'User',
          tabBarIcon: ({ color, size }) => (
            <Icon name="user" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

// User Stack Navigator
const UserStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: false }}  // Show login first
      />
      <Stack.Screen 
        name="User" 
        component={UserScreen} 
        options={{ headerShown: false }}  // After login, show User screen
      />
    </Stack.Navigator>
  );
};

// Main App Component
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="MainTabs">
        <Stack.Screen 
          name="MainTabs" 
          component={MainTabNavigator} 
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Request" component={RequestScreen} />
        <Stack.Screen name="AddDeal" component={AddDealScreen} />
        <Stack.Screen name="DealDetails" component={DealDetailsScreen} />
        <Stack.Screen name="AddExplorePost" component={AddExplorePostScreen} />
        <Stack.Screen name="ExploreDetails" component={ExploreDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
