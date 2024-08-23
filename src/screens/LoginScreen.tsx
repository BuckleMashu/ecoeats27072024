import React, { useState,useEffect,useCallback,useContext } from 'react';
import { 
View, 
TextInput, 
Button, 
Text, 
StyleSheet,  
SafeAreaView,
ScrollView, 
StatusBar,   
useColorScheme,
TouchableOpacity,} from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';

import { getEcoEatsDBConnection, checkLoginDetails } from '../../db-service';

import {UserContext} from '../../UserContext';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'LoginScreen'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const isDarkMode = useColorScheme() === 'dark';
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [userNameCheck, setUserNameCheck] = useState<string>('');
  const [passWordCheck, setPassWordCheck] = useState<string>('');
  const [error, setError] = useState<string>('');
  let db;
  const {setUserId} = useContext(UserContext);
  // const handleLogin = () => {
  //   if (username === 'admin' && password === 'admin') {
  //     navigation.navigate('User', { userID: 1 });  // Pass userID when navigating
  //   } else {
  //     setError('Invalid username or password');
  //   }
  // };
  const checkInputs = () => {
    console.log("2"+username + " " + password);
    // setUserNameCheck(username);
    // setPassWordCheck(password);
    // console.log("3"+userNameCheck + " " + passWordCheck);
    handleLogin(username, password);
  };

  const handleLogin = useCallback(async (user:string,pass:string) =>{
    try{
        console.log("2"+user + " " + pass);
        db = await getEcoEatsDBConnection();
        const result = await checkLoginDetails(db,user,pass);
        console.log("login output:"+result);
        if (result){
          setUserId(result);  // Pass userID when navigating
          navigation.navigate('MainTabs', {screen: 'User',   params: {userID: result}});
        }else{
          setError('Invalid username or password, or account does not exist');
        }
    } catch(error){
        console.error(error);
    }
  },[]);
  
  useEffect(()=>{

  },[username,password]);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView contentContainerStyle={styles.scroll} contentInsetAdjustmentBehavior="automatic">
          <View style={styles.container}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <Button title="Login" onPress={checkInputs} />
            <View>
              <Text>Don't have an account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                <Text>Register now!</Text>
              </TouchableOpacity>
            </View>
            <View>
              <Text>Just want to look around?</Text>
              <TouchableOpacity onPress={() => navigation.navigate('MainTabs', {screen: 'Sharing'})}>
                <Text>Return to home</Text>
              </TouchableOpacity>
            </View>
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
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    paddingTop:"50%"
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    padding: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
  },
});

export default LoginScreen;
