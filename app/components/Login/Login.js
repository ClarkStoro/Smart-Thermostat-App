/**
 * SmartThermostat-App
 * https://gitlab.com/ClarkStoro/SmartThermostat-App.git
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableNativeFeedback,
  TouchableWithoutFeedback,
  NetInfo,
  AsyncStorage,
  Alert,
  Dimensions,
} from 'react-native';

import PropTypes from 'prop-types';

import * as firebase from 'firebase';
import CheckBox from 'react-native-check-box';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import {
    StackNavigator,
    NavigationActions,
} from 'react-navigation';

import FCM, {
    FCMEvent,
    RemoteNotificationResult,
    WillPresentNotificationResult,
    NotificationType,
} from 'react-native-fcm';


import I18n from 'Termostato/app/i18n/i18n'; //Translations

import { createStyles, maxHeight, minHeight } from 'react-native-media-queries'; //media queries for responsive layouts
import small from "Termostato/app/components/Login/styles/small.js";
import smp5 from "Termostato/app/components/Login/styles/smp5.js";
import tablet10 from "Termostato/app/components/Login/styles/tablet10.js";

export default class Login extends Component {

    static navigationOptions =  {
        header: false,
      };

    constructor() {
        super();

        var iconApp = require('Termostato/app/images/ic_launcher.png');
        var iconEmail = require('Termostato/app/images/iconEmail.png');
        var iconPassword = require('Termostato/app/images/iconPassword.png');

        this.iconImages = {
            iconApp: iconApp,
            iconEmail: iconEmail,
            iconPassword: iconPassword,
        }

        this.state = {
            connStatus: false,

            email: '',
            password: '',
            rememberMe: false, 
        };
    }

    componentDidMount() {
        NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectionChange);

        NetInfo.isConnected.fetch().done(
            (isConnected) => { this.setState({ connStatus: isConnected }); }
        );
    }//end componentDidMount


    componentWillUnmount() {
        NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectionChange);
    }

    handleConnectionChange = (isConnected) => {
        this.setState({ connStatus: isConnected });
    }
    

    changeCheckRemember() {
        //Change the checkbox boolean
        this.setState({
            rememberMe: !this.state.rememberMe,
        });
    }//end changeCheckRemember


    //Login
    loginFirebase() {
        const constr = this;
        if (this.state.connStatus) {
            firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function (user) {
                //Success
                //If checkbox is ticked save credentials on AsyncStorage
                if (constr.state.rememberMe) {
                    try {
                        AsyncStorage.setItem("Email", constr.state.email);
                        AsyncStorage.setItem("Password", constr.state.password);
                        //Credentials saved
                    } catch (error) {
                        // Error saving data
                    }
                }
                var uid = firebase.auth().currentUser.uid;
                var itemsRef = firebase.database().ref();
                
                constr.navigateToConsole();

            }).catch(function (e) {
                Alert.alert(I18n.t("LoginFailed"));
            })
        } else {
            Alert.alert(I18n.t("NoInternet"), I18n.t("NeedConnection"));
        }
    }//end loginFirebase

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
        const { navigate } = this.props.navigation;
        var { height, width } = Dimensions.get('window');
        return (
            <ScrollView style={{ flex: 1, backgroundColor: '#424242',}}>
                <View style={styles.boxImg}>
                    <Image source={this.iconImages.iconApp} style={styles.imgIconApp}/> 
                </View>
                <KeyboardAwareScrollView
                    style={{flex: 1, }}
                    resetScrollToCoords={{ x: 0, y: 0 }}
                    contentContainerStyle={[styles.container, { marginTop: height/4 - 70, }]}
                    scrollEnabled={true}>
 
                    <View style={styles.boxInput}>
                        <View style={styles.boxEmail}>
                            <Image source={this.iconImages.iconEmail} style={styles.iconEmail} />
                            <TextInput
                                style={styles.txtEmail}
                                underlineColorAndroid='transparent'
                                placeholder={I18n.t('Email')}
                                placeholderTextColor="#ffffff"
                                returnKeyType="next"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                autoCorrect={true}
                                onSubmitEditing={() => this.passwordInput.focus()}
                                onChangeText={(value) => this.setState({email: value})}
                            />
                        </View>
                        <View style={styles.boxPassword}>
                            <Image source={this.iconImages.iconPassword} style={styles.iconPassword} />
                            <TextInput
                                style={styles.txtPassword}
                                underlineColorAndroid='transparent'
                                placeholder={I18n.t('Password')}
                                placeholderTextColor="#ffffff"
                                returnKeyType="go"
                                autoCapitalize="none"
                                autoCorrect={false}
                                secureTextEntry
                                ref={(input) => this.passwordInput = input}
                                onChangeText={(value) => this.setState({password: value})}
                            />
                        </View>
                        <View style={styles.boxRememberForgot}>
                            <CheckBox
                                style={styles.rememberMe}
                                onClick={() => this.changeCheckRemember()}
                                isChecked={this.state.rememberMe}
                                rightText={I18n.t('RememberMe')}
                                checkBoxColor='#ffffff'
                                rightTextStyle={styles.txtRememberMe}
                            />
                            <View></View>
                        </View>

                        <TouchableWithoutFeedback onPress={this.loginFirebase.bind(this)}>
                            <View style={styles.btnLogin}>
                                <Text style={styles.txtbtnLogin}>{I18n.t('btnLoginL')}</Text>
                            </View>
                        </TouchableWithoutFeedback>
                        <View style={styles.boxOR}>
                            <Text style={styles.txtOR}>{I18n.t('Or')}</Text>
                            <TouchableWithoutFeedback onPress={() => navigate("Registration")}>
                                <View style={styles.btnRegister}>
                                    <Text style={styles.txtbtnRegister}>{I18n.t('btnRegisterL')}</Text>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </View>
                </KeyboardAwareScrollView>
            </ScrollView>
            );
        }
}

const stylesBase = {
    container: {
        flex: 1,
    },

    //icon
    boxImg:{
    },
    imgIconApp:{
    },

    //Input
    boxInput: {
    },

    //E-mail
    boxEmail: {
    },
    txtEmail: {
    },
    iconEmail: {
    },

    //Password
    boxPassword: {
    },
    txtPassword: {
    },
    iconPassword: {
    },

    //Checkbox e Password forgot
    boxRememberForgot: {
    },
    rememberMe: {
    },
    txtRememberMe:{
    },

    //btnLogin
    btnLogin: {
    },
    txtbtnLogin: {
    },

    boxOR:{
    },
    txtOR:{
    },

    //btnLogin
    btnRegister: {
    },
    txtbtnRegister: {
    },
};



const styles = createStyles(
    stylesBase,

    maxHeight(600, small),
    minHeight(601, maxHeight(1200, smp5)),
    minHeight(1201, tablet10),

);



AppRegistry.registerComponent('Termostato', () => Login);
