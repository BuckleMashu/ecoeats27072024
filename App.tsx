import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ViewDataScreen from './src/screens/ViewDataScreen';
import SharingScreen from './src/screens/SharingScreen';
import RequestScreen from './src/screens/RequestScreen';

//navigaton bar
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Button,StyleSheet,Text,View,} from 'react-native';
import { share_page } from './src/models';

export type RootStackParamList = {
  MainTabs: undefined;
  Home: undefined;
  Details: undefined;
  ViewData: undefined;
  Sharing: undefined;
  Request: {post:share_page};
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//     <Stack.Navigator 
//     // initialRouteName='MainTabs'
//     >
//       <Stack.Screen name="MainTabs" component={TabBar} options={{headerShown:false}}/>
//       <Stack.Screen name="Home" component={HomeScreen} />
//       <Stack.Screen name="Details" component={DetailsScreen} />
//       <Stack.Screen name="ViewData" component={ViewDataScreen} />
//       <Stack.Screen name="Request" component={RequestScreen}/>
//     </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// const TabBar = () =>{
//   return(
//         <Tab.Navigator
//         initialRouteName="Home"
//         screenOptions={{
//           tabBarActiveTintColor: '#f5f5f5',
//           tabBarInactiveTintColor: '#2e2e2e',
//           tabBarActiveBackgroundColor: '#1a1919',
//         }}
//         >
//         <Tab.Screen
//           name="Sharing"
//           component={SharingScreen}
//           options={{
//             tabBarLabel: 'Sharing',
//             tabBarIcon: ({ color, size }) => (
//               <MaterialCommunityIcons name="home" color={color} size={size} />
//             ),
//             title: 'Sharing', 
//           }}
//         />
//         <Tab.Screen
//           name="Home"
//           component={HomeScreen}
//           options={{
//             tabBarLabel: 'Home',
//             tabBarIcon: ({ color, size }) => (
//               <MaterialCommunityIcons name="home" color={color} size={size} />
//             ),
//           }}
//         />
//         <Tab.Screen
//           name="ViewData"
//           component={ViewDataScreen}
//         />
//       </Tab.Navigator>
//   )
// }

// export default App;

//Add the pages to be displayed on the 
function MainTabNavigator() {
  return (
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
        options={{
          tabBarLabel: 'Sharing',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="share" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
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
        options={{
          tabBarLabel: 'Details',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="database" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

//Add pages that want to be navigated to but dont want to be displayed on the bottom nav bar
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="MainTabs" 
          component={MainTabNavigator} 
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Request" component={RequestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;