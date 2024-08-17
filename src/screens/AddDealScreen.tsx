import React, { useState } from 'react';
import {
  SafeAreaView,
  TextInput,
  Button,
  StyleSheet,
  View,
  Text,
} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { getEcoEatsDBConnection, saveNewDeal } from '../../db-service';
import { deal_page } from '../models';

type AddDealScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddDeal'
>;

type Props = {
  navigation: AddDealScreenNavigationProp;
};

const AddDealScreen: React.FC<Props> = ({ navigation }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [picture, setPicture] = useState('');

  const handleSaveDeal = async () => {
    const db = await getEcoEatsDBConnection();
    const newDeal: deal_page = {
      deal_Id: 0, // This will be auto-incremented by the database
      title,
      description,
      picture,
      // Other properties as needed
    };

    await saveNewDeal(db, newDeal);
    navigation.navigate('MainTabs', {screen: 'Details'});
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput
        style={styles.input}
        value={title}
        onChangeText={setTitle}
        placeholder="Enter deal title"
      />
      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        placeholder="Enter deal description"
      />
      <Text style={styles.label}>Picture URL</Text>
      <TextInput
        style={styles.input}
        value={picture}
        onChangeText={setPicture}
        placeholder="Enter picture URL"
      />
      <Button title="Save Deal" onPress={handleSaveDeal} />
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
});

export default AddDealScreen;
