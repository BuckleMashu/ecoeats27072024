import React, { useCallback, useEffect, useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';

import { StackNavigationProp, StackActions } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { userD, share_page } from '../models';

import { ShareComponent } from '../modules/EcoEatsShare';
import { getEcoEatsDBConnection, getUserDetails, getSharePage } from '../../db-service';
import localImages from '../imageImports';

type RequestScreenRouteProp = RouteProp<RootStackParamList, 'User'>;
type RequestScreenNavigationProp = StackNavigationProp<RootStackParamList, 'User'>;

type Props = {
  navigation: RequestScreenNavigationProp;
  route: RequestScreenRouteProp;
};

const { width: screenWidth } = Dimensions.get('window');
const columnWidth = screenWidth / 2;

const UserScreen: React.FC<Props> = ({ route, navigation }) => {
  const { userID } = route.params || {};  // Ensure userID is fetched from route params safely
  const [profile, setProfile] = useState<userD | null>(null);  // Safeguard with null state
  const [shareEntity, setShareEntity] = useState<share_page[]>([]);

  const [explore, setExplore] = useState<number[]>([]);
  const [share, setShare] = useState<number[]>([]);
  const [follower, setFollower] = useState<number[]>([]);
  const [following, setFollowing] = useState<number[]>([]);

  const [postType, setPostType] = useState(true);  // share = 0, explore = 1
  let db;

  const processTextToNumberArray = (text: string) => {
    if (text) {
      let temp = text.split(',');
      let output: any[] = [];
      temp.forEach((post) => {
        output.push(Number(post));
      });
      return output;
    } else {
      return [];
    }
  };

  const loadShareCallback = useCallback(async (id: string) => {
    try {
      db = await getEcoEatsDBConnection();
      const result = await getSharePage(db, undefined, '', id);
      setShareEntity(result);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const loadDataCallback = useCallback(async (id: number) => {
    try {
      db = await getEcoEatsDBConnection();
      const result = await getUserDetails(db, id);
      setProfile(result);
      setExplore(processTextToNumberArray(result.explore_Posts));
      setShare(processTextToNumberArray(result.share_Posts));
      setFollower(processTextToNumberArray(result.followers));
      setFollowing(processTextToNumberArray(result.following));
      loadShareCallback(result.share_Posts);
    } catch (error) {
      console.error(error);
    }
  }, [loadShareCallback]);

  useEffect(() => {
    if (userID) {
      loadDataCallback(userID);
    }
  }, [userID, loadDataCallback]);

  // Logout Functionality
  const handleLogout = () => {
    navigation.dispatch(
      StackActions.replace('Login')  // Reset stack and go back to the login screen
    );
  };

  // Error handling if userID is missing
  if (!userID) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <StatusBar barStyle="dark-content" />
        <View style={styles.centeredContainer}>
          <Text style={styles.errorText}>Error: Missing userID. Please log in again.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />
      {/* Logout Button positioned in the top right corner */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
      <ScrollView contentContainerStyle={styles.scroll} contentInsetAdjustmentBehavior="automatic">
        <View style={styles.headerSec}>
          <View style={styles.profileImgSec}>
            <Image style={styles.profileImg} source={localImages[profile?.pf] || require('../images/missing.png')} />
            <Text style={styles.profileName}>{profile?.name}</Text>
            <TouchableOpacity style={styles.editPf}>
              <Text>Edit profile image</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.PFF}>
            <View styles={styles.PFFsection}>
              <Text style={styles.PFFtext}>Posts</Text>
              <Text style={styles.PFFvalue}>{explore.length + share.length}</Text>
            </View>
            <View styles={styles.PFFsection}>
              <Text style={styles.PFFtext}>Followers</Text>
              <Text style={styles.PFFvalue}>{follower.length}</Text>
            </View>
            <View styles={styles.PFFsection}>
              <Text style={styles.PFFtext}>Following</Text>
              <Text style={styles.PFFvalue}>{following.length}</Text>
            </View>
          </View>
        </View>
        <View style={styles.shareSearchSaveLike}>
          <View style={styles.shareSearch}>
            <TouchableOpacity style={styles.SSSLbutton}>
              <Text style={styles.SSSLtext}>🔗</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.SSSLbutton}>
              <Text style={styles.SSSLtext}>🔎</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.saveLike}>
            <TouchableOpacity style={styles.SSSLbutton}>
              <Text style={styles.SSSLtext}>💾</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.SSSLbutton}>
              <Text style={styles.SSSLtextHeart}>𖹭</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={styles.typeButtonsBoth}>
            <TouchableOpacity
              style={[styles.button, postType && styles.buttonPressed]}
              onPress={() => setPostType(true)}
            >
              <Text style={[styles.buttonText, postType && styles.boldText]}>Share Posts</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.button, !postType && styles.buttonPressed]}
              onPress={() => setPostType(false)}
            >
              <Text style={[styles.buttonText, !postType && styles.boldText]}>Explore Posts</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View>
          {postType ? (
            <View style={styles.postContainer}>
              {shareEntity.map((post) => (
                <TouchableOpacity
                  key={post.share_Id}
                  onPress={() => navigation.navigate('Request', { post })}
                  style={styles.itemContainer}
                >
                  <ShareComponent key={post.share_Id} share={post} picture={localImages[post.picture]} />
                </TouchableOpacity>
              ))}
            </View>
          ) : (
            <View style={styles.postContainer}>
              <Text>No Explore Posts Available</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scroll: {
    paddingBottom: 40,
  },
  centeredContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 18,
    color: 'red',
  },
  headerSec: {
    width: '100%',
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  profileImgSec: {
    flexDirection: 'column',
    paddingLeft: '10%',
  },
  profileImg: {
    width: screenWidth * 0.2,
    height: screenWidth * 0.2,
    borderRadius: 100,
    overflow: 'hidden',
  },
  logoutButton: {
    position: 'absolute',  // Positioning the button absolutely
    top: 60,
    right: 10,
    backgroundColor: 'red',
    padding: 10,
    borderRadius: 5,
    zIndex: 10,  // Ensures the button stays on top
  },
  logoutButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  PFF: {
    flexDirection: 'row',
    paddingRight: '10%',
    gap: 10,
  },
  shareSearchSaveLike: {
    width: '100%',
    flexDirection: 'row',
    backgroundColor: 'white',
    marginTop: 2,
    marginBottom: 2,
  },
  shareSearch: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  saveLike: {
    width: '50%',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  SSSLtext: {},
  SSSLtextHeart: {},
  typeButtonsBoth: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  button: {
    width: '50%',
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'black',
    fontSize: 16,
  },
  boldText: {
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  buttonPressed: {
    backgroundColor: 'gray',
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
});

export default UserScreen;
