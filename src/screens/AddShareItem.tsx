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
  Dimensions
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';

import { share_page, request_page } from '../models';
import { getEcoEatsDBConnection, saveNewShareItem, saveNewRequestItem, getLastestRequestItem, updateUserSharePosts} from '../../db-service';

import { launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import uploadImageToImgur from '../uploadToImgur';
import deleteImageFromImgur from '../deleteToImgur';
// import localImages from '../imageImports';

type AddShareScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddShare'
>;

type AddShareScreenRouteProp = RouteProp<
   RootStackParamList, 
   'AddShare'
>;

type Props = {
  navigation: AddShareScreenNavigationProp;
  route: AddShareScreenRouteProp; 
};

const { width } = Dimensions.get('window');
const columnWidth = width / 2;

const AddShareScreen: React.FC<Props> = ({ route,navigation } : Props) => {
  const { currentUserId } = route.params;
  const isDarkMode = useColorScheme() === 'dark';
//   const [shareEntity, setShareEntity] = React.useState<share_page[]>([]);
  const [title, setTitle] = React.useState<string>('');
  const [description, setDescription] = React.useState<string>('');
  const [address, setAdress] = React.useState<string>('');
  const [tags, setTags] = React.useState<string|null>(null);
//   const [pictureName, setPictureName] = React.useState<string>('kokomi');

  const [imageUrl, setImageUrl] = React.useState<string>('https://i.imgur.com/50exbMa.png');

  const [expiration, setExpiration] = React.useState<string>('');
  const [itemType, setItemType] = React.useState<number>(0);
  let db;
  const [shareDetails, setShareDetails] = React.useState<share_page>();
  const [requestDetails, setRequestDetails] = React.useState<request_page>();


  const loadDataCallback = useCallback(async (user_Id:number,description:string,itemType:number,title:string,tags:string,address:string,picture:string,expiration:string) =>{
    try{
        console.log(user_Id,description,itemType,title,tags,address,picture,expiration);
        db = await getEcoEatsDBConnection();
        const shareIdnew = await saveNewRequestItem(db,user_Id,description);
        console.log(shareIdnew);
        console.log(shareIdnew[0]["insertId"]);
        console.log(await saveNewShareItem(db,itemType,title,tags,address,picture,expiration,shareIdnew[0]["insertId"]));
        await updateUserSharePosts(db,shareIdnew[0]["insertId"],user_Id);

        navigation.navigate('MainTabs', {screen: 'Sharing'});
    } catch(error){
        console.error(error);
    }
  },[]);

  const returnSharePageFormat = (itemType:number,title:string,tags:string,address:string,picture:string,expiration:string) =>{
    const share: share_page = {
        share_Id: -1,
        type: itemType,
        title: title,
        tags: tags,
        address: address,
        picture: picture,
        expiration: expiration,
      };
    setShareDetails(share);
  };

  const returnRequestPageFormat = (user_Id:number,description:string) =>{
    const request: request_page = {
        share_Id: -1,
        user_Id:user_Id,
        description: description,
      };
    setRequestDetails(request);
  };

  const handleItemChangeFood = () =>{
    setItemType(1);
    setExpiration('none');
  };

  const handleItemChangeObject = () =>{
    setItemType(0);
    setExpiration('');
  };

  const handleItemSubmit = () =>{
    // const uploadedImageUrl = uploadImageToImgur(selectedImageUri);
    // if(uploadedImageUrl){
    //   setImageUrl(uploadedImageUrl[0]);
    //   setImageUId(uploadedImageUrl[1]);
    // }
    // returnSharePageFormat(itemType,title,tags,address,selectedImageUri,expiration);
    // returnRequestPageFormat(currentUserID,description);
    loadDataCallback(currentUserId,description,itemType,title,tags,address,selectedImageUri,expiration);
  };

  //image testing----------------------------------------------------------------
  const [imageId, setImageUId] = useState<string | null>(null);
  const [selectedImageUri, setSelectedImageUId] = useState<string | null>(null);

  const pickImage = () => {
    // if(imageUrl != 'https://i.imgur.com/50exbMa.png'){
    //     deleteImageFromImgur(imageId);
    // }
    launchImageLibrary({ mediaType: 'photo' }, async (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        console.log('ImagePicker Error:', response.errorMessage);
      } else {
        if (response.assets && response.assets[0].uri) {
          const uri = response.assets[0].uri;
          setSelectedImageUId(uri);
        }
      }
    });
  };
  //----------------------------------------------------------------

  useEffect(()=>{
    console.log(currentUserId);
    setImageUrl('https://i.imgur.com/50exbMa.png');
  },[]);

  
  return (
    <SafeAreaView >
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView contentInsetAdjustmentBehavior="automatic">
            <View>
                <View>
                    <Text>Title:</Text>
                    <TextInput value={title} onChangeText={setTitle} />
                </View>
                <View>
                    <Text>Description:</Text>
                    <TextInput value={description} onChangeText={setDescription} />
                </View>
                <View>
                    <Text>Address:</Text>
                    <TextInput value={address} onChangeText={setAdress} />
                </View>
                <View>
                    <Text>Tags, if any:</Text>
                    <TextInput value={tags ? tags : ""} onChangeText={setTags} />
                </View>
                <View>
                    {itemType == 0 ? (
                            <TouchableOpacity onPress={handleItemChangeFood}>
                                <Text>Food</Text>
                            </TouchableOpacity>  
                        ):(
                            <TouchableOpacity onPress={handleItemChangeObject}>
                                <Text>Object</Text>
                            </TouchableOpacity>
                        )
                    }
                </View>
                {itemType==0 ? (
                    <View>
                        <Text>Expiration:</Text>
                        <TextInput value={expiration} onChangeText={setExpiration} />
                    </View>
                ):(
                    <View>
                        <Text>Expiration: none</Text>
                    </View>
                )}
                <Button title="Pick an Image" onPress={pickImage} />
                {/* <Text>{imageUri}</Text>
                <Text>{imageUrl}</Text> */}
                {/* {imageUri &&
                    <Image source={{ uri: imageUri }} style={styles.image}/>
                } */}
                {imageUrl &&
                    <Image source={{ uri: selectedImageUri || 'https://i.imgur.com/50exbMa.png'}} style={styles.image}/>
                }
                <TouchableOpacity onPress={handleItemSubmit}>
                    <Text>UPLOAD</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        marginTop: 20,
      },
});

export default AddShareScreen;