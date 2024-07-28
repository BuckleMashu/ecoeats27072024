import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

import { Searchbar } from 'react-native-paper';

type SharingScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Sharing'
>;

type Props = {
  navigation: SharingScreenNavigationProp;
};

const SharingScreen: React.FC<Props> = ({ navigation }) => {
  const [searchQuery, setSearchQuery] = React.useState('');

  return (
    <View style={styles.container}>
      <View>
        <Button
            title="Foods"
            // onPress={() => navigation.navigate('Details')}
        />
        <Button
            title="Items"
            // onPress={() => navigation.navigate('Details')}
        />
      </View>
      <View>
        <Searchbar
        placeholder="Search"
        onChangeText={setSearchQuery}
        value={searchQuery}
        />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
  },
});

export default SharingScreen;