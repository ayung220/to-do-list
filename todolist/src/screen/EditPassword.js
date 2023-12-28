import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ToastAndroid,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import API_BASE_URL from './apiConfig';

const EditPassword = ({ navigation }) => {
  const [nim, setNim] = useState('');
  const [nama, setNama] = useState('');
  const [passwordLama, setPasswordLama] = useState('');
  const [passwordBaru, setPasswordBaru] = useState('');
  const [konfirmasiSandi, setKonfirmasiSandi] = useState(''); // Added this line

  const [data, setData] = useState({
    nim: '',
    password: '',
    name: '',
  });

  useEffect(() => {
    getData();
    return () => {};
  }, []);

  const getData = async () => {
    try {
      let nim = await AsyncStorage.getItem('nim');
      let password = await AsyncStorage.getItem('password');
      let name = await AsyncStorage.getItem('nama');
      if (nim !== null) {
        // value previously stored
        setData({
          nim: nim,
          nama: nama,
          password: password,
        });
      }
    } catch (e) {
      // error reading value
    }
  };

  const resetPassword = async (value) => {
    console.log('value', value);
    try {
      // ip nya ganti dengan ip jaringanmu
      const response = await axios.put(`${API_BASE_URL}/users/`, {
        nim: value.nim,
        password: value.passwordLama,
        newPassword: value.passwordBaru,
      });
      if (response.data.status == 200) {
        console.log('response', response);
        ToastAndroid.show('Password berhasil diubah', ToastAndroid.SHORT);
        navigation.navigate('Login');
      }
    } catch (error) {
      console.log(error.message);
      ToastAndroid.show('Cek kembali nim dan password', ToastAndroid.SHORT);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Your Password</Text>
      <View>
        <Text style={styles.label}>NIM</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter NIM"
          placeholderTextColor="white"
          onChangeText={(nim) => setNim(nim)}
          value={nim}
        />
      </View>
      <View>
        <Text style={styles.label}>Password Lama</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password Lama"
          placeholderTextColor="white"
          onChangeText={(password) => setPasswordLama(password)}
          value={passwordLama}
        />
      </View>
      <View>
        <Text style={styles.label}>Password Baru</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Password Baru"
          placeholderTextColor="white"
          onChangeText={(password) => setPasswordBaru(password)}
          value={passwordBaru}
        />
      </View>
      <View>
        <Text style={styles.label}>Konfirmasi Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Konfirmasi Password"
          placeholderTextColor="white"
          onChangeText={(konfirmasiSandi) => setKonfirmasiSandi(konfirmasiSandi)}
          value={konfirmasiSandi}
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
          if (
            nim == '' ||
            passwordLama == '' ||
            passwordBaru == '' ||
            konfirmasiSandi == ''
          ) {
            ToastAndroid.show('Data tidak boleh kosong', ToastAndroid.SHORT);
          } else if (nim !== data.nim || passwordLama !== data.password) {
            ToastAndroid.show('NIM atau Password Salah', ToastAndroid.SHORT);
          } else if (passwordBaru !== konfirmasiSandi) {
            ToastAndroid.show(
              'Password Baru dan Konfirmasi Password Tidak Sama',
              ToastAndroid.SHORT
            );
          } else {
            resetPassword({
              nim: nim,
              nama: nama,
              passwordLama: passwordLama,
              passwordBaru: passwordBaru,
            });
          }
        }}
      >
        <Text style={styles.textButton}>Reset Password</Text>
      </TouchableOpacity>
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
  input: {
    width: 300,
    height: 50,
    backgroundColor: 'black',
    borderRadius: 0,
    color: 'white',
    paddingHorizontal: 10,
    marginBottom: 20,
    borderWidth: 2,
    borderBottomColor: 'white',
  },
  button: {
    width: 300,
    height: 45,
    backgroundColor: 'white',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    top: 20,
  },
  textButton: {
    color: 'black',
    fontSize: 20,
    
  },
  label: {
    color: '#fff',
    marginLeft: 4,
    marginBottom: 4,
  },
  title: {
    color: '#fff',
    fontSize: 30,
    marginVertical: 20,
    fontWeight: 'bold',
  },
});

export default EditPassword;
