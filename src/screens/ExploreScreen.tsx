import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

import { ExploreComponent } from '../modules/EcoEatsExplore'; // Create this component similar to DealComponent
import { explore_page } from '../models'; // Create this model similar to deal_page
import { getEcoEatsDBConnection, getExplorePage } from '../../db-service'; // Create functions similar to getDealsPage
import { Searchbar } from 'react-native-paper';

import localImages from '../imageImports';

type ExploreScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Explore'
>;

type Props = {
  navigation: ExploreScreenNavigationProp;
};

const { width } = Dimensions.get('window');
const columnWidth = width / 2;

const ExploreScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [exploreEntity, setExploreEntity] = useState<explore_page[]>([]);
  let db: any;  // Make sure to define the type for db if needed

  const loadDataCallback = useCallback(async (searchR: string) => {
    try {
      db = await getEcoEatsDBConnection();
      const result = await getExplorePage(db, searchR);
      setExploreEntity(result);
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    loadDataCallback(searchQuery);
  }, [loadDataCallback, searchQuery]);

  return (
    <SafeAreaView>
      <StatusBar />
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
            onPress={() => navigation.navigate('AddExplorePost')}
          >
            <Text style={styles.plusButtonText}>+</Text>
          </TouchableOpacity>
          <View style={styles.postContainer}>
            {exploreEntity.map((explore) => (
              <TouchableOpacity
                key={explore.explore_Id}
                onPress={() => navigation.navigate('ExploreDetails', { explore })}
                style={styles.itemContainer}
              >
                <View>
                  <ExploreComponent
                    key={explore.explore_Id}
                    explore={explore}
                    picture={
                      localImages[explore.picture] || require('../images/missing.png')
                    }
                  />
                </View>
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
});

export default ExploreScreen;
