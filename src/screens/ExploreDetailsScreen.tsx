import React, { useEffect, useState, useCallback } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TextInput,
  Button,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useColorScheme } from 'react-native';
import { RootStackParamList } from '../../App';
import { comment } from '../models';
import { getEcoEatsDBConnection, getCommentsForExplore, saveNewComment } from '../../db-service';

type ExploreDetailsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ExploreDetails'
>;

type ExploreDetailsScreenRouteProp = RouteProp<RootStackParamList, 'ExploreDetails'>;

type Props = {
  navigation: ExploreDetailsScreenNavigationProp;
  route: ExploreDetailsScreenRouteProp;
};

const { width: screenWidth } = Dimensions.get('window');

const ExploreDetailsScreen: React.FC<Props> = ({ route }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const { explore } = route.params;

  const [comments, setComments] = useState<comment[]>([]);
  const [newComment, setNewComment] = useState('');

  const loadComments = useCallback(async () => {
    try {
      const db = await getEcoEatsDBConnection();
      const loadedComments = await getCommentsForExplore(db, explore.explore_Id);
      setComments(loadedComments);
    } catch (error) {
      console.error('Failed to load comments', error);
    }
  }, [explore.explore_Id]);

  const handleAddComment = async () => {
    if (newComment.trim()) {
      try {
        const db = await getEcoEatsDBConnection();
        const commentToSave: comment = {
          comment_Id: 0, // This will be auto-incremented by the database
          explore_Id: explore.explore_Id,
          user_Name: 'You', // Replace with actual username if available
          comment_Text: newComment,
        };
        await saveNewComment(db, commentToSave);
        setNewComment(''); // Clear the input field
        loadComments(); // Reload the comments
      } catch (error) {
        console.error('Failed to save comment', error);
      }
    }
  };

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView contentInsetAdjustmentBehavior="automatic">
        <View style={styles.contentContainer}>
          <Image
            style={styles.image}
            source={explore.picture ? { uri: explore.picture } : require('../images/missing.png')}
          />
          <Text style={styles.title}>{explore.title}</Text>
          <Text style={styles.description}>{explore.description}</Text>
          <Text style={styles.dateCreated}>Date Created: {explore.date_created}</Text>

          {/* Comment Section */}
          <View style={styles.commentSection}>
            <Text style={styles.commentHeader}>Comments</Text>
            {comments.map((comment) => (
              <View key={comment.comment_Id} style={styles.commentContainer}>
                <Text style={styles.commentUser}>{comment.user_Name}:</Text>
                <Text style={styles.commentText}>{comment.comment_Text}</Text>
              </View>
            ))}
            <TextInput
              style={styles.commentInput}
              placeholder="Add a comment"
              value={newComment}
              onChangeText={setNewComment}
            />
            <Button title="Post Comment" onPress={handleAddComment} />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(250,250,250)',
  },
  contentContainer: {
    padding: 20,
  },
  image: {
    width: screenWidth * 0.9,
    height: screenWidth * 0.5,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  dateCreated: {
    fontSize: 14,
    color: 'gray',
  },
  commentSection: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  commentHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  commentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  commentUser: {
    fontWeight: 'bold',
    marginRight: 5,
  },
  commentText: {
    fontSize: 16,
  },
  commentInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    marginBottom: 10,
  },
});

export default ExploreDetailsScreen;
