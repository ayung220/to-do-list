import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API_BASE_URL from './apiConfig';
import Icon from 'react-native-vector-icons/FontAwesome6';

const Homepage = ({ navigation }) => {
  const [list, setList] = useState([]);
  const [cari, setCari] = useState('');

  const dataList = async () => {
    try {
      const nim = await AsyncStorage.getItem('nim');
      const res = await axios.get(`${API_BASE_URL}/todo/${nim}`);
      setList(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  const btnStatus = async (id, status) => {
    try {
      if (status === 'Belum selesai') {
        await axios.put(`${API_BASE_URL}/todo/check/${id}`);
      } else if (status === 'Selesai') {
        await axios.put(`${API_BASE_URL}/todo/uncheck/${id}`);
      }
      // Tidak perlu memanggil dataList di sini karena kita akan memperbarui state setelahnya
    } catch (e) {
      console.log(e);
    }
  };

  const btnDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/todo/hapus/${id}`);
      dataList();
    } catch (e) {
      console.log(e);
    }
  };

  const btnCari = async () => {
    try {
      const nim = await AsyncStorage.getItem('nim');
      const res = await axios.get(
        `${API_BASE_URL}/todo/cari/all?nim=${nim}&isi=${cari}`,
      );
      setList(res.data);
    } catch (e) {
      console.log(e);
    }
  };

  const btnEdit = (id) => {
    navigation.navigate('EditList', { itemId: id });
  };

  useEffect(() => {
    dataList();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.search}>
          <TextInput
            style={styles.input}
            placeholder="Search"
            placeholderTextColor="black"
            borderColor="black"
            onChangeText={(value) => setCari(value)}
          />
          <TouchableOpacity
            style={styles.buttonCari}
            onPress={async () => await btnCari()}
          >
            <Icon style={styles.find}
            name="magnifying-glass" size={25} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.top}>
          <Text style={styles.title}>To do Task</Text>
        </View>
        <View>
          {list.map((item, i) => (
            <View style={styles.listItem} key={i}>
              <TouchableOpacity
                style={styles.btnDelete}
                onPress={async () => await btnDelete(item.id)}
                
              >
                <Icon name="trash" size={20} color="red" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btnEdit}
                onPress={() => btnEdit(item.id)}
              >
                <Icon name="edit" size={20} color="#176B87" />
              </TouchableOpacity>
              <View style={styles.infoContainer}>
                <Text style={styles.date}>{item.tanggal}</Text>
                <View style={styles.statusContainer}>
                  <Text style={styles.statusLabel}>Status:</Text>
                  <Text style={styles.status}>{item.status}</Text>
                </View>
                <View style={styles.activityContainer}>
                  <Text style={styles.statusLabel}>Activity:</Text>
                  <Text style={styles.activity}>{item.isi}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={[
                  styles.btnStatus,
                  {
                    backgroundColor:
                      item.status === 'Belum selesai' ? '#F4CE14' : '#27AE60',
                  },
                  styles.centeredIcon,
                ]}
                onPress={async () => {
                  await btnStatus(item.id, item.status);
                  dataList();
                }}
                disabled={item.status === 'Checked' && true}
              >
                {/* Menggunakan ikon Exclamation atau Check sesuai dengan status */}
                <Icon
                  name={item.status === 'Belum selesai' ? 'exclamation' : 'check-circle'}
                  size={20}
                  color="#fff"
                />
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
      <TouchableOpacity
        style={styles.addButton}
        activeOpacity={0.8}
        onPress={() => navigation.navigate('AddList')}
      >
        <Icon name="plus" color={'#5CE1E6'} size={30} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 16,
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
    borderRadius: 24,
    width:'110%',
  },
  input: {
    color: 'black',
    borderRadius: 24,
    paddingHorizontal: 20,
    fontSize: 16,
    height: 44,
    borderWidth: 1,
    borderColor: 'black',
    width: '78%',
  },
  buttonCari: {
    padding: 12,
    borderRadius: 24,
    marginLeft: 10,
  },
  btnText: {
    fontWeight: 'bold',
    color: 'black',
  },
  title: {
    color: 'black',
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 12,
    marginLeft:10
  },
  top: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  listItem: {
    backgroundColor: 'white',
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 2,
    marginBottom: 10,
    borderBottomColor:'black',
    borderWidth:1,
    borderTopColor:'white',
    borderLeftColor:'white',
    borderRightColor:'white',
    width:'100%'
  },
  btnDelete: {
    padding: 12,
    borderRadius: 24,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 10,
  },
  date: {
    color: '#65B741',
    fontSize: 15,
    fontWeight: 'bold',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  statusLabel: {
    fontWeight: 'bold',
    color: '#5CE1E6',
    marginRight: 5,
  },
  status: {
    color: 'black',
  },
  activityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activity: {
    color: 'black',
  },
  btnStatus: {
    padding: 12,
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  centeredIcon: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    position: 'absolute',
    bottom: 40,
    right: 40,
    backgroundColor: 'black',
    borderRadius: 50,
    height: 70,
    width: 70,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 5,
  },
  find:{
    right:40
  }
});

export default Homepage;
