import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome6';

const Account = () => {
  const {replace, navigate} = useNavigation();
  const [nim, setNim] = useState('');
  const [nama, setNama] = useState('');

  const data = async () => {
    const getNim = await AsyncStorage.getItem('nim');
    const getNama = await AsyncStorage.getItem('nama');
    setNim(getNim);
    setNama(getNama);
  };

  useEffect(() => {
    data();
  }, []);

  const btnLogout = async () => {
    await AsyncStorage.clear();
    replace('Login');
  };

  return (
    <View style={styles.container}>
      <Image
         source={
          require('../assets/dooitsplash.png')
        }
        style={styles.img}
      />
      <Text style={styles.nama}>Nama : {nama}</Text>
      <Text style={{marginBottom: 40, color: '#5CE1E6'}}>Nim : {nim}</Text>
      <TouchableOpacity style={styles.btn} onPress={() => navigate('EditPassword')}>
        <Text style={styles.btnText}>Edit Password</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => btnLogout()}>
       
        <Text style={styles.btnText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'black',
  },
  img: {
    width: 420,
    height: 420,
    borderRadius: 0,
    left:13
  },
  nama: {
    fontSize: 24,
    color: '#FFF',
    fontWeight: 'bold',
    marginTop: 6,
  },
  btn: {
    backgroundColor: 'white',
    padding: 16,
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginBottom: 10,
  },
  btnText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Account;
