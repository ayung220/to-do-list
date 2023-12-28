import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import Icon from 'react-native-vector-icons/FontAwesome6';
import DateTimePicker from '@react-native-community/datetimepicker';
import API_BASE_URL from './apiConfig';

const AddList = () => {
  const navigation = useNavigation();
  const [tanggal, setTanggal] = useState(new Date());
  const [isi, setIsi] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { replace } = useNavigation();

  const btnTambah = async () => {
    try {
      // Validasi format tanggal
      const formattedDate = tanggal.toISOString().split('T')[0];
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!formattedDate.match(dateRegex)) {
        Alert.alert('Error', 'Format tanggal tidak valid');
        return;
      }

      const nim = await AsyncStorage.getItem('nim');
      const nama = await AsyncStorage.getItem('nama');
      const res = await axios.post(`${API_BASE_URL}/todo/tambah`, {
        nim: nim,
        nama: nama,
        tanggal: formattedDate,
        isi: isi,
      });

      if (res.data.status === 200) {
        console.log('Data berhasil ditambahkan');
        navigation.replace('HomePage');
      }
    } catch (e) {
      console.log(e);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    setShowDatePicker(false);

    if (selectedDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      // Check if the selected date is today or in the future
      if (selectedDate.getTime() >= today.getTime()) {
        setTanggal(selectedDate);
      } else {
        Alert.alert('Error', 'Pilih tanggal hari ini atau ke depan.');
      }
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
      <Icon
        style={styles.X}
        onPress={() => navigation.navigate('HomePage')}
        name="xmark"
        color={'black'}
        size={50}
      />
      <Text style={styles.title}>Add To do List</Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Tanggal</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            style={styles.input}
            placeholder="Pilih Tanggal"
            placeholderTextColor="#000"
            editable={false}
            value={tanggal.toISOString().split('T')[0]}
          />
        </TouchableOpacity>
        {showDatePicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={tanggal}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}
      </View>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Kegiatan</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukkan Kegiatan"
          placeholderTextColor="#000"
          onChangeText={(text) => setIsi(text)}
          value={isi}
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={btnTambah}>
        <Icon name="plus" color={'#5CE1E6'} size={30} />
      </TouchableOpacity>
    </ScrollView>
  );
};
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    color: '#000',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    bottom: 40,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    color: '#000',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  datePicker: {
    width: '100%',
    marginBottom: 10,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    height: 50,
    alignItems: 'flex-start',
    paddingLeft: 10,
  },
  dateText: {
    color: '#000',
    fontSize: 18,
  },
  placeholderText: {
    color: '#888',
    fontSize: 18,
  },
  input: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 25,
    color: '#000',
    paddingHorizontal: 20,
    marginTop: 5,
    borderColor: '#000',
    borderWidth: 1,
  },
  btn: {
    backgroundColor: '#000',
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    width: 70,
    height: 70,
    top: 20,
    left: 150,
  },
  btnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  X: {
    bottom: 200,
  },
});

export default AddList;
