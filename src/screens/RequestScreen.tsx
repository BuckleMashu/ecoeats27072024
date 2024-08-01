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
  TouchableOpacity
} from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { request_page } from '../models';

import { getEcoEatsDBConnection, getRequestPage} from '../../db-service';
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

const RequestScreen = ({ route,navigation } : Props) => {
  const { post } = route.params;
  const isDarkMode = useColorScheme() === 'dark';
  const [requestEntity, setRequestEntity] = React.useState<request_page>();
  let db;
  const loadDataCallback = useCallback(async (id:number) =>{
    try{
        db = await getEcoEatsDBConnection();
        const result = await getRequestPage(db,id);
        setRequestEntity(result);
    } catch(error){
        console.error(error);
    }
  },[]);

  useEffect(()=>{
    loadDataCallback(post.share_Id);
  },[loadDataCallback]);

  return (
    <View>
      <Text>REQUEST PAGE FOR ITEM SHARE{String(post.share_Id)}</Text>
      <Text>{post.title}</Text>
      <Image source={localImages[post.picture]}/>
      <Text>{post.expiration}</Text>
      <Text>{requestEntity?.description}</Text>
      {/* Render other post details as needed */}
      <Button
                    title="Request"
                    color="#841584"
                    accessibilityLabel=""
                />
    </View>
  );
};

export default RequestScreen;