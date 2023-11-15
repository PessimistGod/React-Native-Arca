import React, { useEffect, useState } from 'react';
import {
  Platform,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  View,
  Modal,
  TextInput,
  Button,
} from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
import CardView from './CardView';
import ListView from './ListView';
import axios from 'axios';
import uuid from 'react-native-uuid';

export default function App() {
  const [showCardView, setShowCardView] = useState(true);
  const [showListView, setShowListView] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState({
    id: null,
    name: '',
    email: '',
    address: '',
    phone: '',
    parentId: null,
  });
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://mocki.io/v1/3a4b56bd-ad05-4b12-a181-1eb9a4f5ac8d');
        setData(response.data);
      } catch (err) {
        console.error('Error fetching data:', err);
      }
    };
    fetchData();
  }, []);

  const handleListView = () => {
    setShowCardView(false);
    setShowListView(true);
  };

  const handleCardView = () => {
    setShowListView(false);
    setShowCardView(true);
  };

  const handleAddUser = () => {
    if (!userData.name || !userData.email || !userData.address || !userData.phone) {
      alert('Please fill in all required fields (Name, Email, Address, Phone).');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      alert('Please enter a valid email address.');
      return;
    }
    
    const newUser = { ...userData, id: uuid.v4() };
    setData([...data, newUser]);
    setShowModal(false);
    setUserData({ id: null, name: '', email: '', address: '', phone: '', parentId: null });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerDisplay}>
        {showListView && <ListView data={data} />}
        {showCardView && <CardView data={data} />}
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={[styles.button, styles.listViewButton]} onPress={handleListView}>
          <MaterialIcons name="view-list" size={24} color="#fff" />
          <Text style={styles.buttonText}>List View</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.cardViewButton]} onPress={handleCardView}>
          <MaterialCommunityIcons name="view-grid" size={24} color="#fff" />
          <Text style={styles.buttonText}>Card View</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.addUserButton]} onPress={() => setShowModal(true)}>
          <MaterialIcons name="add" size={24} color="#fff" />
          <Text style={styles.buttonText}>Add User</Text>
        </TouchableOpacity>
      </View>

      <Modal animationType="slide" transparent={true} visible={showModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add User</Text>
            <TextInput
              style={styles.input}
              placeholder="Name"
              value={userData.name}
              onChangeText={(text) => setUserData({ ...userData, name: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Email"
              value={userData.email}
              onChangeText={(text) => setUserData({ ...userData, email: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Address"
              value={userData.address}
              onChangeText={(text) => setUserData({ ...userData, address: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Phone"
              value={userData.phone}
              onChangeText={(text) => setUserData({ ...userData, phone: text })}
            />
            <Button title="Add" onPress={handleAddUser} />
            <Button title="Cancel" onPress={() => setShowModal(false)} color="red" />
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ecf0f1',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 12,
    position: 'absolute',
    top: 30,
    width: '100%',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginHorizontal: 1,
    width: '30%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginLeft: 10,
  },
  listViewButton: {
    backgroundColor: '#3498db',
  },
  cardViewButton: {
    backgroundColor: '#e74c3c',
  },
  addUserButton: {
    backgroundColor: '#2ecc71',
  },
  containerDisplay: {
    flex: 1,
    width: '100%',
    marginTop: '25%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    width: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    padding: 8,
  },
});
