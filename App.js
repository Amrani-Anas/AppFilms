import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, Text, View,Image,  TextInput, ScrollView, TouchableHighlight } from 'react-native';

export default function App() {
  const apiUrl = "http://www.omdbapi.com/?i=tt3896198&apikey=b2b463b9"
  const [state, setState] = useState({
    s: "Movie name...",
    results: [], 
    selected: {}
  });
  const search = () => {
    axios(apiUrl + "&s=" + state.s).then(({data}) => {
      let results = data.Search;
      
      setState(prevState => {
        return{ ...prevState, results: results}
      })
    })
  }
 
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Find Movies </Text>
      <TextInput 
      style={styles.searchbox}
      onChangeText={text => setState(prevState => {
        return {...prevState, s: text}
      })}
      onSubmitEditing={search}
      value={state.s}
      />
      <ScrollView style={styles.results}>
        {state.results.map(result => (
       
          <View  style={styles.result}>
              <Text style={styles.heading}>{result.Title}</Text>
              <Image
              source={{ uri: result.Poster }}
              style={{
                width: '100%',
                height: 300
              }}
              resizeMode="cover"
              />
              <Text style={styles.heading}>Rating : 7.2 </Text>
          </View>
          
        ))}       
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#223343',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 70,
    paddingHorizontal: 20
  },
  title: {
    color: '#FFF',
    fontSize: 32, 
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: 20
  }, 
  searchbox: {
    fontSize: 20, 
    fontWeight: '300', 
    padding: 20,
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 8,
    marginBottom: 40
  },
  results: {
    flex: 1
  }, 
  result: {
    flex: 1, 
    width: '100%',
    marginBottom: 20
  },
  heading: {
    color: '#FFF', 
    fontSize: 18,
    fontWeight: '700',
    padding: 20, 
    backgroundColor: '#445565'
  }
});
