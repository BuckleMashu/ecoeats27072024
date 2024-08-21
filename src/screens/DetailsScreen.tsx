import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TouchableOpacity,
  Dimensions,
  Image, // Import Image component
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

import { DealComponent } from '../modules/EcoEatsDeals';
import { deal_page } from '../models';
import { getEcoEatsDBConnection, getDealsPage } from '../../db-service';
import { Searchbar } from 'react-native-paper';

import localImages from '../imageImports';

import { useIsFocused } from '@react-navigation/native';

type DetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Details'
>;

type Props = {
  navigation: DetailsScreenNavigationProp;
};

const { width } = Dimensions.get('window');
const columnWidth = width / 2;

const DetailsScreen: React.FC<Props> = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [searchQuery, setSearchQuery] = React.useState("");
  const [dealsEntity, setDealsEntity] = React.useState<deal_page[]>([]);
  let db;

  const loadDataCallback = useCallback(async (searchR: string) => {
    try {
      db = await getEcoEatsDBConnection();
      const result = await getDealsPage(db, searchR);
      setDealsEntity(result);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) {
      loadDataCallback(searchQuery);
    }
  }, [loadDataCallback, searchQuery, isFocused]);

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.container}>
          <View style={styles.search}>
            <Searchbar
              style={styles.searchbar}
              placeholder="Search"
              onChangeText={setSearchQuery}
              value={searchQuery}
            />
          </View>
          <TouchableOpacity
            style={styles.plusButton}
            onPress={() => navigation.navigate('AddDeal')}
          >
            <Text style={styles.plusButtonText}>+</Text>
          </TouchableOpacity>
          <View style={styles.postContainer}>
            {dealsEntity.map((deal) => (
              <TouchableOpacity
                key={deal.deal_Id}
                onPress={() => navigation.navigate('DealDetails', { deal })}
                style={styles.itemContainer}
              >
                <DealComponent
                  key={deal.deal_Id}
                  deal={deal}
                  picture={deal.picture}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'rgb(250,250,250)',
    flex: 1,
  },
  search: {
    paddingTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  searchbar: {
    width: width * 0.95,
    borderRadius: width * 0.05,
    borderColor: 'gray',
    borderWidth: 1.5,
    backgroundColor: 'white',
    opacity: 0.6,
  },
  postContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
  itemContainer: {
    width: columnWidth - 15,
  },
  plusButton: {
    backgroundColor: 'blue',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 20,
    bottom: 20,
    zIndex: 1,
  },
  plusButtonText: {
    color: 'white',
    fontSize: 30,
  },
  image: {
    width: columnWidth - 15,
    height: columnWidth - 15,
    borderRadius: 10,
    marginBottom: 10,
  },
});

export default DetailsScreen;
