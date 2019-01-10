/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, FlatList, Button, TouchableOpacity, Image, TouchableHighlight } from 'react-native';

import * as firebase from 'firebase';
import Icon from 'react-native-vector-icons/MaterialIcons';

const config = {
  apiKey: "AIzaSyCZtlXKlcD3VgJjbYMbwjteykUun2AE0vc",
  authDomain: "chat-2d196.firebaseapp.com",
  databaseURL: "https://chat-2d196.firebaseio.com",
  projectId: "chat-2d196",
  storageBucket: "chat-2d196.appspot.com",
  messagingSenderId: "202150673263"
};
firebase.initializeApp(config);

export default class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      message: '',
      messages: []
    }

    this.addItem = this.addItem.bind(this);
  }

  componentDidMount() {
    firebase
      .database()
      .ref()
      .child("messages")
      .once("value", snapshot => {
        const data = snapshot.val()
        if (snapshot.val()) {
          const initMessages = [];
          Object
            .keys(data)
            .forEach(message => initMessages.push(data[message]));
          this.setState({
            messages: initMessages
          })
        }
      });
    firebase
      .database()
      .ref()
      .child("messages")
      .on("child_added", snapshot => {
        const data = snapshot.val();
        if (data) {
          this.setState(prevState => ({
            messages: [data, ...prevState.messages]
          }))
        }
      })

  }

  addItem() {
    if (!this.state.message) return;

    const newMessage = firebase.database().ref()
      .child("messages")
      .push();
    newMessage.set(this.state.message, () => this.setState({ message: '' }))
  }
  render() {
    return (
      <View style={styles.container}>

        <View style={styles.navBar}>
          <Text style={styles.send}>Chats... </Text>
          <View style={styles.rightNav}>
            <TouchableOpacity>
              <Icon style={styles.navItem} name="call" size={25} />
            </TouchableOpacity>
            <TouchableOpacity>
              <Icon style={styles.navItem} name="videocam" size={25} />
            </TouchableOpacity>
          </View>
        </View>

        <FlatList data={this.state.messages}
          renderItem={
            ({ item }) =>
            <View  style={styles.listItemContainerin}>
             <Image source={require('./images/chat..png')} style={styles.iconSend} />
              <View style={styles.listItemContainer} >
               
                <Text style={styles.listItem}    >
                  {item}
                </Text>
              </View>
              </View>
          }

        />
        <View style={styles.msgBox}>
          <TextInput placeholder='Enter you message'
            value={this.state.message}
            onChangeText={(text) => this.setState({ message: text })}
            style={styles.inputContainer} />

          <TouchableOpacity style={styles.btnSend} onPress={() => this.addItem()}>
            <Image source={require('./images/sent.png')} style={styles.iconSend} />
          </TouchableOpacity>

        </View>

      </View>
    );

  }

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#eee',
  },

  txtInput: {
    flex: 1,
    backgroundColor: '#eee',
  },
  listItemContainer: {
   backgroundColor:'#fff',

    margin: 8,
    borderRadius: 15
  },
  listItemContainerin: {
   
    flexDirection: 'row',
    margin: 8,
    borderRadius: 15
  },
  listItem: {

    fontSize: 20,
    padding: 10
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#eee',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  btnSend: {
    backgroundColor: "#00BFFF",
    width: 40,
    height: 40,
    borderRadius: 360,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconSend: {
    width: 30,
    height: 30,
    borderRadius: 30,
    alignSelf: 'center',
  },
  msgBox: {
    flexDirection: 'row',
    padding: 17,
    backgroundColor: '#fff'

  },
  footer: {
    flexDirection: 'row',
    height: 60,
    backgroundColor: '#eeeeee',
    paddingHorizontal: 10,
    padding: 5,
  },
  send: {
    fontSize: 20

  },
  navBar: {
    height: 55,
    backgroundColor: '#fff',
    elevation: 3,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  rightNav: {
    flexDirection: 'row'
  },
  navItem: {
    marginLeft: 20
  },
});