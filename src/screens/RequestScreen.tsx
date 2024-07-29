import React from 'react';
import { View, Text } from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

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

  return (
    <View>
      <Text>REQUEST PAGE FOR ITEM SHARE{String(post.share_Id)}</Text>
      <Text></Text>
      {/* Render other post details as needed */}
    </View>
  );
};

export default RequestScreen;