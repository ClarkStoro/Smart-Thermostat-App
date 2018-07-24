/**
 * SmartThermostat-App
 * https://gitlab.com/ClarkStoro/SmartThermostat-App.git
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableNativeFeedback,
  StatusBar,
} from 'react-native';

import PropTypes from 'prop-types';

import {
    StackNavigator,
    NavigationActions,
} from 'react-navigation';

import * as firebase from 'firebase';

import SplashScreen from 'Termostato/app/components/SplashScreen/SplashScreen';
import Login from 'Termostato/app/components/Login/Login';
import Registration from 'Termostato/app/components/Registration/Registration';
import ConsoleT from 'Termostato/app/components/Console/Console';


//Initialize Firebase
//You should find them when you add a new javascript app from Firebase Console
//Check Firebase docs for instructions
const firebaseConfig = {
    apiKey: "***************************",
    projectId: "***************************",
    databaseURL: "***************************",
};
firebase.initializeApp(firebaseConfig);

export default class Termostato extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <View style={{ flex: 1, }}>
                <StatusBar
                    backgroundColor="#1b1b1b"
                    barStyle="light-content"    
                />
                <Navigate />
            </View>
        );
    }
}

const Navigate = StackNavigator({
    SplashScreen: { screen: SplashScreen },
    Login: { screen: Login },
    Registration: { screen: Registration },
    Console: {screen: ConsoleT},
}, {
        headerMode: 'screen'
    });


AppRegistry.registerComponent('Termostato', () => Termostato);
