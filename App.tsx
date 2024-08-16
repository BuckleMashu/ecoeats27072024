import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from './src/screens/ExploreScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import ViewDataScreen from './src/screens/ViewDataScreen';
import SharingScreen from './src/screens/SharingScreen';
import AddShareScreen from './src/screens/AddShareItem';
import RequestScreen from './src/screens/RequestScreen';
import AddDealScreen from './src/screens/AddDealScreen';  
import DealDetailsScreen from './src/screens/DealDetailsScreen';  
import AddExplorePostScreen from './src/screens/AddExplorePostScreen'; 

import UserScreen from './src/screens/UserScreen';

// Navigation bar
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { share_page, userD, deal_page, explore_page } from './src/models'; // Import all necessary models
import ExploreDetailsScreen from './src/screens/ExploreDetailsScreen';

//image importer testing
import RNFS from 'react-native-fs';
import localImages from './src/imageImports';


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
  AddShare: {currentUserID: any}
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

// export const copyImagesToDocumentDirectory = async () => {

// Define the paths
// const projectRootImageDir = `${RNFS.MainBundlePath}/src/images`; // Update as needed
// const documentImageDir = `${RNFS.DocumentDirectoryPath}/images`;

// Function to copy images from the root to the document directory
// const copyImagesToDocumentDirectory = async () => {
//   try {
//     // Ensure the document directory exists
//     await RNFS.mkdir(documentImageDir);

//     // List all image files in the project root directory
//     const rootFiles = await RNFS.readDir(projectRootImageDir);
//     const imageFiles = rootFiles.filter(file => /\.(jpg|jpeg|png|gif)$/i.test(file.name));

//     // Copy each image to the document directory
//     for (const file of imageFiles) {
//       const sourcePath = file.path;
//       const destPath = `${documentImageDir}/${file.name}`;
//       await RNFS.copyFile(sourcePath, destPath);
//     }

//     console.log('Images copied successfully');
//   } catch (error) {
//     console.error('Error copying images:', error);
//   }
// };

// Main Tab Navigator
function MainTabNavigator() {
  return (
    <Tab.Navigator
      initialRouteName="Sharing"
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
        name="User"
        component={UserScreen}
        initialParams={{ userID: 1 }}
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

// Main App Component
const App = () => {
  // useEffect(() => {
  //   // Call the function to copy images when the app initializes
  //   const copyImage = async () => {
  //     try {
  //       // Source path (adjust according to your actual paths)
  //       const sourcePath = localImages['share1.png']; // Ensure this is accessible or bundled correctly
  //       const destinationPath = RNFS.DocumentDirectoryPath + '/share1.png';

  //       // If you have the image in the assets folder, you need to use the file URI or remote URL
  //       // Typically you would handle this with a bundle or a server URL

  //       // For local assets, you'd use a different strategy
  //       // Here, we're simulating the idea of copying an image at build time or from a URL
  //       // Use the correct method for copying from assets or another source
  //       await RNFS.copyFile(sourcePath, destinationPath);

  //       console.log('Image copied successfully:', destinationPath);
  //     } catch (error) {
  //       console.error('Error copying image:', error);
  //     }
  //   };

  //   copyImage();
  // }, []); // The empty dependency array ensures this runs only once
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="MainTabs" 
          component={MainTabNavigator} 
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Explore" component={ExploreScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
        <Stack.Screen name="Sharing" component={SharingScreen}/>
        <Stack.Screen name="Request" component={RequestScreen} />
        <Stack.Screen name="AddShare" component={AddShareScreen} />
        <Stack.Screen name="User" component={UserScreen} />
        <Stack.Screen name="AddDeal" component={AddDealScreen} />
        <Stack.Screen name="DealDetails" component={DealDetailsScreen} />
        <Stack.Screen name="AddExplorePost" component={AddExplorePostScreen} />
        <Stack.Screen name="ExploreDetails" component={ExploreDetailsScreen} />

      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
