import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions
} from 'react-native';
import { share_page } from '../models';
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
export const ShareComponent: React.FC<{
  share: share_page;
  picture:any;
}> = ({ share: {title,address,share_Id,expiration} , picture}) => {
  return (
    <View style={styles.todoContainer}>
      <View style={styles.todoTextContainer}>
        <Text
          style={styles.sectionTitle}>
          {title}, {expiration}
        </Text>
      </View>
      <Image style={styles.image} source={picture}/>
    </View>
  );
};
const styles = StyleSheet.create({
  todoContainer: {
    width: screenWidth*0.45,
    height:screenHeight*0.27,
    marginTop: 10,
    paddingHorizontal: 7.5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  todoTextContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '400',
  },
  image:{
    width: screenWidth*0.4,
    height:screenHeight*0.2,
    borderRadius: 10,
  }
});