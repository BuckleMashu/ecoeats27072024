import React from 'react';
import {
  Button,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';
import { share_page } from '../models';
export const ShareComponent: React.FC<{
  share: share_page;
  picture:any;
}> = ({ share: {title,address} , picture}) => {
  // const displayImg = {uri:`../images/${picture}`};
  return (
    <View style={styles.todoContainer}>
      <View style={styles.todoTextContainer}>
        <Text
          style={styles.sectionTitle}>
          {title}, {address} 
        </Text>
      </View>
      <Image source={picture}/>
    </View>
  );
};
const styles = StyleSheet.create({
  todoContainer: {
    marginTop: 10,
    paddingHorizontal: 24,
    backgroundColor: 'deepskyblue',
    marginLeft: 20,
    marginRight: 20,
    borderRadius: 10,
    borderColor: 'black',
    borderWidth: 1,
  },
  todoTextContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '400',
  }
});