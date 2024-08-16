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

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
const columnWidth = screenWidth / 2;

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
          <View style={styles.headerSec}>
            <View style= {styles.profileImgSec}>
              <Image style={styles.profileImg} source={{uri:profile?.pf || 'https://i.imgur.com/50exbMa.png'}}/>
              <Text style={styles.profileName}>{profile?.name}</Text>
              <TouchableOpacity style={styles.editPf}>
                <Text style={styles.editPfText}>Edit profile image</Text>
              </TouchableOpacity>  
            </View>
            <View style={styles.PFF}>
              <View style={styles.PFFsection}>
                <Text style={styles.PFFtext}>Posts</Text>
                <Text style={styles.PFFvalue}>{explore.length + share.length}</Text>
              </View>
              <View style={styles.PFFsection}>
                <Text style={styles.PFFtext}>Followers</Text>
                <Text style={styles.PFFvalue}>{follower.length}</Text>
              </View>
              <View style={styles.PFFsection}>
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
                <Text style={styles.SSSLtext}>🖤</Text>
              </TouchableOpacity>   
            </View>
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
                      <ShareComponent key={post.share_Id} share={post} picture={post.picture}/>
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

  headerSec:{
    width:'100%',
    backgroundColor: 'white',
    flexDirection:'row',
    // marginLeft:'auto',
    // marginRight: 'auto',
    justifyContent: 'space-between',
    // marginLeft:screenWidth/3,
  },

  profileImgSec:{
    flexDirection:'column',
    // width:'50%',
    paddingLeft:'10%',
    // alignItems:"flex-start",
  },
  profileImg:{
    width: screenWidth*0.2,
    height:screenWidth*0.2,
    borderRadius:100,
    overflow:'hidden',
  },

  profileName:{
    fontSize:16,
    fontWeight:'bold',
  },

  editPfText:{
    color:'lightblue',
  }, 

  PFF:{
    // width: '50%',
    // padding:'2%',
    flexDirection:'row',
    paddingRight:'10%',
    gap:10,
  },

  PFFsection:{
    flexDirection:'column',
    justifyContent: 'center',
    alignItems:'center',
  },

  PFFtext:{
    fontSize:16,
    fontWeight:'bold',
  },

  shareSearchSaveLike:{
    width:'100%',
    flexDirection:'row',
    backgroundColor: 'white',
    marginTop:2,
    marginBottom:2,
  },

  shareSearch:{
    width:'50%',
    flexDirection:'row',
    justifyContent: 'flex-start',
  },

  saveLike:{
    width:'50%',
    flexDirection:'row',
    justifyContent: 'flex-end',
    gap:10,
  },

  SSSLtext:{
    padding:'0.5%',
    fontSize:20,
  },

  // SSSLtextHeart:{
  //   padding:0,
  //   margin:0,
  //   fontSize:20,
  // },

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