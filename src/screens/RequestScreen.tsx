import React, { useCallback, useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { request_page,user } from '../models';

import { getEcoEatsDBConnection, getRequestPage, getUserDetails} from '../../db-service';
import localImages from '../imageImports';

type RequestScreenRouteProp = RouteProp<
   RootStackParamList, 
   'Request'
>;
type RequestScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Request'
>;

type Props = {
  navigation: RequestScreenNavigationProp;
  route: RequestScreenRouteProp; 
};
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const RequestScreen = ({ route,navigation } : Props) => {
  const { post } = route.params;
  const isDarkMode = useColorScheme() === 'dark';
  const [requestEntity, setRequestEntity] = React.useState<request_page>();
  const [userPicture, setUserPF] = React.useState<string>();
  const [userName, setUserName] = React.useState<string>();
  let db;
  const loadDataCallback = useCallback(async (id:number) =>{
    try{
        db = await getEcoEatsDBConnection();
        const result1 = await getRequestPage(db,id);
        setRequestEntity(result1);
        const result2 = await getUserDetails(db,result1.user_Id);
        setUserPF(result2.pf);
        setUserName(result2.name);
    } catch(error){
        console.error(error);
    }
  },[]);
  // const profilePicture = useCallback(async (id:number) =>{
  //   try{
  //       db = await getEcoEatsDBConnection();
  //       const result = await getUserDetails(db,id);
  //       setUserPF(result.pf);
  //   } catch(error){
  //       console.error(error);
  //   }
  // },[]);

  useEffect(()=>{
    loadDataCallback(post.share_Id);
  },[loadDataCallback]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <View style={styles.All}>
        <ScrollView contentContainerStyle={styles.scroll} contentInsetAdjustmentBehavior="automatic">
          <View style={styles.container}>
            {/* <Text>REQUEST PAGE FOR ITEM SHARE{String(post.share_Id)}</Text> */}
            <Image style={styles.mainImage} source={localImages[post.picture] || require('../images/missing.png')}/>
            <View style={styles.middleDetails}>
              <Image style={styles.pf} source={localImages[userPicture] || require('../images/missing.png')}/>
              <View style={styles.titleNexpiration}>
                <Text style={styles.title}>{post.title}</Text>
                <Text style={styles.expiration}>Expiration date: {post.expiration}</Text>
              </View>
            </View>
            <TouchableOpacity>
            {/* onPress={() => navigation.navigate('Request',{post})} */}
              <Text style={styles.username}>{userName}</Text>
            </TouchableOpacity>
            <Text style={styles.description}>{requestEntity?.description}</Text>
            {/* Render other post details as needed */}
          </View>
        </ScrollView>
        <View style={styles.chatNrequest}>
        <TouchableOpacity style={styles.endButton}>
          <Text style={styles.endButtonText}>Chat</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.endButton}>
          <Text style={styles.endButtonText}>Request</Text>
        </TouchableOpacity>      
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea:{
    flex:1
  },
  All:{
    flex:1
  },
  container:{
    padding:screenWidth*0.05,
    backgroundColor: 'rgb(250,250,250)',
    // height:screenHeight*0.9,
    flexGrow:1,
    flex:1,
  },
  scroll:{
    // flexGrow: 1,
    paddingBottom: 40,
  },
  mainImage:{
    width: screenWidth*0.9,
    height:screenWidth*0.9,
    borderColor:'black',
    borderWidth:2,
    borderRadius: screenWidth*0.1,
    overflow:'hidden',
  },
  pf:{
    width: screenWidth*0.1,
    height:screenWidth*0.1,
    borderRadius:100,
    overflow:'hidden',
  },
  title:{
    fontWeight: 'bold',
    fontSize:16,
  },
  expiration:{
    textDecorationLine:'underline',
    fontSize:16,
  },
  middleDetails:{
    flexDirection: 'row',
    // justifyContent: 'space-evenly',
    width: '100%',
    paddingTop: screenWidth*0.025,
    paddingBottom: screenWidth*0.025,
  },
  titleNexpiration:{
    paddingLeft:screenWidth*0.05,
  },
  username:{
    fontWeight: 'bold',
    fontStyle:'italic',
    fontSize:20,
  },
  description:{
    padding:10,
    fontSize:16,
  },
  chatNrequest:{
    flexDirection: 'row',
    alignSelf:'flex-end',
    position:'absolute',
    bottom:10,
    padding:10,
    // borderTopWidth:1,
  },
  endButton:{
    backgroundColor: '#841584',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  endButtonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RequestScreen;