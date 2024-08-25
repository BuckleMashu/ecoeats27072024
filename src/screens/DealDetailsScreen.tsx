import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useColorScheme } from 'react-native';
import { RootStackParamList } from '../../App';

type DealDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'DealDetails'
>;

type DealDetailsScreenRouteProp = RouteProp<RootStackParamList, 'DealDetails'>;

type Props = {
  navigation: DealDetailsScreenNavigationProp;
  route: DealDetailsScreenRouteProp;
};

const { width: screenWidth } = Dimensions.get('window');

const DealDetailsScreen: React.FC<Props> = ({ route }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { deal } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.contentContainer}>
          <Image
            style={styles.image}
            source={deal.picture ? { uri: deal.picture } : {uri:'https://i.imgur.com/50exbMa.png'}}
          />
          <Text style={styles.title}>{deal.title}</Text>
          <Text style={styles.description}>{deal.description}</Text>
          <Text style={styles.dateCreated}>Date Created: {deal.date_created}</Text>

          {/* Comment Section - Removed from the deals page */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(250,250,250)',
  },
  contentContainer: {
    padding: 20,
  },
  image: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.5,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  dateCreated: {
    fontSize: 14,
    color: 'gray',
  },
});

export default DealDetailsScreen;
