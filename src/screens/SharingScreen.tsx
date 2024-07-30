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
  TouchableOpacity
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

import { ShareComponent } from '../modules/EcoEatsShare';
import { share_page } from '../models';
import { getEcoEatsDBConnection, getSharePage} from '../../db-service';

import { Searchbar } from 'react-native-paper';

import localImages from '../imageImports';

type SharingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Sharing'
>;

type Props = {
  navigation: SharingScreenNavigationProp;
};

const SharingScreen: React.FC<Props> = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [searchQuery, setSearchQuery] = React.useState("");
  const [newsearchQuery, setNewSearchQuery] = React.useState("");
  const [shareEntity, setShareEntity] = React.useState<share_page[]>([]);
  let db;
  const [shareType, setShareType] = useState(0);

// Import images
// const imageMap = {
//     "Tekas-9 Beans-1": require('../images/share/1.png'),
//   };

  const loadDataCallback = useCallback(async (type:number, searchR:string) =>{
    try{
        db = await getEcoEatsDBConnection();
        const result = await getSharePage(db,type,searchR);
        setShareEntity(result);
    } catch(error){
        console.error(error);
    }
  },[]);

  // const setUpImagePaths = useCallback(async()=>{
  //   let paths = [];
  //   for (var i =0; i< shareEntity.length;i++){
  //     paths.push(shareEntity[i].picture);
  //   }
  //   setImagePaths(paths);
  // },[]);

  useEffect(()=>{
    loadDataCallback(shareType,searchQuery);
  },[loadDataCallback,shareType,searchQuery]);

  const updateSearchResult = async () =>{
    setSearchQuery(newsearchQuery);
    setNewSearchQuery("");
  }
  return (
    <SafeAreaView >
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View style={styles.container}>
                <View>
                    <Button
                        title="Foods"
                        onPress={() => setShareType(0)}
                    />
                    <Button
                        title="Items"
                        onPress={() => setShareType(1)}
                    />
                </View>
                <View>
                <TextInput value={newsearchQuery} onChangeText={setNewSearchQuery} />
                    {/* <Searchbar
                        placeholder="Search"
                        onChangeText={updateSearchResult}
                        value={newsearchQuery}
                    /> */}
                <Button
                    onPress={updateSearchResult}
                    title="Search"
                    color="#841584"
                    accessibilityLabel="updateSearch"
                />
                </View>
            </View>
            <Text>{shareType},{searchQuery}</Text>
            <View>
                {shareEntity.map((post) =>(
                  //this lines say it got error BUT IT DOESNT. IT WORKS. DONT LISTEN TO THE AI
                  <TouchableOpacity key={post.share_Id} onPress={() => navigation.navigate('Request',{post})}>
                    <View>
                      <ShareComponent key={post.share_Id} share={post} picture={localImages[post.picture]}/>
                    </View>
                  </TouchableOpacity>
                ))}
            </View>
        </ScrollView>
    </SafeAreaView>
  );
};
//'../images/share1.png'
//Image.resolveAssetSource(exampleImage).uri
// require('../screens/images/')
//"D:\work and non-game-related software\sim y2s2\agile\final project app\ecoeats27072024\src\screens\images\share1.png"
const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default SharingScreen;