import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { authContext } from '../store/auth-context';

function WelcomeScreen() {

  const [fetchedMsg, setFetchedMsg] =  useState('');

  const auhtCtx = useContext(authContext);

  const token = auhtCtx.token;

  useEffect(()=>{
    axios.get(`https://react-native-6e115-default-rtdb.europe-west1.firebasedatabase.app/message.json?auth=${token}`).then(
      (res)=>{
        setFetchedMsg(res.data);
      }
    );
  },[token])


  return (
    <View style={styles.rootContainer}>
      <Text style={styles.title}>Welcome!</Text>
      <Text>{fetchedMsg}</Text>
    </View>
  );
}

export default WelcomeScreen;

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});
