import React, { useState } from 'react';
import {
  SafeAreaView,
  TextInput,
  Button,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { getEcoEatsDBConnection, saveNewExplore } from '../../db-service';
import { explore_page } from '../models';
import { launchImageLibrary } from 'react-native-image-picker';


type AddExplorePostScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddExplorePost'
>;

type Props = {
  navigation: AddExplorePostScreenNavigationProp;
};

const AddExplorePostScreen: React.FC<Props> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState('');

  // funciton to handle image picker
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

  const handleSaveExplorePost = async () => {
    const db = await getEcoEatsDBConnection();
    const newExplore: explore_page = {
      explore_Id: 0, // This will be auto-incremented by the database
      title,
      description,
      picture: '',
      date_created: new Date().toISOString(), // Current date and time
    };

    await saveNewExplore(db, newExplore);
    navigation.navigate('MainTabs', {screen: 'Explore'}); // Navigate back to Explore page to show the posts
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter explore post title"
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter explore post description"
      />
      <Text style={styles.label}>Picture</Text>
      <TouchableOpacity style={styles.imageButton} onPress={pickImage}>
        <Text style={styles.imageButtonText}>Pick an Image</Text>
      </TouchableOpacity>
      <Button title="Save Post" onPress={handleSaveExplorePost} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  imageButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 16,
  },
  imageButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AddExplorePostScreen;
