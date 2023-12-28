import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Platform } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import API_BASE_URL from './apiConfig';
import Icon from 'react-native-vector-icons/FontAwesome6';
import DateTimePicker from '@react-native-community/datetimepicker';

const EditList = ({ route }) => {
  const navigation = useNavigation();
  const { replace } = useNavigation();
  const { id } = route.params;
  const [tanggal, setTanggal] = useState(new Date());
  const [isi, setIsi] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const btnEdit = async () => {
    try {
      // ip nya ganti dengan ip jaringanmu
      await axios.put(`${API_BASE_URL}/todo/`, {
        id: id,
        tanggal: tanggal.toISOString().split('T')[0], // Format the date to YYYY-MM-DD
        isi: isi,
      });

      replace('HomePage');
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
    <View style={styles.container}>
      <Icon
        style={styles.X}
        onPress={() => navigation.navigate('HomePage')}
        name="xmark"
        color={'black'}
        size={50}
      />
      <Text style={styles.title}>Edit Kegiatan</Text>
      <View style={{ marginTop: 12 }}>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>Tanggal</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <TextInput
            style={styles.input}
            placeholder="Pilih Tanggal"
            placeholderTextColor="black"
            editable={false}
            value={tanggal.toISOString().split('T')[0]} // Display the selected date
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
      <View style={{ marginTop: 12 }}>
        <Text style={{ color: 'black', fontWeight: 'bold' }}>Kegiatan</Text>
        <TextInput
          style={styles.input}
          placeholder="Masukan Kegiatan"
          placeholderTextColor="black"
          onChangeText={(isi) => setIsi(isi)}
          value={isi}
        />
      </View>
      <TouchableOpacity style={styles.btn} onPress={async () => await btnEdit()}>
        <Text style={styles.btnText}>Edit Data</Text>
      </TouchableOpacity>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    flex: 1,
    padding: 30,
  },
  title: {
    color: 'black',
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    marginTop:150
  },
  input: {
    width: '100%',
    height: 40,
    backgroundColor: '#FFFFFF',
    borderRadius: 5,
    color: 'black',
    paddingHorizontal: 20,
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 2,
    borderColor: 'black',
    borderWidth: 1
  },
  btn: {
    backgroundColor: 'black',
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 46,
    borderRadius: 8
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  datePicker: {
    width: '100%',
    marginBottom: 10,
  },
  input: {
    height: 50,
    backgroundColor: '#FFF',
    borderRadius: 5,
    color: 'black',
    paddingHorizontal: 20,
    marginTop: 5,
    borderColor: '#000',
    borderWidth: 1,
  },
});

export default EditList;