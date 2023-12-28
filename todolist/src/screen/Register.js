import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  ToastAndroid,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import API_BASE_URL from './apiConfig';

const Register = ({ navigation }) => {
  const [nim, setNim] = React.useState('');
  const [nama, setNama] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleRegister = async (value) => {
    console.log('value', value);
    try {
      const response = await axios.post(`${API_BASE_URL}/users/`, {
        nim: value.nim,
        username: value.username,
        nama: value.nama,
        password: value.password,
      });
      if (response.data.status === 200) {
        console.log('response', response.data);
        navigation.navigate('Login');
        ToastAndroid.show(response.data.metadata, ToastAndroid.SHORT);
      }
    } catch (error) {
      console.log(error.message);
      ToastAndroid.show('Register account failed', ToastAndroid.SHORT);
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
      <View>
        <Text style={styles.judul}>Welcome and Doo it</Text>
      </View>
      <View>
        <Text style={styles.label}>NIM</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your NIM"
          placeholderTextColor="#FFF"
          onChangeText={(nim) => setNim(nim)}
          value={nim}
        />
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Username"
          placeholderTextColor="#FFF"
          onChangeText={(username) => setUsername(username)}
          value={username}
        />
        <Text style={styles.label}>Nama</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Nama"
          placeholderTextColor="#FFF"
          onChangeText={(nama) => setNama(nama)}
          value={nama}
        />
        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your Password"
          placeholderTextColor="#FFF"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
          value={password}
        />
        <TouchableOpacity
          style={styles.button}
          onPress={async () => handleRegister({ nim, nama, username, password })}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>
        <View style={styles.orContainer}>
          <Text style={styles.TextOr}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={[styles.TextOr, styles.signInLink]}>Sign in</Text>
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
    top:10,
    left:10
  },
  judul: {
    color: '#FFF',
    fontSize: 20,
    fontStyle: 'italic',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  label: {
    color: '#FFF',
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    width: 340,
    height: 40,
    backgroundColor: 'transparent',
    borderRadius: 5,
    color: '#FFF',
    paddingHorizontal: 10,
    marginBottom: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#FFF',
  },
  button: {
    marginTop: 10,
    width: 340,
    height: 40,
    backgroundColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: 'black',
    fontSize: 20,
    fontWeight: 'bold',
  },
  orContainer: {
    marginTop: 15,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    color: '#FFF',
  },
  TextOr: {
    color: '#FFF',
    fontWeight: 'bold',
    left:50
  },
  signInLink: {
    textDecorationLine: 'underline',
    marginLeft: 5,
    left:50
  },
});

export default Register;
