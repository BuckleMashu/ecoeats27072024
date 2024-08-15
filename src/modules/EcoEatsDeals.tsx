import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import { deal_page } from '../models';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const DealComponent: React.FC<{
  deal: deal_page;
  picture: any;
}> = ({ deal: { title, description, deal_Id }, picture }) => {
  return (
    <View style={styles.dealContainer}>
      <Image style={styles.image} source={picture} />
      <View style={styles.dealTextContainer}>
        <Text style={styles.sectionTitle}>
          {title}
        </Text>
        <Text style={styles.description}>
          {description}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dealContainer: {
    width: screenWidth * 0.45,
    height: screenHeight * 0.27,
    marginTop: 10,
    paddingHorizontal: 7.5,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  dealTextContainer: {
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    overflow: 'hidden',
  },
  description: {
    fontSize: 14,
    color: 'gray',
    overflow: 'hidden',
  },
  image: {
    width: screenWidth * 0.4,
    height: screenHeight * 0.2,
    borderRadius: 10,
  },
});
