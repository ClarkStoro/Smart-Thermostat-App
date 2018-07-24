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
    NetInfo,
    AsyncStorage,
    Alert,
} from 'react-native';

import {
    StackNavigator,
    NavigationActions,
} from 'react-navigation';


import PropTypes from 'prop-types';

import * as firebase from 'firebase';

import FCM, {
    FCMEvent,
    RemoteNotificationResult,
    WillPresentNotificationResult,
    NotificationType,
} from 'react-native-fcm';

import I18n from 'react-native-i18n'; //Translations

import { createStyles, maxHeight, minHeight } from 'react-native-media-queries'; //media queries for responsive layouts


import small from "Termostato/app/components/SplashScreen/styles/small.js";
import smp5 from "Termostato/app/components/SplashScreen/styles/smp5.js";
import tablet10 from "Termostato/app/components/SplashScreen/styles/tablet10.js";

export default class SplashScreen extends Component {

    static navigationOptions = {
        header: null,
    };

    constructor() {
        super();
        this.iconLogo = require('Termostato/app/images/ic_launcher.png');
        this.state = {
            connStatus: true,

            Email: '',
            Password: '',
        };
    }

    componentDidMount() {

        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

        NetInfo.isConnected.fetch().done(
            (isConnected) => { this.setState({ connStatus: isConnected }); }
        );

        this.getSaved();

    }//end componentDidMount

    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    }

    handleConnectionChange = (isConnected) => {
        this.setState({ connStatus: isConnected });
    }

    //Search for saved credentials
    getSaved(){
        var emailAsync = '';
        var passwordAsync = '';
        AsyncStorage.getItem("Email").then(risp => {
            emailAsync = risp;
            this.setState({ EmailAsync: emailAsync });
            AsyncStorage.getItem("Password").then(risp => {
                passwordAsync = risp;
                this.setState({ PasswordAsync: passwordAsync });
                //if there are credentials try to autheticate user
                if ((emailAsync != '') && (emailAsync != null) && (passwordAsync != '') && (passwordAsync != null)) {

                    this.loginFirebaseAsyncStorage();
                } else {
                    //There aren't credentials stored then go to Login Screen
                    //Put 1s timer otherwise splash screen is too fast
                    setTimeout(() => {
                        const resetAction = NavigationActions.reset({
                            index: 0,
                            actions: [
                                NavigationActions.navigate({ routeName: 'Login' }),
                            ],
                        });
                        this.props.navigation.dispatch(resetAction);
                    }, 1000)
                }

            });
        });
    }//end getSaved

    
    //Try to login with stored credentials
    loginFirebaseAsyncStorage() {
        const constr = this;
        //First check if connection is available
        if (this.state.connStatus) {
            firebase.auth().signInWithEmailAndPassword(this.state.EmailAsync, this.state.PasswordAsync).then(function (user) {
               
                var uid = firebase.auth().currentUser.uid;
                var itemsRef = firebase.database().ref();

                constr.navigateToConsole();

            }).catch(function (e) {
                Alert.alert(I18n.t("LoginFailed"), "" + e);
                const resetAction = NavigationActions.reset({
                    index: 0,
                    actions: [
                        NavigationActions.navigate({ routeName: 'Login' }),
                    ],
                });
                this.props.navigation.dispatch(resetAction);
            })
        } else {
            Alert.alert(I18n.t("NoInternet"), I18n.t("NeedConnection"));
            this.props.unmountMe();
        }
    }//end loginFirebaseAsyncStorage

    //Go to Console Screen by resetting the Navigator 
    //-> Console screen will appear like first screen of the app and by clicking back arrow button the app will go on background
    navigateToConsole() {

        const resetAction = NavigationActions.reset({
            index: 0,
            actions: [
                NavigationActions.navigate({ routeName: 'Console' }),
            ],
        });
        this.props.navigation.dispatch(resetAction);
    }//end navigateToConsole


    render() {
        return (
            <View style={styles.container}>
                <Image source={this.iconLogo} style={styles.iconLogo} />
            </View>
        );
    }
}

const stylesBase = {

    container: {
        flex: 1,
        backgroundColor: '#424242',
        justifyContent: 'center',
        alignItems: 'center',
    },

    iconLogo: {
        width: 100,
        height: 100,
    },

};

const styles = createStyles(
    stylesBase,
    maxHeight(600, small),
    minHeight(601, maxHeight(1200, smp5)),
    minHeight(1201, tablet10),
);



AppRegistry.registerComponent('Termostato', () => SplashScreen);
