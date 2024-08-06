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
  Dimensions,
  Modal
} from 'react-native';

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import { userD,share_page } from '../models';

import { ShareComponent } from '../modules/EcoEatsShare';
import { getEcoEatsDBConnection, getUserDetails, getSharePage} from '../../db-service';
import localImages from '../imageImports';
import { Picker } from '@react-native-picker/picker';

type RequestScreenRouteProp = RouteProp<
   RootStackParamList, 
   'User'
>;
type RequestScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'User'
>;

type Props = {
  navigation: RequestScreenNavigationProp;
  route: RequestScreenRouteProp; 
};

const { width } = Dimensions.get('window');
const columnWidth = width / 2;

const UserScreen: React.FC<Props> = ({ route,navigation }) => {
  const { userID } = route.params;
  const isDarkMode = useColorScheme() === 'dark';
  const [profile, setProfile] = React.useState<userD>();
  const [shareEntity, setShareEntity] = React.useState<share_page[]>([]);

  const [explore, setExplore] = React.useState<number[]>([]);
  const [share, setShare] = React.useState<number[]>([]);
  const [follower, setFollower] = React.useState<number[]>([]);
  const [following, setFollowing] = React.useState<number[]>([]);

  const [postType, setPostType] = useState(true); //share = 0, explore = 1

  let db;

  const processTextToNumberArray = (text:string) => {
    if(text){
      let temp = text.split(",");
      let output : any[] = [];
      temp.forEach((post)=>{
        output.push(Number(post));
      });
      return output;
    }else{
      return [];
    }
  };

  const loadShareCallback = useCallback(async (id:string) =>{
    try{
      db = await getEcoEatsDBConnection();
      const result = await getSharePage(db,undefined,"",id);
      setShareEntity(result);
    } catch(error){
      console.error(error);
    }
  },[]);

  const loadDataCallback = useCallback(async (id:number) =>{
    try{
        db = await getEcoEatsDBConnection();
        const result = await getUserDetails(db,id);
        setProfile(result);
        setExplore(processTextToNumberArray(result.explore_Posts));
        setShare(processTextToNumberArray(result.share_Posts));
        setFollower(processTextToNumberArray(result.followers));
        setFollowing(processTextToNumberArray(result.following));
        loadShareCallback(result.share_Posts);
    } catch(error){
        console.error(error);
    }
  },[]);

  useEffect(()=>{
    loadDataCallback(userID);
  },[loadDataCallback]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
  
        <ScrollView contentContainerStyle={styles.scroll} contentInsetAdjustmentBehavior="automatic">
          <Text>{userID}</Text>
          <View>
            <Image source={localImages[profile?.pf] || require('../images/missing.png')}/>
            <View>
              <Text>{profile?.name}</Text>
              <View>
                <Text>Posts: {explore.length + share.length}</Text>
                <Text>Followers: {follower.length}</Text>
                <Text>Following: {following.length}</Text>
              </View>
            </View>
          </View>
            {/* adds a button to change profile picture here */}
          <View>
            {/* This section is for the share, save, like, and search button */}
          </View>
          <View>
            <View style={styles.typeButtonsBoth}>
              <TouchableOpacity style={[styles.button, postType && styles.buttonPressed,]} onPress={() => setPostType(true)}>
                  <Text style={[styles.buttonText, postType && styles.boldText]}>Share Posts</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.button, !postType && styles.buttonPressed,]} onPress={() => setPostType(false)}>
                <Text style={[styles.buttonText, !postType && styles.boldText]}>Explore Posts</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {postType === true?(
              <View style={styles.postContainer}>
                {shareEntity.map((post) =>(
                  <TouchableOpacity key={post.share_Id} onPress={() => navigation.navigate('Request',{post})} style={styles.itemContainer}>
                    <View>
                      <ShareComponent key={post.share_Id} share={post} picture={localImages[post.picture]}/>
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            ):(
              <View style={styles.postContainer}>
                <Text>Skibidi</Text>
              </View>
            )}
          </View>
        </ScrollView>
    
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  safeArea:{
      flex:1
  },
  scroll:{
      paddingBottom: 40,
  },
  typeButtonsBoth:{
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    width: '100%',
  },
  button:{
    width: '50%',
    backgroundColor: 'white',
    padding: 10,
    alignItems: 'center',
  },
  buttonText:{
    color: 'black',
    fontSize: 16,
  },
  boldText:{
    fontWeight: 'bold',
    color: 'white',
    fontSize: 20,
  },
  buttonPressed:{
    backgroundColor: 'gray',
  },
  postContainer:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
    // backgroundColor:'blue',
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
  },
  itemContainer:{
    width: columnWidth - 15, // Adjust for padding/margin
  },
});

export default UserScreen;