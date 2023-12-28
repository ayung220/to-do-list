import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ToastAndroid,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from './apiConfig';

const Login = ({ navigation }) => {
  const [nim, setNim] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = async (value) => {
    console.log('value', value);
    try {
      const response = await axios.post(`${API_BASE_URL}/users/login`, {
        nim: value.nim,
        password: value.password,
      });

      if (response.data.status === 200) {
        console.log('response', response.data);
        ToastAndroid.show(response.data.metadata, ToastAndroid.SHORT);
        await AsyncStorage.setItem('password', value.password);
        await AsyncStorage.setItem('nim', value.nim);
        await AsyncStorage.setItem('nama', response.data.users.nama);
        navigation.replace('HomePage');
      }
    } catch (error) {
      console.log(error.message);
      ToastAndroid.show('Check NIP and password again', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        source={
          require('../assets/dooitsplash.png')
        }
        style={styles.img}
      />
      <Text style={styles.judul}></Text>
      <View style={styles.formContainer}>
        <Text style={styles.label}>NIM</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your NIM"
          placeholderTextColor="#ccc"
          onChangeText={(nim) => setNim(nim)}
          value={nim}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#ccc"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          value={password}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={async () => {
            await handleLogin({ nim, password });
          }}>
          <Text style={styles.buttonText}>LOGIN</Text>
        </TouchableOpacity>
        <View style={styles.orContainer}>
          <Text style={styles.TextOr}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={[styles.TextOr, styles.registerLink]}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
  },
  img: {
    width: 400,
    height: 100,
    borderRadius: 50,
    top:80,
    left:15
  },
  judul: {
    color: 'white',
    fontSize: 34,
    fontWeight: 'bold',
    marginBottom: 30,
    marginTop: 10,
  },
  formContainer: {
    width: '80%',
  },
  label: {
    color: 'white',
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    height: 40,
    backgroundColor: 'transparent',
    borderRadius: 0,
    color: 'white',
    paddingHorizontal: 15,
    marginBottom: 20,
    borderBottomColor:'white',
    borderWidth:2
  },
  button: {
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'black',
    fontWeight: 'bold',
  },
  orContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  TextOr: {
    color: '#ccc',
    fontWeight: 'bold',
  },
  registerLink: {
    textDecorationLine: 'underline',
    marginLeft: 5,
  },
});

export default Login;
